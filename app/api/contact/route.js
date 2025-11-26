import { createTransport } from 'nodemailer'
import { NextResponse } from 'next/server'

// Validação das variáveis de ambiente
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error('⚠️ EMAIL_USER e EMAIL_PASSWORD devem estar configuradas no .env.local')
}

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
        const { name, email, phone, subject, message } = body

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ 
                success: false, 
                message: 'Campos obrigatórios: nome, email, assunto e mensagem' 
            }, { status: 400 })
        }

        const contactEmail = process.env.CONTACT_EMAIL || process.env.EMAIL_USER || 'contato@violetdream.com'

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
            transporter.sendMail(confirmationEmail),
            transporter.sendMail(notificationEmail),
        ])

        // Verificar resultados
        if (confirmationResult.status === 'rejected') {
            const error = confirmationResult.reason
            console.error('Erro ao enviar email de confirmação:', error)
            
            // Mensagens de erro mais específicas
            let errorMessage = 'Erro ao enviar email de confirmação'
            if (error.code === 'EAUTH') {
                errorMessage = 'Erro de autenticação. Verifique se EMAIL_USER e EMAIL_PASSWORD estão corretos no .env.local. Para Gmail, use uma App Password (não a senha normal).'
            } else if (error.code === 'ECONNECTION') {
                errorMessage = 'Erro de conexão com o servidor de email. Verifique sua conexão com a internet.'
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
            errorMessage = 'Erro de autenticação. Verifique as credenciais de email no .env.local. Para Gmail, você precisa usar uma App Password.'
        } else if (error.message) {
            errorMessage = error.message
        }
        
        return NextResponse.json({ 
            success: false, 
            message: errorMessage 
        }, { status: 500 })
    }
}

