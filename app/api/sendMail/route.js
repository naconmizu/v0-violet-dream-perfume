import { createTransport } from 'nodemailer'
import { NextResponse } from 'next/server'

// Create transporter once (re-using between requests)
const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
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
        return NextResponse.json({ success: false, message: 'Erro interno ao enviar email' }, { status: 500 })
    }
}
