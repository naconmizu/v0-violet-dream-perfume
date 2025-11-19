// Client-side helper to call the server API at `/api/sendMail`
const sendEmail = async (email) => {
    try {
        const response = await fetch('/api/sendMail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: email,
                subject: 'Obrigado por se inscrever',
                html: `<p>Obrigado por se inscrever em nossa newsletter: <strong>${email}</strong></p>`,
            }),
        })

        if (!response.ok) {
            const errText = await response.text()
            console.error('API Error Response:', errText)
            throw new Error(`API call failed with status ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Erro na requisição:', error)
        throw error
    }
}

export default sendEmail;