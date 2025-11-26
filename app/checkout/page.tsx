"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { CreditCard, MapPin, User, ShoppingBag, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { items, totalFormatted, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    cep: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simular processamento de pagamento
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setOrderComplete(true)
    clearCart()

    toast({
      title: "Pedido realizado com sucesso!",
      description: "Você receberá um email com os detalhes do seu pedido.",
    })
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto px-4">
            <ShoppingBag className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-serif mb-4">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground mb-8">Adicione produtos ao carrinho antes de finalizar a compra</p>
            <Button asChild size="lg">
              <Link href="/#produtos">Explorar Produtos</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-2xl mx-auto px-4">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-serif mb-4">Pedido Realizado com Sucesso!</h1>
            <p className="text-lg text-muted-foreground mb-2">Obrigado pela sua compra na Violet Dream</p>
            <p className="text-muted-foreground mb-8">
              Você receberá um email de confirmação em breve com todos os detalhes do seu pedido.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/#produtos">Continuar Comprando</Link>
              </Button>
              {user && (
                <Button asChild variant="outline" size="lg">
                  <Link href="/perfil">Ver Meus Pedidos</Link>
                </Button>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-serif mb-8">Finalizar Compra</h1>

            <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Dados Pessoais */}
                <div className="p-6 rounded-lg border bg-card">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="w-5 h-5 text-accent" />
                    <h2 className="text-2xl font-serif">Dados Pessoais</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(00) 00000-0000"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Endereço de Entrega */}
                <div className="p-6 rounded-lg border bg-card">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-5 h-5 text-accent" />
                    <h2 className="text-2xl font-serif">Endereço de Entrega</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        id="cep"
                        name="cep"
                        value={formData.cep}
                        onChange={handleInputChange}
                        placeholder="00000-000"
                        required
                      />
                    </div>
                    <div></div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="number">Número</Label>
                      <Input id="number" name="number" value={formData.number} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        name="complement"
                        value={formData.complement}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <Input
                        id="neighborhood"
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="UF"
                        maxLength={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Pagamento */}
                <div className="p-6 rounded-lg border bg-card">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-5 h-5 text-accent" />
                    <h2 className="text-2xl font-serif">Pagamento</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="cardNumber">Número do Cartão</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="0000 0000 0000 0000"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="cardName">Nome no Cartão</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardExpiry">Validade</Label>
                      <Input
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardCvv">CVV</Label>
                      <Input
                        id="cardCvv"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                        placeholder="000"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Resumo do Pedido */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 p-6 rounded-lg border bg-card space-y-6">
                  <h2 className="text-2xl font-serif">Resumo do Pedido</h2>

                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3 text-sm">
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-muted-foreground">Qtd: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">{item.product.priceFormatted}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{totalFormatted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frete</span>
                      <span className="text-green-600">Grátis</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold mb-6">
                      <span>Total</span>
                      <span className="text-accent text-2xl">{totalFormatted}</span>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                      {isProcessing ? "Processando..." : "Finalizar Pedido"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
