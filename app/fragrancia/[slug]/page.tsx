import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Heart, Share2, Sparkles } from "lucide-react"
import InteractiveControls from "@/components/fragrance-controls"
import BackButton from "@/components/back-button"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Button } from "@/components/ui/button"
import type { Perfume } from "@/lib/perfumes"
import { perfumes } from "@/lib/perfumes"

type OlfactoryNotes = {
  top: string[]
  heart: string[]
  base: string[]
}

type DetailedFragrance = {
  tagline: string
  fullDescription: string
  notes: OlfactoryNotes
  intensity: string
  longevity: string
  sillage: string
  season: string
  occasion: string
}

const fragranceDetails: Record<string, DetailedFragrance> = {
  "ameixa-noir": {
    tagline: "A Essência da Elegância Sombria",
    fullDescription:
      "Ameixa Noir é uma fragrância sofisticada que captura a essência misteriosa da ameixa negra em seu ponto perfeito de maturação. Com abertura intensa e marcante, revela notas de frutas negras envoltas em baunilha bourbon e um toque de especiarias orientais.",
    notes: {
      top: ["Ameixa Negra", "Bergamota", "Cassis"],
      heart: ["Rosa Damascena", "Jasmim Sambac", "Violeta"],
      base: ["Baunilha Bourbon", "Âmbar", "Madeira de Cedro", "Almíscar"],
    },
    intensity: "Intensa",
    longevity: "8-10 horas",
    sillage: "Moderado a Forte",
    season: "Outono/Inverno",
    occasion: "Noturno, Eventos Especiais",
  },
  "jabuticaba-mystique": {
    tagline: "O Mistério Brasileiro em uma Fragrância",
    fullDescription:
      "Uma homenagem à fruta mais brasileira, Jabuticaba Mystique combina a doçura única da jabuticaba com acordes amadeirados sofisticados. Esta fragrância celebra a riqueza da biodiversidade brasileira com elegância contemporânea.",
    notes: {
      top: ["Jabuticaba", "Açaí", "Limão Siciliano"],
      heart: ["Orquídea Negra", "Frésia", "Pimenta Rosa"],
      base: ["Madeira de Agar", "Sândalo Cremoso", "Vetiver", "Patchouli"],
    },
    intensity: "Média a Intensa",
    longevity: "10-12 horas",
    sillage: "Forte",
    season: "Todas as Estações",
    occasion: "Versátil, Dia e Noite",
  },
  "uva-velvet": {
    tagline: "Frescor Aveludado e Delicado",
    fullDescription:
      "Uva Velvet captura a essência radiante das uvas no auge de sua maturação, combinada com notas florais delicadas que criam uma experiência olfativa fresca e sofisticada. Perfeita para quem busca elegância leve e moderna.",
    notes: {
      top: ["Uva Verde", "Pera", "Groselha Branca"],
      heart: ["Peônia", "Lírio do Vale", "Magnólia"],
      base: ["Musgo Branco", "Almíscar", "Madeira Clara"],
    },
    intensity: "Leve a Média",
    longevity: "6-8 horas",
    sillage: "Moderado",
    season: "Primavera/Verão",
    occasion: "Diurno, Casual Elegante",
  },
  "figo-roxo-imperial": {
    tagline: "Majestade Mediterrânea",
    fullDescription:
      "Inspirada nos jardins imperiais do Mediterrâneo, Figo Roxo Imperial combina a cremosidade do figo roxo maduro com especiarias orientais raras. Uma experiência olfativa verdadeiramente luxuosa.",
    notes: {
      top: ["Figo Roxo", "Mandarina Verde", "Cardamomo"],
      heart: ["Íris", "Heliotrópio", "Canela do Ceilão"],
      base: ["Fava Tonka", "Benjoim", "Incenso", "Couro"],
    },
    intensity: "Intensa",
    longevity: "12+ horas",
    sillage: "Muito Forte",
    season: "Outono/Inverno",
    occasion: "Ocasiões Especiais, Noturno",
  },
  "amora-sublime": {
    tagline: "Intensidade Silvestre Refinada",
    fullDescription:
      "Amora Sublime captura a intensidade da amora silvestre em perfeita harmonia com a delicadeza da rosa búlgara. Uma fragrância que equilibra força e feminilidade em uma composição única.",
    notes: {
      top: ["Amora Silvestre", "Framboesa Negra", "Tangerina"],
      heart: ["Rosa Búlgara", "Gerânio", "Cravo"],
      base: ["Patchouli", "Baunilha", "Âmbar Cinza", "Chocolate Amargo"],
    },
    intensity: "Intensa",
    longevity: "10-12 horas",
    sillage: "Forte",
    season: "Todas as Estações",
    occasion: "Versátil, Statement",
  },
  "acai-nebular": {
    tagline: "Energia Tropical em Forma de Fragrância",
    fullDescription:
      "Açaí Nebular celebra a riqueza amazônica, combinando a doçura única do açaí com notas terrosas profundas. Uma fragrância que transporta para a exuberância tropical com elegância contemporânea.",
    notes: {
      top: ["Açaí", "Maracujá", "Limão Tahiti"],
      heart: ["Jasmim", "Ylang-Ylang", "Pimenta Rosa"],
      base: ["Vetiver", "Patchouli", "Cacau", "Madeira de Cedro"],
    },
    intensity: "Média",
    longevity: "8-10 horas",
    sillage: "Moderado a Forte",
    season: "Primavera/Verão",
    occasion: "Diurno, Casual Elegante",
  },
  "mirtilo-elegant": {
    tagline: "Delicadeza e Sofisticação em Cada Nota",
    fullDescription:
      "Mirtilo Élégant captura a essência refinada do mirtilo em uma composição delicada. Notas florais harmoniosas complementam a frescura natural da fruta, criando uma fragrância elegante e atemporal.",
    notes: {
      top: ["Mirtilo", "Groselha Branca", "Bergamota"],
      heart: ["Rosa Branca", "Lírio do Vale", "Peônia"],
      base: ["Almíscar Branco", "Sândalo", "Âmbar Suave"],
    },
    intensity: "Leve a Média",
    longevity: "6-8 horas",
    sillage: "Moderado",
    season: "Primavera/Verão",
    occasion: "Diurno, Elegante Casual",
  },
  "cereja-roxo-romantica": {
    tagline: "Romance e Feminilidade em Essência",
    fullDescription:
      "Cereja Roxa Romântica celebra a feminilidade. Notas suaves de cereja roxa se entrelaçam com pétalas florais, criando uma experiência romântica e sofisticada.",
    notes: {
      top: ["Cereja Roxa", "Pêssego", "Framboesa"],
      heart: ["Rosa de Maio", "Violeta", "Íris"],
      base: ["Baunilha", "Almíscar", "Madeira de Cerejeira"],
    },
    intensity: "Média",
    longevity: "8-10 horas",
    sillage: "Moderado",
    season: "Todas as Estações",
    occasion: "Romântico, Encontros Especiais",
  },
  "groselha-negra-noir": {
    tagline: "Intensidade e Caráter Único",
    fullDescription:
      "Groselha Negra Noir celebra a intensidade única da groselha negra. Notas terrosas e profundas criam uma experiência olfativa poderosa e memorável.",
    notes: {
      top: ["Groselha Negra", "Cassis", "Pimenta Preta"],
      heart: ["Rosa Negra", "Gerânio", "Cipreste"],
      base: ["Patchouli", "Vetiver", "Couro", "Tabaco"],
    },
    intensity: "Intensa",
    longevity: "12+ horas",
    sillage: "Muito Forte",
    season: "Outono/Inverno",
    occasion: "Noturno, Ousado",
  },
  "ameixa-seca-royal": {
    tagline: "Complexidade Real em Cada Gota",
    fullDescription:
      "Ameixa Seca Royal celebra a complexidade da ameixa seca. Notas concentradas e ricas se desenvolvem em uma composição sofisticada, digna de realeza.",
    notes: {
      top: ["Ameixa Seca", "Rum", "Canela"],
      heart: ["Rosa Damascena", "Orquídea", "Heliotrópio"],
      base: ["Baunilha Bourbon", "Âmbar", "Benjoim", "Sândalo"],
    },
    intensity: "Intensa",
    longevity: "12+ horas",
    sillage: "Forte",
    season: "Outono/Inverno",
    occasion: "Ocasiões Especiais, Luxuoso",
  },
  "sabugueiro-mystic": {
    tagline: "Mistério e Exotismo em Essência",
    fullDescription:
      "Sabugueiro Mystic é uma fragrância exótica que captura o mistério único da baga de sabugueiro. Notas florais e frutadas se combinam em uma composição intrigante.",
    notes: {
      top: ["Baga de Sabugueiro", "Pera", "Lima"],
      heart: ["Flor de Sabugueiro", "Jasmim", "Tuberosa"],
      base: ["Almíscar", "Madeira de Sândalo", "Mel"],
    },
    intensity: "Média a Intensa",
    longevity: "8-10 horas",
    sillage: "Moderado a Forte",
    season: "Todas as Estações",
    occasion: "Versátil, Exótico",
  },
  "aronia-power": {
    tagline: "Energia e Vitalidade em Forma de Fragrância",
    fullDescription:
      "Aronia Power celebra a energia da superfruta aronia. Notas intensas e antioxidantes criam uma experiência olfativa revigorante e cheia de vitalidade.",
    notes: {
      top: ["Aronia", "Açaí", "Groselha"],
      heart: ["Gengibre", "Cardamomo", "Pimenta Rosa"],
      base: ["Vetiver", "Cedro", "Almíscar"],
    },
    intensity: "Média a Intensa",
    longevity: "8-10 horas",
    sillage: "Moderado a Forte",
    season: "Todas as Estações",
    occasion: "Diurno, Energético",
  },
  "mirtilo-vermelho-fresh": {
    tagline: "Frescor e Vivacidade em Cada Nota",
    fullDescription:
      "Mirtilo Vermelho Fresh celebra a vivacidade única do mirtilo vermelho. A combinação perfeita entre doçura e acidez cria uma experiência fresca e revigorante.",
    notes: {
      top: ["Mirtilo Vermelho", "Laranja", "Limão"],
      heart: ["Rosa", "Jasmim", "Lavanda"],
      base: ["Almíscar", "Sândalo", "Cedro"],
    },
    intensity: "Leve a Média",
    longevity: "6-8 horas",
    sillage: "Moderado",
    season: "Primavera/Verão",
    occasion: "Diurno, Casual Fresco",
  },
  "ouro-solar": {
    tagline: "Luminosidade em Frasco",
    fullDescription:
      "Ouro Solar ilumina a pele como um raio dourado. Bergamota italiana e pimenta rosa abrem caminho para um coração floral solar, finalizando em um âmbar luminoso que aquece o rastro.",
    notes: {
      top: ["Bergamota Italiana", "Pimenta Rosa"],
      heart: ["Flor de Laranjeira", "Néroli", "Lavanda"],
      base: ["Âmbar Solar", "Cedro Dourado", "Musk Radiante"],
    },
    intensity: "Média a Intensa",
    longevity: "10-12 horas",
    sillage: "Forte e Radiante",
    season: "Primavera/Verão",
    occasion: "Eventos ao entardecer, celebrações ao ar livre",
  },
  "mel-de-safra": {
    tagline: "Gourmand Artesanal Dourado",
    fullDescription:
      "Mel de Safra traduz o calor artesanal do mel de acácia recém-colhido misturado a flor de laranjeira cremosa e sândalo envolvente, criando uma assinatura gourmand sofisticada.",
    notes: {
      top: ["Mel de Acácia", "Mandarina Doce"],
      heart: ["Flor de Laranjeira", "Gardênia Cremosa", "Jasmim Mel"],
      base: ["Sândalo Creme", "Baunilha Fava", "Âmbar Dourado"],
    },
    intensity: "Intensa",
    longevity: "12 horas",
    sillage: "Aveludado e Envolvente",
    season: "Outono/Inverno",
    occasion: "Jantares, encontros intimistas",
  },
  "ambar-aurora": {
    tagline: "Resina Dourada Contemporânea",
    fullDescription:
      "Âmbar Aurora combina resinas preciosas com figo dourado e incenso branco, resultando em um perfume que pulsa entre o calor e a luz, ideal para quem busca sofisticação moderna.",
    notes: {
      top: ["Figo Dourado", "Pêssego Branco"],
      heart: ["Âmbar Vivo", "Benjoim", "Jasmim Absoluto"],
      base: ["Fava Tonka", "Incenso Branco", "Cashmere"],
    },
    intensity: "Muito Intensa",
    longevity: "12+ horas",
    sillage: "Imponente",
    season: "Inverno",
    occasion: "Galas, coquetéis noturnos",
  },
  "champanhe-velours": {
    tagline: "Brilho Festivo e Aveludado",
    fullDescription:
      "Champanhe Velours captura a sensação de uma celebração atemporal: bolhas de champanhe rosé, pera cristalina e um véu de almíscar cremoso que envolve como veludo.",
    notes: {
      top: ["Champanhe Rosé", "Pera Cristal", "Framboesa Clara"],
      heart: ["Peônia Rosa", "Flor de Laranjeira", "Íris Aveludada"],
      base: ["Almíscar Cremoso", "Baunilha", "Cedro Branco"],
    },
    intensity: "Média",
    longevity: "8-10 horas",
    sillage: "Elegante e brilhante",
    season: "Todas as estações",
    occasion: "Celebrações, festas sofisticadas",
  },
  "framboesa-carmesim": {
    tagline: "Doçura Cintilante",
    fullDescription:
      "Framboesa Carmesim equilibra a doçura suculenta da framboesa madura com lichia cintilante e pétalas cristalinas, resultando em um perfume alegre e elegante.",
    notes: {
      top: ["Framboesa Silvestre", "Lichia Rubra", "Limão Siciliano"],
      heart: ["Pétalas Cristalinas", "Magnólia", "Rosa Chá"],
      base: ["Âmbar Translúcido", "Musk Branco", "Sândalo Leve"],
    },
    intensity: "Média",
    longevity: "8 horas",
    sillage: "Radiante",
    season: "Primavera/Verão",
    occasion: "Brunchs, encontros ao ar livre",
  },
  "roma-royale": {
    tagline: "Majestade Rubra",
    fullDescription:
      "Romã Royale exala sofisticação com notas suculentas de romã rubra, madeira de cerejeira polida e baunilha tostada, criando um rastro majestoso.",
    notes: {
      top: ["Romã Rubra", "Groselha Escura"],
      heart: ["Madeira de Cerejeira", "Jasmim Noturno"],
      base: ["Baunilha Dourada", "Patchouli", "Âmbar Rubro"],
    },
    intensity: "Intensa",
    longevity: "10-12 horas",
    sillage: "Envolvente",
    season: "Outono",
    occasion: "Eventos de gala, noites especiais",
  },
  "pitanga-aurora": {
    tagline: "Vermelho Tropical Vibrante",
    fullDescription:
      "Pitanga Aurora celebra a acidez luminosa da pitanga brasileira com cardamomo rosé e fava tonka, entregando modernidade e energia tropical.",
    notes: {
      top: ["Pitanga Brasileira", "Mandarina Verde"],
      heart: ["Cardamomo Rosé", "Magnólia", "Folhas de Violeta"],
      base: ["Fava Tonka", "Cedro", "Cashmeran"],
    },
    intensity: "Média",
    longevity: "8 horas",
    sillage: "Versátil",
    season: "Verão",
    occasion: "Dia a dia sofisticado",
  },
  "hibisco-rubro": {
    tagline: "Floral Artístico e Profundo",
    fullDescription:
      "Hibisco Rubro combina hibisco, rosa damascena e chá preto defumado em uma composição artística que equilibra brilho floral e profundidade âmbar.",
    notes: {
      top: ["Hibisco Carmim", "Frésia Rubra"],
      heart: ["Rosa Damascena", "Chá Preto", "Peônia Escarlate"],
      base: ["Âmbar Escuro", "Fava Tonka", "Madeira de Ébano"],
    },
    intensity: "Intensa",
    longevity: "10-12 horas",
    sillage: "Marcante",
    season: "Outono/Inverno",
    occasion: "Concertos, arte contemporânea",
  },
}

