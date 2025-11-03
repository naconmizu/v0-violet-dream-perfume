"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { useState } from "react"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-16 h-16 mx-auto mb-6 text-accent" />
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
            <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Inscrever-se
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
