// Client-side helper to send contact form emails
const sendContactEmail = async (formData) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('API Error Response:', errText)
      const errorData = JSON.parse(errText)
      throw new Error(errorData.message || `API call failed with status ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro na requisição de contato:', error)
    throw error
  }
}

export default sendContactEmail

