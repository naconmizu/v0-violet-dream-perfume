import { Sparkles, Leaf, Award, Heart, Flower2, Gem } from "lucide-react"

export function About() {
  return (
    <section id="sobre" className="py-24 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, hsl(305 35% 7%) 0%, hsl(305 30% 8%) 50%, hsl(305 40% 6%) 100%)'
    }}>
      {/* Padrão de fundo decorativo */}
      <div className="absolute inset-0 bg-pattern-mesh opacity-50"></div>
      
      {/* Padrão SVG decorativo floral */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="about-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="60" cy="60" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary"/>
            <circle cx="30" cy="30" r="2" fill="currentColor" className="text-accent" opacity="0.4"/>
            <circle cx="90" cy="90" r="2" fill="currentColor" className="text-accent" opacity="0.4"/>
            <path d="M60 20 Q80 40 60 60 Q40 40 60 20" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-primary" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-pattern)"/>
      </svg>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Título principal */}
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-6xl font-serif mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            A Arte da Perfumaria Natural
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Na Violet Dream, transformamos a essência das frutas roxas mais nobres em fragrâncias que despertam emoções e contam histórias únicas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Conteúdo principal */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Na Violet Dream, acreditamos que as melhores fragrâncias vêm da natureza. Cada perfume é uma celebração
                das frutas roxas mais nobres, combinando tradição artesanal com inovação contemporânea.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nossos mestres perfumistas trabalham com ingredientes cuidadosamente selecionados, criando composições
                únicas que contam histórias através do olfato. Cada gota é uma obra de arte, cada fragrância uma jornada sensorial.
              </p>
            </div>

            {/* Cards de valores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2 text-primary">Paixão</h4>
                <p className="text-sm text-muted-foreground">Dedicação em cada detalhe</p>
              </div>

              <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Gem className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2 text-primary">Excelência</h4>
                <p className="text-sm text-muted-foreground">Qualidade incomparável</p>
              </div>
            </div>
          </div>

          {/* Seção de características */}
          <div className="relative">
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-start gap-4 p-6 rounded-lg bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-primary hover:from-primary/10 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Leaf className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-lg text-primary">100% Natural</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ingredientes orgânicos selecionados das melhores fontes naturais, sem aditivos químicos
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-lg bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-accent hover:from-primary/10 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-lg text-accent">Artesanal</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Cada fragrância é cuidadosamente elaborada à mão por nossos mestres perfumistas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-lg bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-primary hover:from-primary/10 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Award className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-lg text-primary">Premiado</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Reconhecimento internacional por nossa excelência em perfumaria artesanal
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-lg bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-accent hover:from-primary/10 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Flower2 className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-lg text-accent">Sustentável</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Compromisso com práticas sustentáveis e respeito ao meio ambiente
                  </p>
                </div>
              </div>
            </div>

            {/* Efeitos decorativos */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>

        {/* Estatísticas ou destaque final */}
        <div className="mt-16 pt-12 border-t border-primary/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-serif text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-4xl font-serif text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Fragrâncias Únicas</div>
            </div>
            <div>
              <div className="text-4xl font-serif text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Ingredientes Naturais</div>
            </div>
            <div>
              <div className="text-4xl font-serif text-primary mb-2">∞</div>
              <div className="text-sm text-muted-foreground">Paixão pela Perfumaria</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
