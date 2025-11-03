import { Sparkles, Leaf, Award } from "lucide-react"

export function About() {
  return (
    <section id="sobre" className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-4xl md:text-5xl font-serif mb-6 text-primary">A Arte da Perfumaria Natural</h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Na Violet Dream, acreditamos que as melhores fragrâncias vêm da natureza. Cada perfume é uma celebração
              das frutas roxas mais nobres, combinando tradição artesanal com inovação contemporânea.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nossos mestres perfumistas trabalham com ingredientes cuidadosamente selecionados, criando composições
              únicas que contam histórias através do olfato.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <Leaf className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">100% Natural</h4>
                <p className="text-sm text-muted-foreground">Ingredientes orgânicos</p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Artesanal</h4>
                <p className="text-sm text-muted-foreground">Feito à mão</p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Premiado</h4>
                <p className="text-sm text-muted-foreground">Reconhecimento internacional</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img src="/luxury-perfume-making-purple-fruits-botanical-labo.jpg" alt="Processo de criação" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
