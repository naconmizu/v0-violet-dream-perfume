"use client"
import React, { useState } from "react"
import { Heart, Share2 } from "lucide-react"

type Props = {
  perfumeName: string
}

export default function InteractiveControls({ perfumeName }: Props) {
  const [liked, setLiked] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [shareMessage, setShareMessage] = useState<string | null>(null)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const next = !liked
    setLiked(next)
    if (next) {
      setAnimating(true)
      window.setTimeout(() => setAnimating(false), 900)
    }
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const url = typeof window !== "undefined" ? window.location.href : ""
    try {
      if (navigator.share) {
        await navigator.share({ title: perfumeName, text: `Confira ${perfumeName}`, url })
        setShareMessage("Compartilhado!")
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)
        setShareMessage("Link copiado para a área de transferência")
      } else {
        setShareMessage("Não foi possível compartilhar neste navegador")
      }
    } catch (err) {
      console.error(err)
      setShareMessage("Falha ao compartilhar")
    }
    window.setTimeout(() => setShareMessage(null), 2500)
  }

  // 8 particles fanning out at different angles
  const particles = [
    { angle: 0,    color: "#f472b6", size: 5 },
    { angle: 45,   color: "#fb7185", size: 4 },
    { angle: 90,   color: "#f9a8d4", size: 6 },
    { angle: 135,  color: "#fb7185", size: 4 },
    { angle: 180,  color: "#f472b6", size: 5 },
    { angle: 225,  color: "#f9a8d4", size: 3 },
    { angle: 270,  color: "#fb7185", size: 5 },
    { angle: 315,  color: "#f472b6", size: 4 },
  ]

  return (
    <>
      <style>{`
        /* ── heart pop ── */
        @keyframes heartPop {
          0%   { transform: scale(0.4); opacity: 1; }
          40%  { transform: scale(1.5); opacity: 1; }
          65%  { transform: scale(0.9); opacity: 1; }
          80%  { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(1.0); opacity: 0; }
        }
        .heart-pop {
          animation: heartPop 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* ── shimmer ring ── */
        @keyframes ringExpand {
          0%   { transform: scale(0.3); opacity: 0.9; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .heart-ring {
          animation: ringExpand 0.65s ease-out forwards;
        }

        /* ── particles ── */
        @keyframes particleFly {
          0%   { transform: translate(0, 0) scale(1);   opacity: 1; }
          100% { transform: var(--tx) var(--ty) scale(0); opacity: 0; }
        }
        .heart-particle {
          animation: particleFly 0.7s ease-out forwards;
          animation-delay: var(--delay, 0ms);
        }

        /* ── tiny heart sparks ── */
        @keyframes sparkFloat {
          0%   { transform: translate(0,0) scale(1) rotate(0deg);   opacity: 1; }
          100% { transform: var(--sx) var(--sy) scale(0) rotate(45deg); opacity: 0; }
        }
        .heart-spark {
          animation: sparkFloat 0.8s ease-out forwards;
          animation-delay: var(--spark-delay, 0ms);
        }
      `}</style>

      <div
        className="flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center gap-2">

          {/* ── Like button ── */}
          <button
            aria-pressed={liked}
            onClick={handleLike}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/10"
          >
            <Heart
              className="w-5 h-5 transition-all duration-200"
              style={{
                color: liked ? "#f472b6" : "#f9a8d4",
                fill: liked ? "#f472b6" : "none",
                transform: liked && !animating ? "scale(1.15)" : "scale(1)",
              }}
            />

            {/* Animation layer – only mounted during the burst */}
            {animating && (
              <span className="absolute inset-0 pointer-events-none" aria-hidden>

                {/* 1. Big heart pop */}
                <Heart
                  className="heart-pop absolute inset-0 m-auto w-9 h-9"
                  style={{ color: "#f472b6", fill: "#f472b6", filter: "drop-shadow(0 0 6px #f472b6cc)" }}
                />

                {/* 2. Expanding ring */}
                <span
                  className="heart-ring absolute inset-0 m-auto rounded-full border-2 border-pink-400"
                  style={{ width: 32, height: 32 }}
                />

                {/* 3. Dot particles */}
                {particles.map((p, i) => {
                  const rad = (p.angle * Math.PI) / 180
                  const dist = 22 + Math.random() * 10
                  const tx = `translateX(${(Math.cos(rad) * dist).toFixed(1)}px)`
                  const ty = `translateY(${(Math.sin(rad) * dist).toFixed(1)}px)`
                  return (
                    <span
                      key={i}
                      className="heart-particle absolute rounded-full"
                      style={{
                        width: p.size,
                        height: p.size,
                        background: p.color,
                        top: "50%",
                        left: "50%",
                        marginTop: -p.size / 2,
                        marginLeft: -p.size / 2,
                        "--tx": tx,
                        "--ty": ty,
                        "--delay": `${i * 18}ms`,
                        boxShadow: `0 0 4px ${p.color}`,
                      } as React.CSSProperties}
                    />
                  )
                })}

                {/* 4. Tiny floating mini-hearts */}
                {[
                  { sx: "translateX(-14px)", sy: "translateY(-18px)", delay: "50ms",  size: 8 },
                  { sx: "translateX(16px)",  sy: "translateY(-14px)", delay: "80ms",  size: 6 },
                  { sx: "translateX(18px)",  sy: "translateY(12px)",  delay: "30ms",  size: 7 },
                  { sx: "translateX(-12px)", sy: "translateY(16px)",  delay: "100ms", size: 5 },
                ].map((s, i) => (
                  <Heart
                    key={i}
                    className="heart-spark absolute"
                    style={{
                      width: s.size,
                      height: s.size,
                      color: "#fb7185",
                      fill: "#fb7185",
                      top: "50%",
                      left: "50%",
                      marginTop: -s.size / 2,
                      marginLeft: -s.size / 2,
                      "--sx": s.sx,
                      "--sy": s.sy,
                      "--spark-delay": s.delay,
                    } as React.CSSProperties}
                  />
                ))}
              </span>
            )}
          </button>

          {/* ── Share button ── */}
          <button
            onClick={handleShare}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/10"
            aria-label="Compartilhar"
          >
            <Share2 className="w-5 h-5" />
          </button>

          {shareMessage && (
            <div className="ml-2 text-sm text-white/90 bg-black/60 px-3 py-1 rounded-md">
              {shareMessage}
            </div>
          )}
        </div>
      </div>
    </>
  )
}