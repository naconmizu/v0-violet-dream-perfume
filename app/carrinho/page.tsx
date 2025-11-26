"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CarrinhoPage() {
  const { items, removeFromCart, updateQuantity, totalFormatted, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto px-4">
            <ShoppingBag className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-serif mb-4">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground mb-8">
              Descubra nossas fragrâncias exclusivas e adicione produtos ao seu carrinho
            </p>
            <Button asChild size="lg">
              <Link href="/#produtos">Explorar Produtos</Link>
            </Button>
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
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-serif">Meu Carrinho</h1>
              <Button variant="outline" onClick={clearCart} className="text-destructive bg-transparent">
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar Carrinho
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-6 p-6 rounded-lg border bg-card">
                    <div className="relative w-32 h-32 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.product.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-lg font-medium w-12 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Preço unitário</p>
                          <p className="text-xl font-semibold text-accent">{item.product.priceFormatted}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 p-6 rounded-lg border bg-card space-y-6">
                  <h2 className="text-2xl font-serif">Resumo do Pedido</h2>

                  <div className="space-y-3 text-sm">
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

                    <Button asChild className="w-full" size="lg">
                      <Link href="/checkout">Finalizar Compra</Link>
                    </Button>

                    <Button asChild variant="outline" className="w-full mt-3 bg-transparent">
                      <Link href="/#produtos">Continuar Comprando</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
