"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { perfumes } from "@/lib/perfumes"
import { Droplets } from "lucide-react"
import InteractiveControls from "./fragrance-controls"

const bodySplashes = perfumes.filter((p) => {
  return (p.type && p.type === "body-splash") || (!p.type && p.category === "Body Splash")
})

const purpleSplashes = bodySplashes.filter((p) => p.collections?.includes("Purple Soul"))
const redSplashes = bodySplashes.filter((p) => p.collections?.includes("Red Bloom"))
const goldSplashes = bodySplashes.filter((p) => p.collections?.includes("Golden Aura"))

const collectionConfig = {
  "Purple Soul": {
    gradient: "from-[#4a1a5c] via-[#2d0f3d] to-[#1a0825]",
    accent: "border-primary/30 hover:border-primary/50 hover:shadow-primary/15",
    badge: "bg-primary/25 text-purple-200 border-primary/40",
    label: "Purple Soul",
  },
  "Red Bloom": {
    gradient: "from-[#5c0f18] via-[#36060b] to-[#150203]",
    accent: "border-red-500/30 hover:border-red-500/50 hover:shadow-red-500/15",
    badge: "bg-red-500/25 text-red-200 border-red-500/40",
    label: "Red Bloom",
  },
  "Golden Aura": {
    gradient: "from-[#5c4a0f] via-[#3d3008] to-[#1a1504]",
    accent: "border-yellow-500/30 hover:border-yellow-500/50 hover:shadow-yellow-500/15",
    badge: "bg-yellow-500/25 text-yellow-200 border-yellow-500/40",
    label: "Golden Aura",
  },
} as const

function SplashCard({ splash }: { splash: (typeof bodySplashes)[0] }) {
  const collection = splash.collections?.[0] ?? "Purple Soul"
  const config = collectionConfig[collection] ?? collectionConfig["Purple Soul"]

  return (
    <Link href={`/fragrancia/${splash.slug}`}>
      <Card
        className={`group overflow-hidden bg-white/5 backdrop-blur-sm border transition-all duration-500 hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${config.accent}`}
      >
        <div
          className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${config.gradient}`}
        >
          <img
            src={splash.image || "/placeholder.svg"}
            alt={splash.name}
            className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 mix-blend-lighten opacity-25 bg-[radial-gradient(circle,_rgba(255,255,255,0.5)_0%,_transparent_60%)]" />
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className={`text-[10px] uppercase tracking-widest ${config.badge}`}>
              <Droplets className="w-3 h-3 mr-1.5" />
              Body Splash
            </Badge>
          </div>
          <div className="absolute bottom-5 left-5 right-5">
            <p className="text-[10px] text-white/60 uppercase tracking-[0.35em] mb-1">
              {config.label}
            </p>
            <p className="text-base font-serif text-white/95">
              {splash.notes?.top?.slice(0, 2).join(" · ") || splash.tags?.[0]}
            </p>
          </div>
        </div>
        <CardContent className="p-6 bg-gradient-to-b from-white/10 to-transparent">
          <h4 className="text-xl font-serif text-white mb-2 group-hover:text-cyan-200 transition-colors duration-300">
            {splash.name}
          </h4>
          <p className="text-sm text-white/70 mb-4 line-clamp-2 leading-relaxed">
            {splash.description}
          </p>
          {splash.tags && splash.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {splash.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[10px] uppercase tracking-wide text-white/80 border border-white/20 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-xl font-semibold text-white">{splash.priceFormatted}</span>
            <div className="flex items-center gap-2">
              <InteractiveControls perfumeName={splash.name} />
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
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function CollectionBlock({
  title,
  subtitle,
  splashes,
  gradientLine,
}: {
  title: string
  subtitle: string
  splashes: typeof bodySplashes
  gradientLine: string
}) {
  if (splashes.length === 0) return null

  return (
    <div className="mb-20 last:mb-0">
      <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 flex items-center gap-3">
        <span className={`w-12 h-0.5 bg-gradient-to-r ${gradientLine} rounded-full`} />
        {title}
      </h3>
      <p className="text-sm text-white/55 mb-10 ml-11">{subtitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {splashes.map((splash) => (
          <SplashCard key={splash.id} splash={splash} />
        ))}
      </div>
    </div>
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
      <div className="absolute inset-0 bg-pattern-mesh opacity-40" />
      <div className="absolute inset-0 bg-pattern-grid opacity-25" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-500/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent" />
      </div>

      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="body-splash-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="50" cy="50" r="2" fill="currentColor" className="text-cyan-400" />
            <path
              d="M0 50 L100 50 M50 0 L50 100"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-cyan-400"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#body-splash-pattern)" />
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-400/25 bg-cyan-400/10 mb-6">
            <Droplets className="w-4 h-4 text-cyan-300" />
            <span className="text-sm text-cyan-300 font-medium uppercase tracking-widest">
              Body Splash
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-cyan-200">
            Frescor para o Dia a Dia
          </h2>
          <p className="text-lg text-white/75 text-pretty leading-relaxed">
            As mesmas essências premiadas em versões refrescantes e leves. Perfeitos para hidratar a
            pele e perfumar com suavidade ao longo do dia.
          </p>
        </div>

        <CollectionBlock
          title="Purple Soul"
          subtitle="Frescor frutado com essências roxas"
          splashes={purpleSplashes}
          gradientLine="from-primary to-transparent"
        />

        <CollectionBlock
          title="Red Bloom"
          subtitle="Vibrancia vermelha em formato refrescante"
          splashes={redSplashes}
          gradientLine="from-red-500 to-transparent"
        />

        <CollectionBlock
          title="Golden Aura"
          subtitle="Luminosidade dourada para cada momento"
          splashes={goldSplashes}
          gradientLine="from-yellow-500 to-transparent"
        />
      </div>
    </section>
  )
}
