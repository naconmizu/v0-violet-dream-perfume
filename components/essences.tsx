import { Card, CardContent } from "@/components/ui/card"

const essences = [
  {
    fruit: "Ameixa",
    description: "Rica em antioxidantes, a ameixa traz notas doces e profundas que evocam sofisticação e mistério.",
    color: "from-[#491D46] to-[#6B2D66]",
    image: "/fresh-purple-plums-botanical-illustration.jpg",
  },
  {
    fruit: "Jabuticaba",
    description: "Fruta brasileira única, oferece um aroma exótico e envolvente com toques terrosos e frutados.",
    color: "from-[#3A1536] to-[#491D46]",
    image: "/jabuticaba-fruit-botanical-illustration-purple.jpg",
  },
  {
    fruit: "Uva",
    description: "Clássica e elegante, a uva proporciona frescor e leveza com nuances florais delicadas.",
    color: "from-[#6B2D66] to-[#8B4D85]",
    image: "/purple-grapes-botanical-illustration-elegant.jpg",
  },
  {
    fruit: "Açaí",
    description: "Superfruta amazônica que adiciona profundidade e energia às composições aromáticas.",
    color: "from-[#5A2555] to-[#7A3D75]",
    image: "/acai-berries-botanical-illustration-purple.jpg",
  },
  {
    fruit: "Figo Roxo",
    description: "Fruta mediterrânea luxuosa com aroma adocicado e rico, trazendo elegância atemporal.",
    color: "from-[#491D46] to-[#8B4D85]",
    image: "/purple-fig-fruit-botanical-illustration.jpg",
  },
  {
    fruit: "Amora",
    description: "Fruta silvestre com aroma intenso e doce, adiciona profundidade e frescor às composições.",
    color: "from-[#3A1536] to-[#6B2D66]",
    image: "/blackberry-fruit-botanical-illustration-purple.jpg",
  },
  {
    fruit: "Mirtilo",
    description: "Fruta delicada com notas refrescantes e levemente ácidas, trazendo sofisticação e elegância.",
    color: "from-[#4A1F45] to-[#6B2D66]",
    image: "/blueberry-fruit-botanical-illustration-purple.jpg",
  },
  {
    fruit: "Cereja Roxa",
    description: "Notas suaves e adocicadas que evocam romance e feminilidade com toque de sofisticação.",
    color: "from-[#5A2555] to-[#7A3D75]",
    image: "/purple-cherry-fruit-botanical-illustration.jpg",
  },
  {
    fruit: "Groselha Negra",
    description: "Essência intensa e marcante com notas terrosas e profundas, ideal para perfumes ousados.",
    color: "from-[#3A1536] to-[#5A2555]",
    image: "/black-currant-fruit-botanical-illustration.jpg",
  },
  {
    fruit: "Ameixa Seca",
    description: "Notas concentradas e doces que trazem profundidade e complexidade às composições.",
    color: "from-[#491D46] to-[#6B2D66]",
    image: "/dried-plum-botanical-illustration.jpg",
  },
  {
    fruit: "Baga de Sabugueiro",
    description: "Aroma único e exótico com notas florais e frutadas, criando fragrâncias memoráveis.",
    color: "from-[#5A2555] to-[#8B4D85]",
    image: "/elderberry-fruit-botanical-illustration.jpg",
  },
  {
    fruit: "Aronia",
    description: "Superfruta com notas intensas e antioxidantes, adiciona vigor e energia às fragrâncias.",
    color: "from-[#3A1536] to-[#491D46]",
    image: "/aronia-berry-botanical-illustration.jpg",
  },
  {
    fruit: "Mirtilo Vermelho",
    description: "Combinação única de doçura e acidez, trazendo frescor e vivacidade às composições.",
    color: "from-[#6B2D66] to-[#8B4D85]",
    image: "/cranberry-fruit-botanical-illustration.jpg",
  },
]

export function Essences() {
  return (
    <section id="essencias" className="py-24 relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, hsl(305 18% 97%) 0%, hsl(305 22% 94%) 50%, hsl(305 18% 97%) 100%)'
    }}>
      {/* Padrão de fundo decorativo */}
      <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
      
      {/* Efeitos de gradiente decorativos */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent"></div>
      
      {/* Padrão SVG decorativo */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="essences-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="1.5" fill="currentColor" className="text-primary"/>
            <circle cx="20" cy="20" r="1" fill="currentColor" className="text-accent"/>
            <circle cx="60" cy="60" r="1" fill="currentColor" className="text-accent"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#essences-pattern)"/>
      </svg>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-serif mb-4 text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Nossas Essências
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada fragrância é cuidadosamente elaborada a partir das melhores frutas roxas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {essences.map((essence, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 bg-card"
            >
              <div
                className={`relative aspect-square bg-gradient-to-br ${essence.color} p-8 flex items-center justify-center overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={essence.image || "/placeholder.svg"}
                  alt={essence.fruit}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <h4 className="absolute bottom-6 left-6 text-3xl md:text-4xl font-serif text-white drop-shadow-lg z-10 group-hover:scale-105 transition-transform duration-300">
                  {essence.fruit}
                </h4>
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-white/40 group-hover:bg-white/80 transition-all duration-300 group-hover:scale-125" />
              </div>
              <CardContent className="p-6 bg-gradient-to-b from-card to-muted/30">
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {essence.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
