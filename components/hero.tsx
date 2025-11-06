import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-[120px]">
      {/* Removido background com imagem de frutas, mantendo apenas gradiente */}
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Coleção Exclusiva 2025</span>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 text-balance leading-tight">
            Essências que
            <span className="block text-[rgba(62,0,59,1)]">Despertam Sonhos</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Descubra fragrâncias únicas inspiradas nas frutas roxas mais nobres da natureza. Cada perfume é uma jornada
            sensorial através de ameixas, jabuticabas e uvas selecionadas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#3E003B] hover:bg-[#3E003B]/90 text-white px-8 py-6 text-lg">
              Explorar Coleção
            </Button>
            <Link href="/historia">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg bg-transparent"
              >
                Conheça Nossa História
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
