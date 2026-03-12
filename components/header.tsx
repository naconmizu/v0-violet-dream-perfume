"use client"

import { Menu, User, LogIn, LogOut, HandshakeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Logo } from "@/components/logo"
import { useAuth } from "@/contexts/auth-context"
import { SearchDialog } from "@/components/search-dialog"
import { CartSheet } from "@/components/cart-sheet"
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
      {/* Barra de login/conta acima do header */}
      <div className="bg-[#2a0e28] border-b border-[#D4AF37]/10">
        <div className="container mx-auto px-4 py-1.5 flex items-center justify-between">
          <p className="hidden sm:block text-xs text-white/50">
            Frete gratis para compras acima de R$ 299,00
          </p>
          <div className="flex items-center gap-4 ml-auto">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/perfil"
                  className="flex items-center gap-1.5 text-xs text-white/70 hover:text-[#D4AF37] transition-colors"
                >
                  <User className="w-3 h-3" />
                  <span>{user.name}</span>
                </Link>
                <span className="text-white/20">|</span>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 text-xs text-white/70 hover:text-red-300 transition-colors"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 text-xs text-white/70 hover:text-[#D4AF37] transition-colors"
                >
                  <LogIn className="w-3 h-3" />
                  <span>Entrar</span>
                </Link>
                <span className="text-white/20">|</span>
                <Link
                  href="/registro"
                  className="text-xs text-white/70 hover:text-[#D4AF37] transition-colors"
                >
                  Criar Conta
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Barra de destaques */}
      <div className="hidden md:block bg-[#491D46] border-b border-[#D4AF37]/20">
        <div className="container mx-auto px-4 py-2">
          <p className="text-center text-sm font-medium">
            <span className="text-white">Essencias Naturais</span>
            <span className="text-[#D4AF37] mx-2">&bull;</span>
            <span className="text-[#D4AF37]">Fragancias Exclusivas</span>
            <span className="text-[#D4AF37] mx-2">&bull;</span>
            <span className="text-white">Luxo Artesanal</span>
          </p>
        </div>
      </div>

      <header
        className={`sticky top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-primary/20 transition-all duration-300 ${isScrolled ? "shadow-lg shadow-primary/10" : ""}`}
        style={{ backgroundColor: "#491D46" }}
        role="banner"
      >
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="grid grid-cols-3 lg:grid-cols-[1fr_auto_1fr] items-center gap-4">
            {/* Menu mobile - esquerda */}
            <div className="flex items-center justify-start lg:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" aria-label="Abrir menu de navegacao">
                    <Menu className="w-5 h-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] sm:w-[320px]">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-6 mt-8" aria-label="Menu de navegacao mobile">
                    <a
                      href="/#produtos"
                      className="text-base font-medium hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Produtos
                    </a>
                    <a
                      href="/#body-splash"
                      className="text-base font-medium hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Kits e Body Splash
                    </a>
                    <a
                      href="/#essencias"
                      className="text-base font-medium hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Essencias
                    </a>
                    <a
                      href="/#sobre"
                      className="text-base font-medium hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sobre
                    </a>
                    <Link
                      href="/contato"
                      className="text-base font-medium hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contato
                    </Link>
                    <Link
                      href="/revender"
                      className="flex items-center gap-2 text-base font-medium text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <HandshakeIcon className="w-4 h-4" />
                      Quero Revender
                    </Link>
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

            {/* Logo - centro */}
            <div className="flex justify-center col-span-1">
              <Link href="/" aria-label="Violet Dream - Pagina inicial">
                <Logo className="h-7 md:h-8 lg:h-10 w-auto" />
              </Link>
            </div>

            {/* Navegacao Desktop */}
            <nav className="hidden lg:flex items-center justify-center gap-8" aria-label="Navegacao principal">
              <a
                href="/#produtos"
                className="text-sm text-white/90 hover:text-accent transition-colors whitespace-nowrap"
              >
                Produtos
              </a>
              <a
                href="/#body-splash"
                className="text-sm text-white/90 hover:text-accent transition-colors whitespace-nowrap"
              >
                Kits e Body Splash
              </a>
              <a
                href="/#essencias"
                className="text-sm text-white/90 hover:text-accent transition-colors whitespace-nowrap"
              >
                Essencias
              </a>
              <a href="/#sobre" className="text-sm text-white/90 hover:text-accent transition-colors whitespace-nowrap">
                Sobre
              </a>
              <Link
                href="/contato"
                className="text-sm text-white/90 hover:text-accent transition-colors whitespace-nowrap"
              >
                Contato
              </Link>
              <Link
                href="/revender"
                className="flex items-center gap-1.5 text-sm text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors whitespace-nowrap font-medium"
              >
                <HandshakeIcon className="w-3.5 h-3.5" />
                Quero Revender
              </Link>
            </nav>

            {/* Acoes - direita */}
            <div className="flex items-center justify-end gap-2 md:gap-3 lg:gap-4">
              <SearchDialog />
              <CartSheet />

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10" aria-label="Menu da conta">
                      <User className="w-4 h-4 md:w-5 md:h-5" />
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
                        <User className="w-4 h-4 mr-2" />
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
                <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/10 hover:text-accent" aria-label="Fazer login">
                  <Link href="/login">
                    <User className="w-4 h-4 md:w-5 md:h-5" />
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
