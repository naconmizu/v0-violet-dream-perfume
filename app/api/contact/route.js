import { createTransport } from 'nodemailer'
import { NextResponse } from 'next/server'

const smtpUser = process.env.EMAIL_USER || process.env.HOTMAIL_USER
const smtpPass = process.env.EMAIL_PASSWORD || process.env.HOTMAIL_PASSWORD

// Validação das variáveis de ambiente
if (!smtpUser || !smtpPass) {
    console.error('⚠️ Configure EMAIL_USER/HOTMAIL_USER e EMAIL_PASSWORD/HOTMAIL_PASSWORD no .env.local')
}

// Transporter configurado para Hotmail/Outlook
const transporter = createTransport({
    host: process.env.SMTP_HOST || 'smtp.office365.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // Outlook exige STARTTLS na porta 587
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

const RETRYABLE_SMTP_ERRORS = new Set(['ETIMEDOUT', 'ECONNECTION', 'ESOCKET', 'ETIMEDOUT', 'ECONNRESET'])

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
        const { name, email, phone, subject, message } = body

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ 
                success: false, 
                message: 'Campos obrigatórios: nome, email, assunto e mensagem' 
            }, { status: 400 })
        }

        const contactEmail = process.env.HOTMAIL_RECIPIENT || process.env.CONTACT_EMAIL || smtpUser || 'contato@hotmail.com'

        // Email de confirmação para o cliente
        const confirmationEmail = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Confirmação de Recebimento - ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background: linear-gradient(135deg, #491D46 0%, #3E003B 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: #D4AF37; margin: 0; font-size: 28px;">Violet Dream</h1>
                    </div>
                    <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
                        <h2 style="color: #491D46; margin-top: 0;">Olá, ${name}!</h2>
                        <p style="color: #333; line-height: 1.6;">
                            Recebemos sua mensagem com sucesso. Nossa equipe entrará em contato em breve.
                        </p>
                        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                            <p style="margin: 5px 0; color: #666;"><strong>Assunto:</strong> ${subject}</p>
                            <p style="margin: 5px 0; color: #666;"><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
                        </div>
                        <p style="color: #333; line-height: 1.6;">
                            <strong>Sua mensagem:</strong>
                        </p>
                        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #D4AF37; margin: 15px 0;">
                            <p style="color: #555; margin: 0; white-space: pre-wrap;">${message}</p>
                        </div>
                        <p style="color: #333; line-height: 1.6; margin-top: 30px;">
                            Obrigado por entrar em contato conosco!
                        </p>
                        <p style="color: #666; font-size: 14px; margin-top: 30px;">
                            Atenciosamente,<br>
                            <strong>Equipe Violet Dream</strong>
                        </p>
                    </div>
                </div>
            `,
        }

        // Email de notificação para a empresa
        const notificationEmail = {
            from: process.env.EMAIL_USER,
            to: contactEmail,
            subject: `Nova Mensagem de Contato - ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background: linear-gradient(135deg, #491D46 0%, #3E003B 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: #D4AF37; margin: 0; font-size: 28px;">Nova Mensagem de Contato</h1>
                    </div>
                    <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
                        <h2 style="color: #491D46; margin-top: 0;">Detalhes do Contato</h2>
                        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                            <p style="margin: 10px 0; color: #333;"><strong>Nome:</strong> ${name}</p>
                            <p style="margin: 10px 0; color: #333;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #491D46;">${email}</a></p>
                            <p style="margin: 10px 0; color: #333;"><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
                            <p style="margin: 10px 0; color: #333;"><strong>Assunto:</strong> ${subject}</p>
                            <p style="margin: 10px 0; color: #666; font-size: 12px;"><strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}</p>
                        </div>
                        <p style="color: #333; line-height: 1.6;">
                            <strong>Mensagem:</strong>
                        </p>
                        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #D4AF37; margin: 15px 0;">
                            <p style="color: #555; margin: 0; white-space: pre-wrap;">${message}</p>
                        </div>
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                            <p style="color: #666; font-size: 12px; margin: 0;">
                                Responda diretamente para: <a href="mailto:${email}" style="color: #491D46;">${email}</a>
                            </p>
                        </div>
                    </div>
                </div>
            `,
        }

        // Enviar ambos os emails
        const [confirmationResult, notificationResult] = await Promise.allSettled([
            sendMailWithRetry(confirmationEmail),
            sendMailWithRetry(notificationEmail),
        ])

        // Verificar resultados
        if (confirmationResult.status === 'rejected') {
            const error = confirmationResult.reason
            console.error('Erro ao enviar email de confirmação:', error)
            
            // Mensagens de erro mais específicas
            let errorMessage = 'Erro ao enviar email de confirmação'
            if (error.code === 'EAUTH') {
                errorMessage = 'Erro de autenticação. Verifique o usuário e a senha configurados (EMAIL_USER/HOTMAIL_USER + EMAIL_PASSWORD/HOTMAIL_PASSWORD). Em contas Hotmail/Outlook, habilite a verificação em duas etapas e gere uma senha de app.'
            } else if (error.code === 'ECONNECTION') {
                errorMessage = 'Erro de conexão com o servidor de email. Verifique sua conexão com a internet.'
            } else if (error.code === 'ETIMEDOUT') {
                errorMessage = 'Tempo limite ao conectar no servidor Outlook (porta 587). Verifique sua conexão e se o firewall libera smtp.office365.com.'
            } else if (error.response) {
                errorMessage = `Erro do servidor: ${error.response}`
            }
            
            return NextResponse.json({ 
                success: false, 
                message: errorMessage 
            }, { status: 500 })
        }

        if (notificationResult.status === 'rejected') {
            console.error('Erro ao enviar email de notificação:', notificationResult.reason)
            // Ainda retorna sucesso se o email de confirmação foi enviado
            console.warn('Email de confirmação enviado, mas notificação falhou')
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Emails enviados com sucesso' 
        })
    } catch (error) {
        console.error('Erro ao processar contato:', error)
        
        let errorMessage = 'Erro interno ao processar contato'
        if (error.code === 'EAUTH') {
            errorMessage = 'Erro de autenticação. Confirme EMAIL_USER/HOTMAIL_USER e EMAIL_PASSWORD/HOTMAIL_PASSWORD. Em provedores como Hotmail/Outlook, utilize uma senha de app válida ou habilite SMTP AUTH.'
        } else if (error.code === 'ETIMEDOUT') {
            errorMessage = 'Tempo limite na conexão com o Outlook/Hotmail. Verifique firewall, VPN ou bloqueios de porta 587.'
        } else if (error.message) {
            errorMessage = error.message
        }
        
        return NextResponse.json({ 
            success: false, 
            message: errorMessage 
        }, { status: 500 })
    }
}

