"use client"

import React, { useState } from "react"
import { Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  perfumeName: string
}

export default function InteractiveControls({ perfumeName }: Props) {
  const [liked, setLiked] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [shareMessage, setShareMessage] = useState<string | null>(null)

  const handleLike = () => {
    // toggle like and trigger animation
    const next = !liked
    setLiked(next)
    if (next) {
      setAnimating(true)
      window.setTimeout(() => setAnimating(false), 900)
    }
  }

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    try {
      if (navigator.share) {
        await navigator.share({ title: perfumeName, text: `Confira ${perfumeName}`, url })
        setShareMessage('Compartilhado!')
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)
        setShareMessage('Link copiado para a área de transferência')
      } else {
        setShareMessage('Não foi possível compartilhar neste navegador')
      }
    } catch (err) {
      console.error(err)
      setShareMessage('Falha ao compartilhar')
    }
    // hide message after a short delay
    window.setTimeout(() => setShareMessage(null), 2500)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center gap-2">
        <button
          aria-pressed={liked}
          onClick={handleLike}
          className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/10"
        >
          <Heart className={`w-5 h-5 text-pink-400 transition-transform ${liked ? 'scale-110' : ''}`} />

          {/* Animated pop when liked */}
          {animating && (
            <span className="ig-like-pop absolute inset-0 flex items-center justify-center pointer-events-none">
              <Heart className="w-8 h-8 text-pink-500 drop-shadow-lg" />
              <div className="ig-particles absolute inset-0 pointer-events-none">
                <span className="particle" />
                <span className="particle" />
                <span className="particle" />
              </div>
            </span>
          )}
        </button>

        <button onClick={handleShare} className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/10" aria-label="Compartilhar">
          <Share2 className="w-5 h-5" />
        </button>

        {shareMessage && <div className="ml-2 text-sm text-white/90 bg-black/60 px-3 py-1 rounded-md">{shareMessage}</div>}
      </div>
    </div>
  )
}
