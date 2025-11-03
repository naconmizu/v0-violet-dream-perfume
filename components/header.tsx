"use client"

import { ShoppingBag, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Logo } from "@/components/logo"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <div className="bg-accent/10 border-b border-accent/20">
        <div className="container mx-auto px-4 py-2">
          <p className="text-center text-sm text-accent font-medium">
            Essências Naturais • Fragrâncias Exclusivas • Luxo Artesanal
          </p>
        </div>
      </div>

      <header className="fixed top-[40px] left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1 flex justify-center lg:justify-start">
              <Logo className="h-8 lg:h-10 w-auto" />
            </div>

            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              <a href="#produtos" className="text-sm hover:text-primary transition-colors">
                Produtos
              </a>
              <a href="#essencias" className="text-sm hover:text-primary transition-colors">
                Essências
              </a>
              <a href="#sobre" className="text-sm hover:text-primary transition-colors">
                Sobre
              </a>
              <a href="#contato" className="text-sm hover:text-primary transition-colors">
                Contato
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingBag className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 flex flex-col gap-4">
              <a href="#produtos" className="text-sm hover:text-primary transition-colors">
                Produtos
              </a>
              <a href="#essencias" className="text-sm hover:text-primary transition-colors">
                Essências
              </a>
              <a href="#sobre" className="text-sm hover:text-primary transition-colors">
                Sobre
              </a>
              <a href="#contato" className="text-sm hover:text-primary transition-colors">
                Contato
              </a>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}
