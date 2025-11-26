"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import sendContactEmail from "@/app/util/sendContactEmail"

export default function ContatoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Enviar emails (confirmação para cliente e notificação para empresa)
      const result = await sendContactEmail(formData)

      if (result && result.success) {
        toast({
          title: "Mensagem enviada com sucesso!",
          description: "Recebemos sua mensagem e entraremos em contato em breve. Enviamos um email de confirmação para você.",
        })

        // Limpa o formulário
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        throw new Error(result?.message || "Falha ao enviar mensagem")
      }
    } catch (error) {
      console.error("Erro ao processar mensagem:", error)
      toast({
        title: "Erro ao enviar mensagem",
        description: error instanceof Error ? error.message : "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-1 bg-accent/10 rounded-full border border-accent/20 mb-6">
              <span className="text-sm font-medium text-accent">Fale Conosco</span>
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 text-balance"
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #F4E5C3 50%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Entre em Contato
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Estamos aqui para atender você. Envie sua mensagem e retornaremos em breve.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">contato@violetdream.com</p>
                  <p className="text-muted-foreground">vendas@violetdream.com</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Telefone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">(11) 9999-9999</p>
                  <p className="text-muted-foreground">WhatsApp: (11) 98888-8888</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Endereço</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Rua das Flores, 123</p>
                  <p className="text-muted-foreground">Jardim Botânico</p>
                  <p className="text-muted-foreground">São Paulo - SP, 01234-567</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Horário</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Segunda a Sexta: 9h às 18h</p>
                  <p className="text-muted-foreground">Sábado: 10h às 14h</p>
                  <p className="text-muted-foreground">Domingo: Fechado</p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-3xl font-serif">Envie sua Mensagem</CardTitle>
                  <CardDescription>Preencha o formulário abaixo e entraremos em contato</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="seu@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(11) 99999-9999"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Assunto *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Sobre o que deseja falar?"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Escreva sua mensagem aqui..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full md:w-auto"
                      style={{ backgroundColor: "#3E003B" }}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
