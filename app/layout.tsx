import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/contexts/cart-context"
import { AccessibilityWidget } from "@/components/accessibility-widget"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Violet Dream - Perfumaria de Essencias Naturais",
  description: "Descubra fragancias unicas inspiradas em frutas roxas nobres. Perfumes artesanais, body splashes e colecoes exclusivas.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        {/* Skip navigation link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#D4AF37] focus:text-[#1a0618] focus:rounded-md focus:text-sm focus:font-semibold focus:shadow-lg"
        >
          Pular para o conteudo principal
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              <div id="main-content">
                {children}
              </div>
              <AccessibilityWidget />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
