"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Mail, Calendar, ShoppingBag, Heart } from "lucide-react"

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p>Carregando...</p>
        </div>
        <Footer />
      </>
    )
  }

  if (!user) {
    return null
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-serif mb-2 bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
              Meu Perfil
            </h1>
            <p className="text-muted-foreground">Gerencie suas informações e preferências</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-accent" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Membro desde
                  </p>
                  <p className="font-medium">{memberSince}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-accent" />
                  Minhas Compras
                </CardTitle>
                <CardDescription>Histórico de pedidos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Você ainda não realizou nenhuma compra.</p>
                <Button className="mt-4 w-full bg-transparent" variant="outline">
                  Explorar Produtos
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-accent" />
                  Favoritos
                </CardTitle>
                <CardDescription>Seus produtos favoritos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Você ainda não tem produtos favoritos.</p>
                <Button className="mt-4 w-full bg-transparent" variant="outline">
                    Descobrir Fragrâncias
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
                <CardDescription>Gerencie sua conta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Editar Perfil
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Alterar Senha
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive hover:text-destructive bg-transparent"
                  onClick={logout}
                >
                  Sair da Conta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
