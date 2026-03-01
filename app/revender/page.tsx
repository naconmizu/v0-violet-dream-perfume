"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { HandshakeIcon, TrendingUp, Package, Star, Shield, Check } from "lucide-react"

const benefits = [
  {
    icon: TrendingUp,
    title: "Margens Atrativas",
    description: "Lucre ate 40% em cada venda com precos exclusivos para revendedores.",
  },
  {
    icon: Package,
    title: "Kit Inicial Completo",
    description: "Receba um kit com amostras de todas as colecoes para apresentar aos clientes.",
  },
  {
    icon: Star,
    title: "Treinamento Exclusivo",
    description: "Acesso a materiais e treinamento sobre as fragancias e tecnicas de venda.",
  },
  {
    icon: Shield,
    title: "Suporte Dedicado",
    description: "Equipe exclusiva para revendedores com atendimento prioritario.",
  },
]

export default function RevenderPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    experience: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setSubmitted(true)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: "linear-gradient(135deg, #491D46 0%, #2a0e28 50%, #1a0618 100%)" }}>
          <div className="absolute inset-0 bg-pattern-mesh opacity-30" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-6">
              <HandshakeIcon className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm text-[#D4AF37] font-medium">Programa de Revendedores</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 text-white text-balance">
              Faca parte da{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4E5C3] to-[#D4AF37] bg-clip-text text-transparent">
                Violet Dream
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto text-pretty">
              Torne-se um revendedor oficial e compartilhe fragancias exclusivas com seu circulo.
              Margens atrativas, suporte completo e produtos que vendem sozinhos.
            </p>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-16" style={{ background: "linear-gradient(135deg, hsl(305 30% 8%) 0%, hsl(305 35% 6%) 100%)" }}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-center text-white mb-12">Por que revender Violet Dream?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-lg font-serif text-white mb-2">{benefit.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Formulario */}
        <section className="py-16" style={{ background: "linear-gradient(135deg, hsl(305 35% 6%) 0%, hsl(305 30% 8%) 100%)" }}>
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl font-serif text-center text-white mb-4">Cadastre-se como Revendedor</h2>
            <p className="text-center text-white/60 mb-10">
              Preencha o formulario abaixo e nossa equipe entrara em contato em ate 48 horas.
            </p>

            {submitted ? (
              <Card className="bg-white/5 border-[#D4AF37]/30 backdrop-blur-sm">
                <CardContent className="p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-3">Cadastro Recebido!</h3>
                  <p className="text-white/70 max-w-md mx-auto">
                    Obrigado pelo interesse em se tornar um revendedor Violet Dream.
                    Nossa equipe analisara seu cadastro e entrara em contato em breve.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rev-name" className="text-white/80">Nome Completo</Label>
                        <Input
                          id="rev-name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rev-email" className="text-white/80">Email</Label>
                        <Input
                          id="rev-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rev-phone" className="text-white/80">Telefone</Label>
                        <Input
                          id="rev-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rev-city" className="text-white/80">Cidade</Label>
                        <Input
                          id="rev-city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          placeholder="Sua cidade"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rev-state" className="text-white/80">Estado</Label>
                        <Input
                          id="rev-state"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          placeholder="SP"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rev-experience" className="text-white/80">Experiencia com Revenda</Label>
                      <Input
                        id="rev-experience"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        placeholder="Ex: 2 anos com cosmeticos, iniciante, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rev-message" className="text-white/80">Mensagem (opcional)</Label>
                      <Textarea
                        id="rev-message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[100px]"
                        placeholder="Conte-nos por que deseja revender Violet Dream..."
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1a0618] font-semibold py-6 text-base"
                    >
                      {isLoading ? "Enviando..." : "Quero ser Revendedor"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
