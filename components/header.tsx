"use client"

import { ShoppingBag, Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Logo } from "@/components/logo"
import { useAuth } from "@/contexts/auth-context"
import { SearchDialog } from "@/components/search-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <div className="bg-accent/10 border-b border-accent/20">
        <div className="container mx-auto px-4 py-2">
          <p className="text-center text-sm text-accent font-medium">
            Essências Naturais • Fragrâncias Exclusivas • Luxo Artesanal
          </p>
        </div>
      </div>

      <header
        className={`sticky top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10 transition-all duration-300 ${isScrolled ? "shadow-lg" : ""}`}
        style={{ backgroundColor: "#3E003B" }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1 flex justify-center">
              <Link href="/">
                <Logo className="h-8 lg:h-10 w-auto" />
              </Link>
            </div>

            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              <a href="/#produtos" className="text-sm text-white/90 hover:text-accent transition-colors">
                Produtos
              </a>
              <a href="/#essencias" className="text-sm text-white/90 hover:text-accent transition-colors">
                Essências
              </a>
              <a href="/#sobre" className="text-sm text-white/90 hover:text-accent transition-colors">
                Sobre
              </a>
              <a href="/#contato" className="text-sm text-white/90 hover:text-accent transition-colors">
                Contato
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <SearchDialog />
              <Button variant="ghost" size="icon" className="text-white hover:text-accent hover:bg-white/10">
                <ShoppingBag className="w-5 h-5" />
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                      <Image src="/images/user-icon.png" alt="User" width={20} height={20} className="w-5 h-5 invert" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/perfil" className="cursor-pointer">
                        <Image
                          src="/images/user-icon.png"
                          alt="Profile"
                          width={16}
                          height={16}
                          className="w-4 h-4 mr-2"
                        />
                        Meu Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/10 hover:text-accent">
                  <Link href="/login">
                    <Image src="/images/user-icon.png" alt="Login" width={20} height={20} className="w-5 h-5 invert" />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 flex flex-col gap-4">
              <a href="/#produtos" className="text-sm text-white/90 hover:text-accent transition-colors">
                Produtos
              </a>
              <a href="/#essencias" className="text-sm text-white/90 hover:text-accent transition-colors">
                Essências
              </a>
              <a href="/#sobre" className="text-sm text-white/90 hover:text-accent transition-colors">
                Sobre
              </a>
              <a href="/#contato" className="text-sm text-white/90 hover:text-accent transition-colors">
                Contato
              </a>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}
