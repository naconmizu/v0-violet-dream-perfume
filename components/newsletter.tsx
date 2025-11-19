"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import sendEmail from "@/app/util/sendMail"

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setMessage(null)
    try {
      const res = await sendEmail(email)
      if (res && res.success) {
        setStatus('success')
        setMessage(res.message || 'Inscrição realizada com sucesso!')
      } else {
        setStatus('error')
        setMessage(res?.message || 'Falha ao inscrever.')
      }
    } catch (err) {
      setStatus('error')
      setMessage('Erro ao enviar. Tente novamente mais tarde.')
    } finally {
      setEmail("")
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-accent/80 text-primary-foreground relative overflow-hidden">
      {/* Padrão de grid decorativo */}
      <div className="absolute inset-0 bg-pattern-grid opacity-10"></div>
      
      {/* Efeitos de brilho animados */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Padrão SVG decorativo */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="newsletter-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="2" fill="white" opacity="0.3"/>
            <path d="M0 50 L100 50 M50 0 L50 100" stroke="white" strokeWidth="0.5" opacity="0.2"/>
            <circle cx="25" cy="25" r="1" fill="white" opacity="0.4"/>
            <circle cx="75" cy="75" r="1" fill="white" opacity="0.4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#newsletter-pattern)"/>
      </svg>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-serif mb-4 drop-shadow-lg">Receba Novidades Exclusivas</h3>
          <p className="text-lg mb-8 opacity-95 leading-relaxed">
            Inscreva-se para receber lançamentos, ofertas especiais e dicas de perfumaria
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-primary-foreground text-foreground border-0"
              required
            />
            <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl hover:shadow-accent/30 transition-all duration-300" disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando...' : 'Inscrever-se'}
            </Button>
          </form>
          {message && (
            <p className={`mt-4 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>{message}</p>
          )}
        </div>
      </div>
    </section>
  )
}
