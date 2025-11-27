"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { perfumes, type Perfume } from "@/lib/perfumes"

const normalizeText = (value: string) =>
  value
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ") ?? ""

const MAX_RESULTS = 8
const DEFAULT_SUGGESTIONS = perfumes.filter((perfume) => perfume.highlighted).slice(0, 5)

const QUERY_SYNONYMS: Record<string, string[]> = {
  doce: ["gourmand", "caramelo", "baunilha"],
  gourmand: ["doce", "baunilha"],
  amadeirado: ["madeira", "cedro", "vetiver"],
  madeira: ["amadeirado", "cedro", "sândalo"],
  floral: ["flores", "rosa", "lírio", "peonia"],
  frutado: ["frutas", "berries", "amora", "cereja", "uva"],
  noturno: ["noite", "intenso"],
  diurno: ["dia", "leve", "fresco"],
  luxuoso: ["opulento", "premium", "imperial"],
  cremoso: ["aveludado", "cashmere", "musk"],
}

type IndexedTag = {
  normalized: string
  original: string
}

type IndexedNote = {
  normalized: string
  original: string
  family: "top" | "heart" | "base"
}

type IndexedPerfume = {
  perfume: Perfume
  normalized: {
    name: string
    category: string
    description: string
  }
  tags: IndexedTag[]
  notes: IndexedNote[]
}

type SearchResult = {
  perfume: Perfume
  score: number
  matches: {
    tokens: number
    tags: string[]
    notes: string[]
    name: boolean
    category: boolean
    description: boolean
  }
}

