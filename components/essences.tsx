import { Card, CardContent } from "@/components/ui/card"

const essences = [
  {
    fruit: "Ameixa",
    description: "Rica em antioxidantes, a ameixa traz notas doces e profundas que evocam sofisticação e mistério.",
    color: "from-purple-900 to-purple-700",
    image: "/fresh-purple-plums-botanical-illustration.jpg",
  },
  {
    fruit: "Jabuticaba",
    description: "Fruta brasileira única, oferece um aroma exótico e envolvente com toques terrosos e frutados.",
    color: "from-purple-950 to-purple-800",
    image: "/jabuticaba-fruit-botanical-illustration-purple.jpg",
  },
  {
    fruit: "Uva",
    description: "Clássica e elegante, a uva proporciona frescor e leveza com nuances florais delicadas.",
    color: "from-purple-700 to-purple-500",
    image: "/purple-grapes-botanical-illustration-elegant.jpg",
  },
  {
    fruit: "Açaí",
    description: "Superfruta amazônica que adiciona profundidade e energia às composições aromáticas.",
    color: "from-purple-800 to-purple-600",
    image: "/acai-berries-botanical-illustration-purple.jpg",
  },
]

export function Essences() {
  return (
    <section id="essencias" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-serif mb-4 text-primary">Nossas Essências</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada fragrância é cuidadosamente elaborada a partir das melhores frutas roxas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {essences.map((essence, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-2 hover:border-accent transition-all duration-300"
            >
              <div
                className={`relative aspect-square bg-gradient-to-br ${essence.color} p-6 flex items-center justify-center`}
              >
                <img
                  src={essence.image || "/placeholder.svg"}
                  alt={essence.fruit}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h4 className="absolute bottom-4 left-4 text-3xl font-serif text-white">{essence.fruit}</h4>
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">{essence.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
