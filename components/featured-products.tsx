"use client"

import type React from "react"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { perfumes } from "@/lib/perfumes"
import InteractiveControls from "./fragrance-controls"

const featuredProducts = perfumes.filter((perfume) => perfume.collections?.includes("Purple Soul"))

export function FeaturedProducts() {
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: (typeof featuredProducts)[0], e: React.MouseEvent) => {
    e.preventDefault() // Previne navegação do Link
    e.stopPropagation()

    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      description: product.description,
      price: product.price,
      priceFormatted: product.priceFormatted,
      image: product.image,
      category: "Purple Soul",
    })

    toast({
      title: "Adicionado ao carrinho!",
      description: `${product.name} foi adicionado ao seu carrinho.`,
    })
  }

  return (
    <section
      id="produtos"
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(305 32% 7%) 0%, hsl(305 38% 5%) 25%, hsl(305 35% 6%) 50%, hsl(305 40% 4%) 75%, hsl(305 32% 7%) 100%)",
      }}
    >
      {/* Padrão de fundo decorativo */}
      <div className="absolute inset-0 bg-pattern-mesh opacity-40"></div>

      {/* Padrão de grid sutil */}
      <div className="absolute inset-0 bg-pattern-grid opacity-30"></div>

      {/* Efeitos de fundo decorativos animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent"></div>
      </div>

      {/* Padrão SVG decorativo */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="products-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="2" fill="currentColor" className="text-primary" />
            <path
              d="M0 50 L100 50 M50 0 L50 100"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#products-pattern)" />
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-serif mb-4 bg-gradient-to-r from-[gold] via-[#F4E5C3] to-[gold] bg-clip-text text-transparent ">
            Coleção Purple Soul
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Perfumes artesanais que capturam a essência das frutas roxas mais refinadas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/fragrancia/${product.slug}`}>
              <Card className="group overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 cursor-pointer bg-card">
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:bg-primary group-hover:scale-110 transition-all duration-300"></div>
                </div>
                <CardContent className="p-6 bg-gradient-to-b from-card to-muted/20">
                  <h4 className="text-2xl font-serif mb-2 text-primary group-hover:text-accent transition-colors duration-300">
                    {product.name}
                  </h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {product.priceFormatted}
                    </span>
                    <InteractiveControls perfumeName={product.name} />
                    <AddToCartButton
                      product={{
                        fixid: product.slug,
                        slug: product.slug,
                        name: product.name,
                        description: product.description,
                        price: typeof product.price === "string"
                          ? Number.parseInt(product.price.replace(/[^\d]/g, ""))
                          : product.price,
                        priceFormatted:
                          typeof product.price === "number"
                            ? product.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })
                            : product.price,
                        image: product.image,
                        category: "Purple Soul",
                      }}
                      size="sm"
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
