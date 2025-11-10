"use client"

import { ShoppingBag, Menu, X } from "lucide-react"
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
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
      <div className="hidden md:block bg-accent/10 border-b border-accent/20">
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
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="grid grid-cols-3 lg:grid-cols-[1fr_auto_1fr] items-center gap-4">
            {/* Menu mobile - esquerda */}
            <div className="flex items-center justify-start lg:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <Menu className="w-5 h-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] sm:w-[320px]">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-6 mt-8">
                    <a
                      href="/#produtos"
                      className="text-base font-medium hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Produtos
                    </a>
                    <a
                      href="/#essencias"
                      className="text-base font-medium hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Essências
                    </a>
                    <a
                      href="/#sobre"
                      className="text-base font-medium hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sobre
                    </a>
                    <a
                      href="/#contato"
                      className="text-base font-medium hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contato
                    </a>
                    {user && (
                      <>
                        <div className="border-t pt-6 mt-2" />
                        <Link
                          href="/perfil"
                          className="text-base font-medium hover:text-accent transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Meu Perfil
                        </Link>
                        <button
                          onClick={() => {
                            logout()
                            setIsMenuOpen(false)
                          }}
                          className="text-base font-medium hover:text-destructive transition-colors text-left"
                        >
                          Sair
                        </button>
                      </>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo - centro em mobile, centro em desktop */}
            <div className="flex justify-center col-span-1">
              <Link href="/">
                <Logo className="h-7 md:h-8 lg:h-10 w-auto" />
              </Link>
            </div>

            {/* Navegação Desktop - centro */}
            <nav className="hidden lg:flex items-center justify-center gap-8">
              <a
                href="/#produtos"
                className="text-sm text-white/90 hover:text-accent transition-colors whitespace-nowrap"
              >
                Produtos
              </a>
              <a
                href="/#essencias"
                className="text-sm text-white/90 hover:text-accent transition-colors whitespace-nowrap"
              >
                Essências
              </a>
              <a href="/#sobre" className="text-sm text-white/90 hover:text-accent transition-colors whitespace-nowrap">
                Sobre
              </a>
              <a
                href="/#contato"
                className="text-sm text-white/90 hover:text-accent transition-colors whitespace-nowrap"
              >
                Contato
              </a>
            </nav>

            {/* Ações - direita */}
            <div className="flex items-center justify-end gap-2 md:gap-3 lg:gap-4">
              <SearchDialog />
              <Button variant="ghost" size="icon" className="text-white hover:text-accent hover:bg-white/10">
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                <span className="sr-only">Carrinho</span>
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                      <Image
                        src="/images/user-icon.png"
                        alt="User"
                        width={20}
                        height={20}
                        className="w-4 h-4 md:w-5 md:h-5 invert"
                      />
                      <span className="sr-only">Perfil</span>
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
                      <X className="w-4 h-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/10 hover:text-accent">
                  <Link href="/login">
                    <Image
                      src="/images/user-icon.png"
                      alt="Login"
                      width={20}
                      height={20}
                      className="w-4 h-4 md:w-5 md:h-5 invert"
                    />
                    <span className="sr-only">Login</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
