import { createTransport } from 'nodemailer'
import { NextResponse } from 'next/server'

// Create transporter with improved Gmail configuration
const transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true para 465, false para outras portas
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
})

export async function POST(req) {
    try {
        const body = await req.json()
        const { to, subject, html } = body

        if (!to || !subject || !html) {
            return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 })
        }

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        })

        return NextResponse.json({ success: true, message: 'Email enviado com sucesso' })
    } catch (error) {
        console.error('Erro ao enviar email:', error)
        
        let errorMessage = 'Erro interno ao enviar email'
        if (error.code === 'EAUTH') {
            errorMessage = 'Erro de autenticação. Verifique se EMAIL_USER e EMAIL_PASSWORD estão corretos. Para Gmail, use uma App Password.'
        } else if (error.message) {
            errorMessage = error.message
        }
        
        return NextResponse.json({ success: false, message: errorMessage }, { status: 500 })
    }
}
