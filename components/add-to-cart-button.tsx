"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

interface AddToCartButtonProps {
  product: {
    id: string
    slug: string
    name: string
    description: string
    price: number
    priceFormatted: string
    image: string
    category: string
  }
  size?: "default" | "sm" | "lg"
  className?: string
  onClick?: (e: React.MouseEvent) => void
}

export function AddToCartButton({ product, size = "default", className = "", onClick }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (onClick) {
      onClick(e)
    }

    setIsAdding(true)

    // Simula um pequeno delay para melhor feedback visual
    await new Promise((resolve) => setTimeout(resolve, 300))

    addToCart(product)

    toast({
      title: "Adicionado ao carrinho!",
      description: `${product.name} foi adicionado ao seu carrinho.`,
    })

    setIsAdding(false)
    setJustAdded(true)

    // Remove o estado de "justAdded" após 2 segundos
    setTimeout(() => setJustAdded(false), 2000)
  }

  return (
    <Button
      size={size}
      className={`
        relative overflow-hidden transition-all duration-300
        ${
          justAdded
            ? "bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/30"
            : "bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg hover:shadow-primary/30"
        }
        text-primary-foreground
        ${isAdding ? "scale-95" : "scale-100"}
        ${className}
      `}
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      <span className={`flex items-center transition-all duration-300 ${isAdding ? "opacity-50" : "opacity-100"}`}>
        {justAdded ? (
          <>
            <Check className="w-4 h-4 mr-2 animate-in zoom-in duration-300" />
            Adicionado
          </>
        ) : (
          <>
            <ShoppingCart className={`w-4 h-4 mr-2 ${isAdding ? "animate-bounce" : ""}`} />
            {isAdding ? "Adicionando..." : "Adicionar"}
          </>
        )}
      </span>

      {/* Efeito de ondulação ao clicar */}
      {isAdding && <span className="absolute inset-0 bg-white/20 animate-ping rounded-md" />}
    </Button>
  )
}
