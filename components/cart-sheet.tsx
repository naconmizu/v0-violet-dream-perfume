"use client"

import { ShoppingBag, X, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export function CartSheet() {
  const { items, removeFromCart, updateQuantity, totalFormatted, itemCount } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-white hover:text-accent hover:bg-white/10">
          <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
          {itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent border-none"
            >
              {itemCount}
            </Badge>
          )}
          <span className="sr-only">Carrinho</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Meu Carrinho ({itemCount} {itemCount === 1 ? "item" : "itens"})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Seu carrinho está vazio</h3>
            <p className="text-sm text-muted-foreground mb-6">Adicione produtos para começar suas compras</p>
            <Button asChild>
              <Link href="/#produtos">Explorar Produtos</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-4 rounded-lg border bg-card">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm mb-1 truncate">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{item.product.priceFormatted}</p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 bg-transparent"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 bg-transparent"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-accent">{totalFormatted}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">Finalizar Compra</Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/carrinho">Ver Carrinho Completo</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
