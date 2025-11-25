import { Card, CardContent } from "@/components/ui/card"

const goldFragrances = [
  {
    name: "Ouro Solar",
    description:
      "Ilumina com bergamota italiana, pimenta rosa cintilante e âmbar luminoso para um rastro radiante.",
    highlight: "Cítrica especiada",
    essences: ["Bergamota Dourada", "Pimenta Rosa", "Âmbar Solar"],
    color: "from-[#f6d365] via-[#fda085] to-[#f6d365]",
  },
  {
    name: "Mel de Safra",
    description:
      "Combina mel de acácia, flor de laranjeira e sândalo creme, evocando calor artesanal.",
    highlight: "Gourmand floral",
    essences: ["Mel de Acácia", "Flor de Laranjeira", "Sândalo Creme"],
    color: "from-[#f1c27d] via-[#d89c5c] to-[#8c5a2b]",
  },
  {
    name: "Âmbar Aurora",
    description:
      "Âmbar resinosa e fava tonka ganham brilho com notas de figo dourado e incenso branco.",
    highlight: "Resinosa sofisticada",
    essences: ["Âmbar Vivo", "Figo Dourado", "Incenso Branco"],
    color: "from-[#f2c94c] via-[#c27a36] to-[#5b2c0e]",
  },
  {
    name: "Champanhe Velours",
    description:
      "Pera cristalina, champanhe rosé e almíscar cremoso criam um perfume festivo e elegante.",
    highlight: "Efervescente suave",
    essences: ["Pera Cristal", "Champanhe Rosé", "Almíscar Cremoso"],
    color: "from-[#ffe29f] via-[#ffa99f] to-[#ffd8cb]",
  },
]

const goldEssences = [
  {
    name: "Bergamota Dourada",
    description:
      "Explosão cítrica com óleos essenciais prensados a frio que abrem a pirâmide com sofisticação.",
  },
  {
    name: "Mel de Acácia",
    description:
      "Doçura translúcida e floral que adiciona textura cremosa sem pesar a composição.",
  },
  {
    name: "Flor de Laranjeira",
    description:
      "Essência solar com facetadas nuances melífluas e toque levemente verde.",
  },
  {
    name: "Sândalo Creme",
    description:
      "Madeira envolvente e macia que prolonga o rastro com sensação aveludada.",
  },
  {
    name: "Âmbar Vivo",
    description:
      "Acorde âmbarado moderno com brilho metálico, ideal para bases luxuosas.",
  },
  {
    name: "Champanhe Rosé",
    description:
      "Notas espumantes e frutadas que trazem leveza glamourosa à coleção.",
  },
]

export function GoldCollection() {
  return (
    <section
      id="colecao-dourada"
      className="py-24 relative overflow-hidden"
      // style={{
      //   background:
      //     "linear-gradient(145deg, hsl(40 40% 12%) 0%, hsl(32 32% 8%) 60%, hsl(28 30% 6%) 100%)",
      // }}
      style={{
        background: 'linear-gradient(135deg, hsl(305 32% 7%) 0%, hsl(305 38% 5%) 100%)'
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_1px,_transparent_1px)] [background-size:70px_70px] opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#f6d3650f] via-transparent to-[#a76b320d]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="uppercase tracking-[0.45em] text-xs text-yellow-200/70 mb-4">
            Golden Aura Edition
          </p>
          <h3 className="text-4xl md:text-5xl font-serif mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#ffe29f] via-[#ffc857] to-[#f9b24d]">
            Coleção Dourada
          </h3>
          <p className="text-lg text-white/80">
            Fragrâncias banhadas por luz líquida: camadas de especiarias
            solares, madeiras melífluas e acorde champanhe para experiências
            olfativas exuberantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {goldFragrances.map((fragrance) => (
            <Card
              key={fragrance.name}
              className="group overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div
                className={`relative aspect-[4/5] bg-gradient-to-br ${fragrance.color} overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.6)_0%,_transparent_55%)] opacity-40 mix-blend-screen" />
                <div className="absolute top-4 right-4 text-[0.65rem] uppercase tracking-[0.35em] text-white/70">
                  Aurum
                </div>
                <div className="absolute bottom-6 left-6">
                  <p className="text-xs text-white/70 uppercase tracking-[0.4em]">
                    Perfil
                  </p>
                  <p className="text-lg font-serif text-white">
                    {fragrance.highlight}
                  </p>
                </div>
              </div>
              <CardContent className="p-6 bg-gradient-to-b from-white/10 to-transparent">
                <h4 className="text-2xl font-serif text-white mb-3">
                  {fragrance.name}
                </h4>
                <p className="text-sm text-white/80 mb-4 leading-relaxed">
                  {fragrance.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {fragrance.essences.map((essence) => (
                    <span
                      key={`${fragrance.name}-${essence}`}
                      className="px-3 py-1 text-xs uppercase tracking-wide text-white/80 border border-white/20 rounded-full"
                    >
                      {essence}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.45em] text-yellow-100/70 mb-3">
              Essências Douradas
            </p>
            <h4 className="text-3xl font-serif text-white">
              Ingredientes assinatura
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goldEssences.map((essence) => (
              <Card
                key={essence.name}
                className="bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <h5 className="text-xl font-serif text-white mb-2">
                    {essence.name}
                  </h5>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {essence.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
