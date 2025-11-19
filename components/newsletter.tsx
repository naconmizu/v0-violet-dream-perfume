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
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-serif mb-4">Receba Novidades Exclusivas</h3>
          <p className="text-lg mb-8 opacity-90 leading-relaxed">
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
            <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={status === 'sending'}>
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
