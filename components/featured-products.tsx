import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { Sparkles } from "lucide-react" // Added import for Sparkles

const products = [
  {
    name: "Ameixa Noir",
    description: "Notas profundas de ameixa preta com toque de baunilha",
    price: "R$ 289,00",
    image: "/purple-plum-perfume-bottle-elegant-gold-details.jpg",
  },
  {
    name: "Jabuticaba Mystique",
    description: "Essência brasileira com acordes amadeirados",
    price: "R$ 329,00",
    image: "/jabuticaba-perfume-bottle-luxury-purple-gold.jpg",
  },
  {
    name: "Uva Velvet",
    description: "Frescor das uvas com notas florais delicadas",
    price: "R$ 269,00",
    image: "/grape-perfume-bottle-elegant-violet-gold-accents.jpg",
  },
]

export function FeaturedProducts() {
  return (
    <section id="produtos" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-serif mb-4 text-primary">Coleção Purple Soul</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Perfumes artesanais que capturam a essência das frutas roxas mais refinadas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-2 hover:border-accent transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>
              <CardContent className="p-6">
                <h4 className="text-2xl font-serif mb-2 text-primary">{product.name}</h4>
                <p className="text-muted-foreground mb-4 leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-semibold text-accent">{product.price}</span>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