const findPerfumeBySlug = (slug: string): Perfume | undefined => perfumes.find((perfume) => perfume.slug === slug)

const buildFragrance = (slug: string) => {
  const perfume = findPerfumeBySlug(slug)
  if (!perfume) {
    return null
  }

  const detail = fragranceDetails[slug]
  const description = detail?.fullDescription ?? perfume.description

  const notes: OlfactoryNotes = detail?.notes ?? {
    top: perfume.notes.top,
    heart: perfume.notes.heart,
    base: perfume.notes.base,
  }

  const meta = {
    intensity: detail?.intensity ?? "Intensidade moderada",
    longevity: detail?.longevity ?? "6-8 horas",
    sillage: detail?.sillage ?? "Moderado",
    season: detail?.season ?? "Todas as estações",
    occasion: detail?.occasion ?? "Uso versátil",
  }

  return {
    perfume,
    detail: {
      tagline: detail?.tagline ?? perfume.name,
      fullDescription: description,
      notes,
      ...meta,
    },
  }
}

export async function generateStaticParams() {
  return perfumes.map((perfume) => ({ slug: perfume.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const fragrance = buildFragrance(slug)

  if (!fragrance) {
    return {
      title: "Fragrância não encontrada | Violet Dream",
    }
  }

  const { perfume, detail } = fragrance
  return {
    title: `${perfume.name} | Violet Dream`,
    description: detail.fullDescription,
    openGraph: {
      title: perfume.name,
      description: detail.fullDescription,
      images: [{ url: perfume.image }],
    },
  }
}

export default async function FragrancePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const fragrance = buildFragrance(slug)

  if (!fragrance) {
    notFound()
  }

  const { perfume, detail } = fragrance

  const productForCart = {
    id: perfume.id,
    slug: perfume.slug,
    name: perfume.name,
    description: perfume.description,
    price: perfume.price,
    priceFormatted: perfume.priceFormatted,
    image: perfume.image || "/placeholder.svg",
    category: perfume.category,
  }

  return (
    <div className="min-h-screen">
      {/* Fixed back button in the top-left corner */}
      <BackButton />
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5">
        {/* Note: top-left duplicate controls removed; controls rendered in the info area below */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
                <img
                  src={perfume.image || "/placeholder.svg"}
                  alt={perfume.name}
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">{detail.tagline}</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif bg-gradient-to-r from-[#D4AF37] via-[#F4E5C3] to-[#D4AF37] bg-clip-text text-transparent">
                {perfume.name}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">{detail.fullDescription}</p>

              <div className="flex items-center gap-4 pt-4">
                <span className="text-4xl font-bold text-accent">{perfume.priceFormatted}</span>
                <span className="text-sm text-muted-foreground">50ml Eau de Parfum</span>
              </div>

              <div className="flex gap-3 pt-4 items-center">
                <AddToCartButton product={productForCart} size="lg" className="flex-1" />
                {/* Use the client InteractiveControls here instead of the two simple buttons */}
                <div className="flex-none">
                  <InteractiveControls perfumeName={perfume.name} />
                </div>
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
                {detail.notes.top.map((note, i) => (
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
                {detail.notes.heart.map((note, i) => (
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
                {detail.notes.base.map((note, i) => (
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
              <p className="text-muted-foreground">{detail.intensity}</p>
            </div>
            <div className="p-6 rounded-2xl bg-muted/30 border border-border">
              <h3 className="font-semibold text-lg mb-2 text-primary">Longevidade</h3>
              <p className="text-muted-foreground">{detail.longevity}</p>
            </div>
            <div className="p-6 rounded-2xl bg-muted/30 border border-border">
              <h3 className="font-semibold text-lg mb-2 text-primary">Sillage</h3>
              <p className="text-muted-foreground">{detail.sillage}</p>
            </div>
            <div className="p-6 rounded-2xl bg-muted/30 border border-border">
              <h3 className="font-semibold text-lg mb-2 text-primary">Estação</h3>
              <p className="text-muted-foreground">{detail.season}</p>
            </div>
            <div className="p-6 rounded-2xl bg-muted/30 border border-border sm:col-span-2">
              <h3 className="font-semibold text-lg mb-2 text-primary">Ocasião Ideal</h3>
              <p className="text-muted-foreground">{detail.occasion}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif mb-6 text-primary">Pronto para Experimentar?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Descubra a magia de {perfume.name} e deixe-se envolver por esta fragrância única
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <AddToCartButton product={productForCart} size="lg" />
            <Button size="lg" variant="outline" asChild className="border-2 bg-transparent">
              <Link href="/#produtos">Ver Todas as Fragrâncias</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
