import { Card, CardContent } from "@/components/ui/card"

const redFragrances = [
  {
    name: "Framboesa Carmesim",
    description:
      "Fragrância cintilante que equilibra a doçura da framboesa madura com acordes luminosos de lichia e pétalas cristalinas.",
    highlight: "Doce cítrica e efervescente",
    essences: ["Framboesa Silvestre", "Lichia Rubra", "Âmbar Translúcido"],
    color: "from-[#5c0f18] via-[#36060b] to-[#150203]",
    image: "/RedCollection/RasberryFragance.jpg",
  },
  {
    name: "Romã Royale",
    description:
      "Notas suculentas de romã rubra envoltas em madeira cerejeira e baunilha tostada para um rastro majestoso.",
    highlight: "Suculenta e envolvente",
    essences: ["Romã Rubra", "Cerejeira Escarlate", "Baunilha Dourada"],
    color: "from-[#4a060c] via-[#280306] to-[#0b0102]",
    image: "/placeholder.jpg",
  },
  {
    name: "Pitanga Aurora",
    description:
      "A leve acidez da pitanga brasileira encontra o calor especiado do cardamomo e da fava tonka.",
    highlight: "Vibrante e especiada",
    essences: ["Pitanga", "Cardamomo Rosé", "Fava Tonka"],
    color: "from-[#6c111c] via-[#36060b] to-[#140204]",
    image: "/placeholder.jpg",
  },
  {
    name: "Hibisco Rubro",
    description:
      "Flores de hibisco e rosa damascena infundidas em chá preto defumado criam um perfume artístico e ousado.",
    highlight: "Floral âmbar",
    essences: ["Hibisco Carmim", "Rosa Damascena", "Chá Preto"],
    color: "from-[#3e0810] via-[#1e0307] to-[#080104]",
    image: "/placeholder.jpg",
  },
]

const redEssences = [
  {
    name: "Framboesa Silvestre",
    description:
      "Notas frescas e brilhantes com acidez delicada que iluminam qualquer pirâmide olfativa vermelha.",
  },
  {
    name: "Romã Rubra",
    description:
      "Essência suculenta com nuances vinosas que trazem profundidade e sensualidade.",
  },
  {
    name: "Cereja Negra",
    description:
      "Assinatura gourmand que mistura dulçor envolvente com um toque amendoado sofisticado.",
  },
  {
    name: "Pitanga Brasileira",
    description:
      "Aroma tropical e vibrante com frescor herbáceo, perfeito para acordes diurnos.",
  },
  {
    name: "Hibisco Carmim",
    description:
      "Perfil floral-frutado com leve tom de chá, ideal para criações artesanais mais ousadas.",
  },
  {
    name: "Amora Rubra",
    description:
      "Notas de bosque com dulçor refinado, harmonizando a coleção vermelha com elegância.",
  },
]

export function RedCollection() {
  return (
    <section
      id="colecao-vermelha"
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top, hsl(352 60% 18%) 0%, hsl(353 52% 10%) 45%, hsl(356 64% 6%) 100%)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_1px,_transparent_1px)] [background-size:80px_80px] opacity-40" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#ff6f6f0f] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#ff4d4d10] to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-center mx-auto mb-16">
          <p className="uppercase tracking-[0.5em] text-sm text-red-200/70 mb-4">
            Red Bloom Collection
          </p>
          <h3 className="text-4xl md:text-5xl font-serif mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#ffb4a2] via-[#ff6f6f] to-[#ff9770]">
            A nova era das fragrâncias vermelhas
          </h3>
          <p className="text-lg text-white/80">
            Desenvolvemos uma linha totalmente dedicada aos tons rubros: frutas
            maduras, pétalas cintilantes e especiarias douradas que celebram a
            intensidade do vermelho em cada camada aromática.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {redFragrances.map((fragrance) => (
            <Card
              key={fragrance.name}
              className="group overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div
                className={`relative aspect-[4/5] bg-gradient-to-br ${fragrance.color} overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {fragrance.image && (
                  <img
                    src={fragrance.image}
                    alt={fragrance.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                  />
                )}
                <div className="absolute inset-0 mix-blend-lighten opacity-30 bg-[radial-gradient(circle,_rgba(255,255,255,0.6)_0%,_transparent_60%)]" />
                <div className="absolute top-4 right-4 text-xs uppercase tracking-[0.3em] text-white/60">
                  Rouge
                </div>
                <div className="absolute bottom-6 left-6">
                  <p className="text-xs text-white/60 uppercase tracking-[0.35em]">
                    Notas principais
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

        <div className="mt-20">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.4em] text-red-200/70 mb-3">
              Essências Rubras
            </p>
            <h4 className="text-3xl font-serif text-white">
              Matérias-primas da coleção
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {redEssences.map((essence) => (
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
