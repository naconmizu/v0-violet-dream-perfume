"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { perfumes } from "@/lib/perfumes"
import { Droplets } from "lucide-react"

const bodySplashes = perfumes.filter((p) => p.type === "body-splash")

const purpleSplashes = bodySplashes.filter((p) => p.collections?.includes("Purple Soul"))
const redSplashes = bodySplashes.filter((p) => p.collections?.includes("Red Bloom"))
const goldSplashes = bodySplashes.filter((p) => p.collections?.includes("Golden Aura"))

function SplashCard({ splash }: { splash: (typeof bodySplashes)[0] }) {
  const collectionColor =
    splash.collections?.includes("Red Bloom")
      ? "border-red-500/20 hover:border-red-500/40 hover:shadow-red-500/10"
      : splash.collections?.includes("Golden Aura")
        ? "border-yellow-500/20 hover:border-yellow-500/40 hover:shadow-yellow-500/10"
        : "border-primary/20 hover:border-primary/40 hover:shadow-primary/10"

  const tagColor =
    splash.collections?.includes("Red Bloom")
      ? "bg-red-500/20 text-red-200 border-red-500/30"
      : splash.collections?.includes("Golden Aura")
        ? "bg-yellow-500/20 text-yellow-200 border-yellow-500/30"
        : "bg-primary/20 text-purple-200 border-primary/30"

  return (
    <Link href={`/fragrancia/${splash.slug}`}>
      <Card
        className={`group overflow-hidden bg-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl cursor-pointer ${collectionColor}`}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={splash.image || "/placeholder.svg"}
            alt={splash.name}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute top-3 left-3">
            <Badge variant="outline" className={`text-[10px] uppercase tracking-widest ${tagColor}`}>
              <Droplets className="w-3 h-3 mr-1" />
              Body Splash
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-xs text-white/50 uppercase tracking-wider">
              {splash.collections?.[0]}
            </p>
          </div>
        </div>
        <CardContent className="p-4 bg-gradient-to-b from-white/5 to-transparent">
          <h4 className="text-lg font-serif text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
            {splash.name}
          </h4>
          <p className="text-xs text-white/60 mb-3 line-clamp-2 leading-relaxed">{splash.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-white">{splash.priceFormatted}</span>
            <AddToCartButton
              product={{
                id: splash.id,
                slug: splash.slug,
                name: splash.name,
                description: splash.description,
                price: splash.price,
                priceFormatted: splash.priceFormatted,
                image: splash.image,
                category: `Body Splash - ${splash.collections?.[0] || ""}`,
              }}
              size="sm"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export function BodySplashCollection() {
  return (
    <section
      id="body-splash"
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(305 32% 7%) 0%, hsl(305 38% 5%) 25%, hsl(305 35% 6%) 50%, hsl(305 40% 4%) 75%, hsl(305 32% 7%) 100%)",
      }}
    >
      <div className="absolute inset-0 bg-pattern-mesh opacity-30" />
      <div className="absolute inset-0 bg-pattern-grid opacity-20" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/5 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 mb-6">
            <Droplets className="w-4 h-4 text-cyan-300" />
            <span className="text-sm text-cyan-300 font-medium uppercase tracking-widest">Body Splash</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-cyan-200">
            Frescor para o Dia a Dia
          </h2>
          <p className="text-lg text-white/70 text-pretty">
            As mesmas essencias premiadas em versoes refrescantes e leves.
            Perfeitos para hidratar a pele e perfumar com suavidade ao longo do dia.
          </p>
        </div>

        {/* Purple Soul Splashes */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif text-white mb-2 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
            Purple Soul
          </h3>
          <p className="text-sm text-white/50 mb-8 ml-11">Frescor frutado com essencias roxas</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {purpleSplashes.map((splash) => (
              <SplashCard key={splash.id} splash={splash} />
            ))}
          </div>
        </div>

        {/* Red Bloom Splashes */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif text-white mb-2 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-gradient-to-r from-red-500 to-transparent" />
            Red Bloom
          </h3>
          <p className="text-sm text-white/50 mb-8 ml-11">Vibrancia vermelha em formato refrescante</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {redSplashes.map((splash) => (
              <SplashCard key={splash.id} splash={splash} />
            ))}
          </div>
        </div>

        {/* Golden Aura Splashes */}
        <div>
          <h3 className="text-2xl font-serif text-white mb-2 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent" />
            Golden Aura
          </h3>
          <p className="text-sm text-white/50 mb-8 ml-11">Luminosidade dourada para cada momento</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {goldSplashes.map((splash) => (
              <SplashCard key={splash.id} splash={splash} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
