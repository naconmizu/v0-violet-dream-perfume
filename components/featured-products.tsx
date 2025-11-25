import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

const products = [
  {
    name: "Ameixa Noir",
    description: "Notas profundas de ameixa preta com toque de baunilha",
    price: "R$ 289,00",
    image: "/purple-plum-perfume-bottle-elegant-gold-details.jpg",
    slug: "ameixa-noir",
  },
  {
    name: "Jabuticaba Mystique",
    description: "Essência brasileira com acordes amadeirados",
    price: "R$ 329,00",
    image: "/jabuticaba-perfume-bottle-luxury-purple-gold.jpg",
    slug: "jabuticaba-mystique",
  },
  {
    name: "Uva Velvet",
    description: "Frescor das uvas com notas florais delicadas",
    price: "R$ 269,00",
    image: "/grape-perfume-bottle-elegant-violet-gold-accents.jpg",
    slug: "uva-velvet",
  },
  {
    name: "Figo Roxo Imperial",
    description: "Fragrância sofisticada com notas de figo roxo e especiarias orientais",
    price: "R$ 349,00",
    image: "/elegant-purple-fig-perfume-bottle-with-gold-detail.jpg",
    slug: "figo-roxo-imperial",
  },
  {
    name: "Amora Sublime",
    description: "Essência intensa de amora silvestre com toques de rosa búlgara",
    price: "R$ 309,00",
    image: "/blackberry-perfume-bottle-purple-gold-luxury.jpg",
    slug: "amora-sublime",
  },

  {
    name: "Acaí Nebular",
    description: "Essência vibrante que combina doçura tropical com notas terrosas.",
    price: "R$ 203,00",
    image: "/perfumeFei.png",
    slug: "acai-nebular",
  },
  {
    name: "Mirtilo Élégant",
    description: "Fragrância refrescante com notas delicadas de mirtilo e acordes florais",
    price: "R$ 279,00",
    image: "/mirtiloFei.jpeg",
    slug: "mirtilo-elegant",
  },
  {
    name: "Cereja Roxa Romântica",
    description: "Perfume feminino e sofisticado com notas suaves de cereja roxa e pétalas",
    price: "R$ 299,00",
    image: "/purple-cherry-perfume-bottle-romantic.jpg",
    slug: "cereja-roxo-romantica",
  },
  {
    name: "Groselha Negra Noir",
    description: "Essência intensa e marcante com profundidade e caráter único",
    price: "R$ 319,00",
    image: "/black-currant-perfume-bottle-luxury.jpg",
    slug: "groselha-negra-noir",
  },
  {
    name: "Ameixa Seca Royal",
    description: "Fragrância rica e complexa com notas concentradas e elegantes",
    price: "R$ 339,00",
    image: "/ameixaFeia.jpg",
    slug: "ameixa-seca-royal",
  },
  {
    name: "Sabugueiro Mystic",
    description: "Perfume exótico e memorável com notas florais e frutadas únicas",
    price: "R$ 289,00",
    image: "/sabugoFei.jpg",
    slug: "sabugueiro-mystic",
  },
  {
    name: "Aronia Power",
    description: "Essência energética e vibrante com notas intensas e antioxidantes",
    price: "R$ 259,00",
    image: "/aronia-perfume-bottle-power.jpg",
    slug: "aronia-power",
  },
  // {
  //   name: "Mirtilo Vermelho Fresh",
  //   description: "Fragrância fresca e vivaz com combinação única de doçura e acidez",
  //   price: "R$ 249,00",
  //   image: "/cranberry-perfume-bottle-fresh.jpg",
  //   slug: "mirtilo-vermelho-fresh",
  // },
]

export function FeaturedProducts() {
  return (
    <section id="produtos" className="py-24 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, hsl(305 32% 7%) 0%, hsl(305 38% 5%) 100%)'
    }}>
      {/* Padrão de fundo decorativo */}
      <div className="absolute inset-0 bg-pattern-waves opacity-30"></div>
      
      {/* Efeitos de gradiente decorativos */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full" style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)' }}></div>
      
      {/* Padrão SVG decorativo */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="products-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M0 30 L60 30 M30 0 L30 60" stroke="currentColor" strokeWidth="0.5" className="text-primary"/>
            <circle cx="30" cy="30" r="2" fill="currentColor" className="text-primary" opacity="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#products-pattern)"/>
      </svg>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-serif mb-4 bg-gradient-to-r from-[gold] via-[#F4E5C3] to-[gold] bg-clip-text text-transparent ">Coleção Purple Soul</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Perfumes artesanais que capturam a essência das frutas roxas mais refinadas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Link key={index} href={`/fragrancia/${product.slug}`}>
              <Card className="group overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 cursor-pointer bg-card">
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:bg-primary group-hover:scale-110 transition-all duration-300"></div>
                </div>
                <CardContent className="p-6 bg-gradient-to-b from-card to-muted/20">
                  <h4 className="text-2xl font-serif mb-2 text-primary group-hover:text-accent transition-colors duration-300">{product.name}</h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{product.price}</span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
