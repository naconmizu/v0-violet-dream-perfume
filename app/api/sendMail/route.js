import { createTransport } from 'nodemailer'
import { NextResponse } from 'next/server'

const smtpUser = process.env.EMAIL_USER || process.env.HOTMAIL_USER
const smtpPass = process.env.EMAIL_PASSWORD || process.env.HOTMAIL_PASSWORD

if (!smtpUser || !smtpPass) {
    console.error('⚠️ Configure EMAIL_USER/HOTMAIL_USER e EMAIL_PASSWORD/HOTMAIL_PASSWORD no .env.local')
}

// Transporter padronizado para Hotmail/Outlook (permite override via env)
const transporter = createTransport({
    host: process.env.SMTP_HOST || 'smtp.office365.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    requireTLS: true,
    authMethod: process.env.SMTP_AUTH_METHOD || 'PLAIN',
    auth: {
        user: smtpUser,
        pass: smtpPass,
    },
    tls: {
        rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false'
    },
    connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT) || 20_000,
    socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT) || 20_000,
    pool: true,
    maxConnections: 1,
})

const RETRYABLE_SMTP_ERRORS = new Set(['ETIMEDOUT', 'ECONNECTION', 'ESOCKET', 'ECONNRESET'])

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function sendMailWithRetry(mailOptions, attempts = Number(process.env.SMTP_MAX_ATTEMPTS) || 2) {
    let lastError
    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            return await transporter.sendMail(mailOptions)
        } catch (error) {
            lastError = error
            const shouldRetry = RETRYABLE_SMTP_ERRORS.has(error.code)
            if (!shouldRetry || attempt === attempts) {
                throw error
            }
            const backoff = (Number(process.env.SMTP_RETRY_BACKOFF_MS) || 1000) * attempt
            console.warn(`Tentativa ${attempt} falhou (${error.code}). Repetindo em ${backoff}ms...`)
            await sleep(backoff)
        }
    }
    throw lastError
}

export async function POST(req) {
    try {
        const body = await req.json()
        // Agora espera: 
        // {
        //   userEmail, companyEmail, subject, htmlToCompany, htmlToUser
        // }
        const { userEmail, companyEmail, subject, htmlToCompany, htmlToUser } = body

        if (
            !userEmail ||
            !companyEmail ||
            !subject ||
            !htmlToCompany ||
            !htmlToUser
        ) {
            return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 })
        }

        // Envia email para a empresa
        await sendMailWithRetry({
            from: smtpUser,
            to: companyEmail,
            subject,
            html: htmlToCompany,
        })

        // Envia email de confirmação para o usuário
        await sendMailWithRetry({
            from: smtpUser,
            to: userEmail,
            subject: "Confirmação de recebimento da sua mensagem",
            html: htmlToUser,
        })

        return NextResponse.json({ success: true, message: 'Emails enviados com sucesso' })
    } catch (error) {
        console.error('Erro ao enviar email:', error)
        
        let errorMessage = 'Erro interno ao enviar email'
        if (error.code === 'EAUTH') {
            errorMessage = 'Erro de autenticação. Verifique EMAIL_USER/HOTMAIL_USER e EMAIL_PASSWORD/HOTMAIL_PASSWORD. Em contas Hotmail/Outlook, habilite SMTP AUTH e use senha de app.'
        } else if (error.code === 'ETIMEDOUT') {
            errorMessage = 'Tempo limite ao conectar em smtp.office365.com. Verifique internet, firewall, VPN e liberação da porta 587.'
        } else if (error.message) {
            errorMessage = error.message
        }
        
        return NextResponse.json({ success: false, message: errorMessage }, { status: 500 })
    }
}
