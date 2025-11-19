import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Share2, Sparkles } from "lucide-react"
import Link from "next/link"

const fragrances = [
  {
    slug: "ameixa-noir",
    name: "Ameixa Noir",
    tagline: "A Essência da Elegância Sombria",
    description: "Notas profundas de ameixa preta com toque de baunilha",
    price: "R$ 289,00",
    image: "/purple-plum-perfume-bottle-elegant-gold-details.jpg",
    fullDescription:
      "Ameixa Noir é uma fragrância sofisticada que captura a essência misteriosa da ameixa negra em seu ponto perfeito de maturação. Com abertura intensa e marcante, revela notas de frutas negras envoltas em baunilha bourbon e um toque de especiarias orientais.",
    notes: {
      top: ["Ameixa Negra", "Bergamota", "Cassis"],
      middle: ["Rosa Damascena", "Jasmim Sambac", "Violeta"],
      base: ["Baunilha Bourbon", "Âmbar", "Madeira de Cedro", "Almíscar"],
    },
    intensity: "Intensa",
    longevity: "8-10 horas",
    sillage: "Moderado a Forte",
    season: "Outono/Inverno",
    occasion: "Noturno, Eventos Especiais",
  },
  {
    slug: "jabuticaba-mystique",
    name: "Jabuticaba Mystique",
    tagline: "O Mistério Brasileiro em uma Fragrância",
    description: "Essência brasileira com acordes amadeirados",
    price: "R$ 329,00",
    image: "/jabuticaba-perfume-bottle-luxury-purple-gold.jpg",
    fullDescription:
      "Uma homenagem à fruta mais brasileira, Jabuticaba Mystique combina a doçura única da jabuticaba com acordes amadeirados sofisticados. Esta fragrância celebra a riqueza da biodiversidade brasileira com elegância contemporânea.",
    notes: {
      top: ["Jabuticaba", "Açaí", "Limão Siciliano"],
      middle: ["Orquídea Negra", "Frésia", "Pimenta Rosa"],
      base: ["Madeira de Agar", "Sândalo Cremoso", "Vetiver", "Patchouli"],
    },
    intensity: "Média a Intensa",
    longevity: "10-12 horas",
    sillage: "Forte",
    season: "Todas as Estações",
    occasion: "Versátil, Dia e Noite",
  },
  {
    slug: "uva-velvet",
    name: "Uva Velvet",
    tagline: "Frescor Aveludado e Delicado",
    description: "Frescor das uvas com notas florais delicadas",
    price: "R$ 269,00",
    image: "/grape-perfume-bottle-elegant-violet-gold-accents.jpg",
    fullDescription:
      "Uva Velvet captura a essência radiante das uvas no auge de sua maturação, combinada com notas florais delicadas que criam uma experiência olfativa fresca e sofisticada. Perfeita para quem busca elegância leve e moderna.",
    notes: {
      top: ["Uva Verde", "Pera", "Groselha Branca"],
      middle: ["Peônia", "Lírio do Vale", "Magnólia"],
      base: ["Musgo Branco", "Almíscar", "Madeira Clara"],
    },
    intensity: "Leve a Média",
    longevity: "6-8 horas",
    sillage: "Moderado",
    season: "Primavera/Verão",
    occasion: "Diurno, Casual Elegante",
  },
  {
    slug: "figo-roxo-imperial",
    name: "Figo Roxo Imperial",
    tagline: "Majestade Mediterrânea",
    description: "Fragrância sofisticada com notas de figo roxo e especiarias orientais",
    price: "R$ 349,00",
    image: "/elegant-purple-fig-perfume-bottle-with-gold-detail.jpg",
    fullDescription:
      "Inspirada nos jardins imperiais do Mediterrâneo, Figo Roxo Imperial é uma fragrância opulenta que combina a cremosidade do figo roxo maduro com especiarias orientais raras. Uma experiência olfativa verdadeiramente luxuosa.",
    notes: {
      top: ["Figo Roxo", "Mandarina Verde", "Cardamomo"],
      middle: ["Íris", "Heliotrópio", "Canela do Ceilão"],
      base: ["Fava Tonka", "Benjoim", "Incenso", "Couro"],
    },
    intensity: "Intensa",
    longevity: "12+ horas",
    sillage: "Muito Forte",
    season: "Outono/Inverno",
    occasion: "Ocasiões Especiais, Noturno",
  },
  {
    slug: "amora-sublime",
    name: "Amora Sublime",
    tagline: "Intensidade Silvestre Refinada",
    description: "Essência intensa de amora silvestre com toques de rosa búlgara",
    price: "R$ 309,00",
    image: "/blackberry-perfume-bottle-purple-gold-luxury.jpg",
    fullDescription:
      "Amora Sublime captura a intensidade da amora silvestre em perfeita harmonia com a delicadeza da rosa búlgara. Uma fragrância que equilibra força e feminilidade, rusticidade e refinamento em uma composição única.",
    notes: {
      top: ["Amora Silvestre", "Framboesa Negra", "Tangerina"],
      middle: ["Rosa Búlgara", "Gerânio", "Cravo"],
      base: ["Patchouli", "Baunilha", "Âmbar Cinza", "Chocolate Amargo"],
    },
    intensity: "Intensa",
    longevity: "10-12 horas",
    sillage: "Forte",
    season: "Todas as Estações",
    occasion: "Versátil, Statement",
  },
  {
    slug: "acai-nebular",
    name: "Acaí Nebular",
    tagline: "Energia Tropical em Forma de Fragrância",
    description: "Essência vibrante que combina doçura tropical com notas terrosas",
    price: "R$ 203,00",
    image: "/perfumeFei.png",
    fullDescription:
      "Acaí Nebular é uma celebração da riqueza amazônica, combinando a doçura única do açaí com notas terrosas profundas. Uma fragrância que transporta para a exuberância tropical com elegância contemporânea.",
    notes: {
      top: ["Açaí", "Maracujá", "Limão Tahiti"],
      middle: ["Jasmim", "Ylang-Ylang", "Pimenta Rosa"],
      base: ["Vetiver", "Patchouli", "Cacau", "Madeira de Cedro"],
    },
    intensity: "Média",
    longevity: "8-10 horas",
    sillage: "Moderado a Forte",
    season: "Primavera/Verão",
    occasion: "Diurno, Casual Elegante",
  },
  {
    slug: "mirtilo-elegant",
    name: "Mirtilo Élégant",
    tagline: "Delicadeza e Sofisticação em Cada Nota",
    description: "Fragrância refrescante com notas delicadas de mirtilo e acordes florais",
    price: "R$ 279,00",
    image: "/blueberry-perfume-bottle-elegant-purple.jpg",
    fullDescription:
      "Mirtilo Élégant captura a essência refinada do mirtilo em uma composição delicada e sofisticada. Notas florais harmoniosas complementam a frescura natural da fruta, criando uma fragrância elegante e atemporal.",
    notes: {
      top: ["Mirtilo", "Groselha Branca", "Bergamota"],
      middle: ["Rosa Branca", "Lírio do Vale", "Peônia"],
      base: ["Almíscar Branco", "Sândalo", "Âmbar Suave"],
    },
    intensity: "Leve a Média",
    longevity: "6-8 horas",
    sillage: "Moderado",
    season: "Primavera/Verão",
    occasion: "Diurno, Elegante Casual",
  },
  {
    slug: "cereja-roxo-romantica",
    name: "Cereja Roxa Romântica",
    tagline: "Romance e Feminilidade em Essência",
    description: "Perfume feminino e sofisticado com notas suaves de cereja roxa e pétalas",
    price: "R$ 299,00",
    image: "/purple-cherry-perfume-bottle-romantic.jpg",
    fullDescription:
      "Cereja Roxa Romântica é uma fragrância que celebra a feminilidade com elegância. Notas suaves de cereja roxa se entrelaçam com pétalas florais, criando uma experiência olfativa romântica e sofisticada.",
    notes: {
      top: ["Cereja Roxa", "Pêssego", "Framboesa"],
      middle: ["Rosa de Maio", "Violeta", "Íris"],
      base: ["Baunilha", "Almíscar", "Madeira de Cerejeira"],
    },
    intensity: "Média",
    longevity: "8-10 horas",
    sillage: "Moderado",
    season: "Todas as Estações",
    occasion: "Romântico, Encontros Especiais",
  },
  {
    slug: "groselha-negra-noir",
    name: "Groselha Negra Noir",
    tagline: "Intensidade e Caráter Único",
    description: "Essência intensa e marcante com profundidade e caráter único",
    price: "R$ 319,00",
    image: "/black-currant-perfume-bottle-luxury.jpg",
    fullDescription:
      "Groselha Negra Noir é uma fragrância ousada e marcante que celebra a intensidade única da groselha negra. Notas terrosas e profundas criam uma experiência olfativa poderosa e memorável.",
    notes: {
      top: ["Groselha Negra", "Cassis", "Pimenta Preta"],
      middle: ["Rosa Negra", "Gerânio", "Cipreste"],
      base: ["Patchouli", "Vetiver", "Couro", "Tabaco"],
    },
    intensity: "Intensa",
    longevity: "12+ horas",
    sillage: "Muito Forte",
    season: "Outono/Inverno",
    occasion: "Noturno, Ousado",
  },
  {
    slug: "ameixa-seca-royal",
    name: "Ameixa Seca Royal",
    tagline: "Complexidade Real em Cada Gota",
    description: "Fragrância rica e complexa com notas concentradas e elegantes",
    price: "R$ 339,00",
    image: "/dried-plum-perfume-bottle-royal.jpg",
    fullDescription:
      "Ameixa Seca Royal é uma fragrância opulenta que celebra a complexidade da ameixa seca. Notas concentradas e ricas se desenvolvem em uma composição elegante e sofisticada, digna de realeza.",
    notes: {
      top: ["Ameixa Seca", "Rum", "Canela"],
      middle: ["Rosa Damascena", "Orquídea", "Heliotrópio"],
      base: ["Baunilha Bourbon", "Âmbar", "Benjoim", "Sândalo"],
    },
    intensity: "Intensa",
    longevity: "12+ horas",
    sillage: "Forte",
    season: "Outono/Inverno",
    occasion: "Ocasiões Especiais, Luxuoso",
  },
  {
    slug: "sabugueiro-mystic",
    name: "Sabugueiro Mystic",
    tagline: "Mistério e Exotismo em Essência",
    description: "Perfume exótico e memorável com notas florais e frutadas únicas",
    price: "R$ 289,00",
    image: "/elderberry-perfume-bottle-mystic.jpg",
    fullDescription:
      "Sabugueiro Mystic é uma fragrância exótica que captura o mistério único da baga de sabugueiro. Notas florais e frutadas se combinam em uma composição memorável e intrigante.",
    notes: {
      top: ["Baga de Sabugueiro", "Pera", "Lima"],
      middle: ["Flor de Sabugueiro", "Jasmim", "Tuberosa"],
      base: ["Almíscar", "Madeira de Sândalo", "Mel"],
    },
    intensity: "Média a Intensa",
    longevity: "8-10 horas",
    sillage: "Moderado a Forte",
    season: "Todas as Estações",
    occasion: "Versátil, Exótico",
  },
  {
    slug: "aronia-power",
    name: "Aronia Power",
    tagline: "Energia e Vitalidade em Forma de Fragrância",
    description: "Essência energética e vibrante com notas intensas e antioxidantes",
    price: "R$ 259,00",
    image: "/aronia-perfume-bottle-power.jpg",
    fullDescription:
      "Aronia Power é uma fragrância vibrante que celebra a energia da superfruta aronia. Notas intensas e antioxidantes criam uma experiência olfativa revigorante e cheia de vitalidade.",
    notes: {
      top: ["Aronia", "Açaí", "Groselha"],
      middle: ["Gengibre", "Cardamomo", "Pimenta Rosa"],
      base: ["Vetiver", "Cedro", "Almíscar"],
    },
    intensity: "Média a Intensa",
    longevity: "8-10 horas",
    sillage: "Moderado a Forte",
    season: "Todas as Estações",
    occasion: "Diurno, Energético",
  },
  {
    slug: "mirtilo-vermelho-fresh",
    name: "Mirtilo Vermelho Fresh",
    tagline: "Frescor e Vivacidade em Cada Nota",
    description: "Fragrância fresca e vivaz com combinação única de doçura e acidez",
    price: "R$ 249,00",
    image: "/cranberry-perfume-bottle-fresh.jpg",
    fullDescription:
      "Mirtilo Vermelho Fresh é uma fragrância que celebra a vivacidade única do mirtilo vermelho. A combinação perfeita entre doçura e acidez cria uma experiência olfativa fresca e revigorante.",
    notes: {
      top: ["Mirtilo Vermelho", "Laranja", "Limão"],
      middle: ["Rosa", "Jasmim", "Lavanda"],
      base: ["Almíscar", "Sândalo", "Cedro"],
    },
    intensity: "Leve a Média",
    longevity: "6-8 horas",
    sillage: "Moderado",
    season: "Primavera/Verão",
    occasion: "Diurno, Casual Fresco",
  },
]

