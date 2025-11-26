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
    <section className="py-24 text-primary-foreground relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, hsl(305 32% 7%) 0%, hsl(305 38% 5%) 25%, hsl(305 35% 6%) 50%, hsl(305 40% 4%) 75%, hsl(305 32% 7%) 100%)'
    }}>
      {/* Padrão de fundo decorativo */}
      <div className="absolute inset-0 bg-pattern-mesh opacity-40"></div>
      
      {/* Padrão de grid sutil */}
      <div className="absolute inset-0 bg-pattern-grid opacity-30"></div>
      
      {/* Efeitos de fundo decorativos animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent"></div>
      </div>
      
      {/* Padrão SVG decorativo */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="newsletter-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="2" fill="currentColor" className="text-primary"/>
            <path d="M0 50 L100 50 M50 0 L50 100" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.3"/>
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
              className="flex-1 bg-primary-foreground text-foreground border-0 h-12"
              required
              style={{
                background: 'linear-gradient(#491D46, #491D46) padding-box, linear-gradient(135deg, #D4AF37, #FFD700, #D4AF37) border-box',
                border: '2px solid transparent',
                backgroundClip: 'padding-box, border-box',
              }}
            />
            <Button 
              type="submit" 
              // size="lg" 
              className="relative bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 overflow-hidden group border-2 border-transparent h-12" 
              disabled={status === 'sending'}
              style={{
                background: 'linear-gradient(#491D46, #491D46) padding-box, linear-gradient(135deg, #D4AF37, #FFD700, #D4AF37) border-box',
                border: '2px solid transparent',
                backgroundClip: 'padding-box, border-box',
              }}
            >
              <span className="relative z-10">{status === 'sending' ? 'Enviando...' : 'Inscrever-se'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
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
