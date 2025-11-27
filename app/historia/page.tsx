import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles, Heart, Leaf, Award } from "lucide-react"
import Link from "next/link"

export default function HistoriaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header com botão de voltar */}
      <div className="container mx-auto px-4 pt-32 pb-12">
        <Link href="/">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar para Home
          </Button>
        </Link>
      </div>

      {/* Hero da página */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Nossa Jornada</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 text-balance bg-gradient-to-r from-[#D4AF37] via-[#F4E5C3] to-[#D4AF37] bg-clip-text text-transparent">
            A História da Violet Dream
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed">
            Uma jornada de paixão, natureza e arte perfumística
          </p>
        </div>
      </section>

      {/* Conteúdo da história */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Origem */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif text-primary">O Início de um Sonho</h2>
            {/* <p className="text-lg text-muted-foreground leading-relaxed">
              Tudo começou em 2018, quando a perfumista Helena Violet descobriu um pequeno pomar de ameixeiras roxas nas
              montanhas do interior. Fascinada pela intensidade e complexidade aromática dessas frutas, ela teve uma
              visão: criar perfumes que capturassem a essência mágica das frutas roxas da natureza.
            </p> */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              Durante meses, Helena viajou pelo país em busca das melhores jabuticabas, uvas e ameixas, estudando cada
              nuance de seus aromas. Ela percebeu que essas frutas compartilhavam algo especial: uma profundidade
              misteriosa que evocava sonhos e memórias.
            </p>
          </div>

          {/* Filosofia */}
          <div className="bg-accent/10 rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-accent" />
              <h2 className="text-3xl md:text-4xl font-serif text-primary">Nossa Filosofia</h2>
            </div>
            {/* <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Na Violet Dream, acreditamos que a perfumaria é uma forma de arte que conecta as pessoas com a natureza e
              consigo mesmas. Cada fragrância é criada com ingredientes 100% naturais, respeitando o meio ambiente e as
              comunidades locais que cultivam nossas frutas.
            </p> */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              Trabalhamos diretamente com pequenos produtores orgânicos, garantindo que cada fruta seja colhida no
              momento perfeito de maturação, quando seus óleos essenciais estão mais concentrados e aromáticos.
            </p>
          </div>

          {/* Processo artesanal */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-8 h-8 text-accent" />
              <h2 className="text-3xl md:text-4xl font-serif text-primary">Processo Artesanal</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cada perfume Violet Dream passa por um processo de criação que leva meses. Primeiro, extraímos
              cuidadosamente os óleos essenciais das frutas através de métodos tradicionais de destilação a vapor e
              prensagem a frio, preservando todas as propriedades aromáticas naturais.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Em seguida, nossa equipe de perfumistas trabalha na composição, equilibrando as notas de topo, coração e
              base para criar fragrâncias harmoniosas e duradouras. Cada lote é produzido em pequenas quantidades,
              garantindo controle de qualidade excepcional.
            </p>
          </div>

          {/* Reconhecimento */}
          <div className="bg-primary/10 rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-8 h-8 text-accent" />
              <h2 className="text-3xl md:text-4xl font-serif text-primary">Reconhecimento Nacional</h2>
            </div>
            {/* <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Em apenas cinco anos, a Violet Dream conquistou diversos prêmios internacionais de perfumaria, incluindo o
              prestigioso "Golden Essence Award" em Paris e o "Natural Perfume Excellence" em Londres.
            </p> */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hoje, nossas fragrâncias são apreciadas por milhares de pessoas ao redor do mundo que buscam perfumes
              únicos, naturais e que contam histórias. Mas nossa essência permanece a mesma: criar sonhos em forma de
              fragrância.
            </p>
          </div>

          {/* Futuro */}
          <div className="space-y-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-primary">O Futuro é Roxo</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Continuamos nossa jornada explorando novas essências, desenvolvendo fragrâncias inovadoras e expandindo
              nossa família de aromas naturais. Cada novo perfume é uma celebração da natureza e um convite para sonhar.
            </p>
            <div className="pt-8">
              <Link href="/">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
                  Explorar Nossa Coleção
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