export default function FragrancePage({ params }: { params: { slug: string } }) {
  const fragrance = fragrances.find((f) => f.slug === params.slug)

  if (!fragrance) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
                <img
                  src={fragrance.image || "/placeholder.svg"}
                  alt={fragrance.name}
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">{fragrance.tagline}</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif bg-gradient-to-r from-[#D4AF37] via-[#F4E5C3] to-[#D4AF37] bg-clip-text text-transparent">
                {fragrance.name}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">{fragrance.fullDescription}</p>

              <div className="flex items-center gap-4 pt-4">
                <span className="text-4xl font-bold text-accent">{fragrance.price}</span>
                <span className="text-sm text-muted-foreground">50ml Eau de Parfum</span>
              </div>

              <div className="flex gap-3 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                <Button size="lg" variant="outline" className="border-2 bg-transparent">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 bg-transparent">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pyramid Notes */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif text-center mb-12 text-primary">Pirâmide Olfativa</h2>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Top Notes */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center border-2 border-accent/30">
                <span className="text-2xl">🌸</span>
              </div>
              <h3 className="text-2xl font-serif text-primary">Notas de Saída</h3>
              <ul className="space-y-2">
                {fragrance.notes.top.map((note, i) => (
                  <li key={i} className="text-muted-foreground">
                    {note}
                  </li>
                ))}
              </ul>
            </div>

            {/* Middle Notes */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border-2 border-primary/30">
                <span className="text-2xl">💐</span>
              </div>
              <h3 className="text-2xl font-serif text-primary">Notas de Coração</h3>
              <ul className="space-y-2">
                {fragrance.notes.middle.map((note, i) => (
                  <li key={i} className="text-muted-foreground">
                    {note}
                  </li>
                ))}
              </ul>
            </div>

            {/* Base Notes */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center border-2 border-primary/40">
                <span className="text-2xl">🌳</span>
              </div>
              <h3 className="text-2xl font-serif text-primary">Notas de Fundo</h3>
              <ul className="space-y-2">
                {fragrance.notes.base.map((note, i) => (
                  <li key={i} className="text-muted-foreground">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Characteristics */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif text-center mb-12 text-primary">Características</h2>

          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-muted/30 border border-border">
              <h3 className="font-semibold text-lg mb-2 text-primary">Intensidade</h3>
              <p className="text-muted-foreground">{fragrance.intensity}</p>
            </div>
            <div className="p-6 rounded-2xl bg-muted/30 border border-border">
              <h3 className="font-semibold text-lg mb-2 text-primary">Longevidade</h3>
              <p className="text-muted-foreground">{fragrance.longevity}</p>
            </div>
            <div className="p-6 rounded-2xl bg-muted/30 border border-border">
              <h3 className="font-semibold text-lg mb-2 text-primary">Sillage</h3>
              <p className="text-muted-foreground">{fragrance.sillage}</p>
            </div>
            <div className="p-6 rounded-2xl bg-muted/30 border border-border">
              <h3 className="font-semibold text-lg mb-2 text-primary">Estação</h3>
              <p className="text-muted-foreground">{fragrance.season}</p>
            </div>
            <div className="p-6 rounded-2xl bg-muted/30 border border-border sm:col-span-2">
              <h3 className="font-semibold text-lg mb-2 text-primary">Ocasião Ideal</h3>
              <p className="text-muted-foreground">{fragrance.occasion}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif mb-6 text-primary">Pronto para Experimentar?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Descubra a magia de {fragrance.name} e deixe-se envolver por esta fragrância única
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Comprar Agora
            </Button>
            <Button size="lg" variant="outline" asChild className="border-2 bg-transparent">
              <Link href="/#produtos">Ver Todas as Fragrâncias</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
