"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const products = [
  { id: 1, name: "Violet Dream Intense", category: "Perfume", price: "R$ 289,00" },
  { id: 2, name: "Purple Essence", category: "Perfume", price: "R$ 259,00" },
  { id: 3, name: "Amethyst Night", category: "Perfume", price: "R$ 299,00" },
  { id: 4, name: "Jabuticaba Mist", category: "Body Splash", price: "R$ 159,00" },
  { id: 5, name: "Grape Velvet", category: "Perfume", price: "R$ 279,00" },
  { id: 6, name: "Plum Sensation", category: "Eau de Toilette", price: "R$ 189,00" },
]

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Search className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Buscar Produtos</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Digite o nome do produto ou categoria..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setSearchQuery("")}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        <div className="mt-4 max-h-[400px] overflow-y-auto">
          {filteredProducts.length > 0 ? (
            <div className="space-y-2">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  className="w-full text-left p-4 rounded-lg hover:bg-accent/10 transition-colors border border-border"
                  onClick={() => setOpen(false)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <span className="text-sm font-medium text-accent">{product.price}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              {searchQuery ? "Nenhum produto encontrado" : "Digite para buscar produtos"}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