const expandQueryTokens = (query: string) => {
  const baseTokens = normalizeText(query)
    .split(/\s+/)
    .filter(Boolean)

  if (baseTokens.length === 0) {
    return []
  }

  const expanded = baseTokens.flatMap((token) => [token, ...(QUERY_SYNONYMS[token] ?? [])])

  return Array.from(new Set(expanded))
}

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const indexedPerfumes = useMemo<IndexedPerfume[]>(
    () =>
      perfumes.map((perfume) => {
        const tags = perfume.tags.map((tag) => ({
          original: tag,
          normalized: normalizeText(tag),
        }))

        const topNotes = perfume.notes.top.map((note) => ({
          original: note,
          normalized: normalizeText(note),
          family: "top" as const,
        }))
        const heartNotes = perfume.notes.heart.map((note) => ({
          original: note,
          normalized: normalizeText(note),
          family: "heart" as const,
        }))
        const baseNotes = perfume.notes.base.map((note) => ({
          original: note,
          normalized: normalizeText(note),
          family: "base" as const,
        }))

        return {
          perfume,
          normalized: {
            name: normalizeText(perfume.name),
            category: normalizeText(perfume.category),
            description: normalizeText(perfume.description),
          },
          tags,
          notes: [...topNotes, ...heartNotes, ...baseNotes],
        }
      }),
    [],
  )

  const searchResults = useMemo<SearchResult[]>(() => {
    const query = normalizeText(searchQuery)
    const tokens = expandQueryTokens(searchQuery)

    if (!query) {
      return indexedPerfumes.slice(0, MAX_RESULTS).map(({ perfume }, index) => ({
        perfume,
        score: MAX_RESULTS - index,
        matches: {
          tokens: 0,
          tags: [],
          notes: [],
          name: false,
          category: false,
          description: false,
        },
      }))
    }

    return indexedPerfumes
      .map(({ perfume, normalized, tags, notes }) => {
        let score = perfume.highlighted ? 0.5 : 0
        let matchedName = false
        let matchedCategory = false
        let matchedDescription = false
        const matchedTags = new Set<string>()
        const matchedNotes = new Set<string>()
        let tokenMatches = 0

        tokens.forEach((token) => {
          let tokenMatched = false

          if (normalized.name.startsWith(token)) {
            score += 5
            matchedName = true
            tokenMatched = true
          } else if (normalized.name.includes(token)) {
            score += 4
            matchedName = true
            tokenMatched = true
          }

          if (normalized.category.includes(token)) {
            score += 1.5
            matchedCategory = true
            tokenMatched = true
          }

          if (normalized.description.includes(token)) {
            score += 1.25
            matchedDescription = true
            tokenMatched = true
          }

          tags.forEach(({ normalized: tagValue, original }) => {
            if (tagValue.includes(token)) {
              matchedTags.add(original)
              score += 1.75
              tokenMatched = true
            }
          })

          notes.forEach(({ normalized: noteValue, original }) => {
            if (noteValue.includes(token)) {
              matchedNotes.add(original)
              score += 1.5
              tokenMatched = true
            }
          })

          if (tokenMatched) {
            tokenMatches += 1
          }
        })

        if (tokens.length > 0 && tokenMatches === 0) {
          return null
        }

        const coverageBoost = tokens.length > 0 ? (tokenMatches / tokens.length) * 2 : 1
        score += coverageBoost + matchedTags.size * 0.25 + matchedNotes.size * 0.15

        return {
          perfume,
          score,
          matches: {
            tokens: tokenMatches,
            tags: Array.from(matchedTags),
            notes: Array.from(matchedNotes),
            name: matchedName,
            category: matchedCategory,
            description: matchedDescription,
          },
        }
      })
      .filter((result): result is SearchResult => Boolean(result))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RESULTS)
  }, [indexedPerfumes, searchQuery])

  const showEmptyState = searchQuery.trim().length > 0 && searchResults.length === 0

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Search className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[720px] border-0 bg-transparent shadow-none">
        <div
          className="relative overflow-hidden rounded-3xl border border-accent/30 px-6 py-8 md:px-10 md:py-10"
          style={{
            background:
              "linear-gradient(135deg, hsl(305 32% 7%) 0%, hsl(305 38% 5%) 25%, hsl(305 35% 6%) 50%, hsl(305 40% 4%) 75%, hsl(305 32% 7%) 100%)",
          }}
        >
          <div className="absolute inset-0 bg-pattern-mesh opacity-25" />
          <div className="absolute inset-0 bg-pattern-grid opacity-20" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "0.8s" }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/10 to-transparent" />
          </div>
          <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="search-hero-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="currentColor" className="text-primary" />
                <path d="M0 50 L100 50 M50 0 L50 100" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#search-hero-pattern)" />
          </svg>

          <div className="relative z-10 space-y-6">
            <DialogHeader className="text-center">
              <DialogTitle className="text-3xl font-serif text-primary">Buscar Perfumes</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/70" />
              <Input
                placeholder="Digite notas, ingredientes ou o nome da fragrância..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-white hover:bg-white/10"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="max-h-[420px] overflow-y-auto space-y-4 pr-1">
              {showEmptyState ? (
                <div className="text-center py-10 text-muted-foreground space-y-4">
                  <p>Nenhuma fragrância encontrada para “{searchQuery}”.</p>
                  <div>
                    <p className="text-sm font-medium text-foreground">Dicas de busca:</p>
                    <ul className="text-sm mt-2 space-y-1">
                      <li>• Experimente buscar por notas, como “baunilha” ou “couro”.</li>
                      <li>• Utilize categorias como “Eau de Parfum” ou “Body Splash”.</li>
                      <li>• Tente termos mais curtos ou sem acentuação.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Sugestões em destaque</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {DEFAULT_SUGGESTIONS.map((perfume) => (
                        <button
                          key={perfume.id}
                          className="text-sm px-3 py-2 border rounded-lg hover:bg-accent/10 transition-colors"
                          onClick={() => setSearchQuery(perfume.name)}
                        >
                          {perfume.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {searchResults.map(({ perfume, matches }) => {
                    const tagBadges =
                      matches.tags.length > 0 ? matches.tags : [perfume.tags[0], perfume.tags[1]].filter(Boolean)

                    const noteHighlights = matches.notes.slice(0, 3)

                    return (
                      <Link
                        key={perfume.id}
                        href={`/fragrancia/${perfume.slug}`}
                        className="flex gap-4 rounded-xl border border-border/60 bg-white/5 p-4 backdrop-blur-sm transition-all hover:border-accent hover:bg-white/10"
                        onClick={() => setOpen(false)}
                      >
                        <div className="h-20 w-20 rounded-lg overflow-hidden border border-border bg-muted/30">
                          <img src={perfume.image || "/placeholder.svg"} alt={perfume.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-medium text-lg text-white">{perfume.name}</h3>
                                <Badge variant="outline">{perfume.category}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">{perfume.description}</p>
                            </div>
                            <span className="text-sm font-semibold text-accent whitespace-nowrap">{perfume.priceFormatted}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {tagBadges.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Notas: {perfume.notes.top[0]} • {perfume.notes.heart[0]} • {perfume.notes.base[0]}
                          </p>
                          {noteHighlights.length > 0 && (
                            <p className="text-xs text-accent">
                              Em destaque: {noteHighlights.join(" • ")}
                            </p>
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}

              {!searchQuery && (
                <div>
                  <p className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wide">Essências em destaque</p>
                  <div className="flex flex-wrap gap-2">
                    {DEFAULT_SUGGESTIONS.map((perfume) => (
                      <button
                        key={perfume.id}
                        className="px-3 py-1 text-sm border rounded-full hover:bg-accent/10 transition-colors"
                        onClick={() => setSearchQuery(perfume.name)}
                      >
                        {perfume.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
