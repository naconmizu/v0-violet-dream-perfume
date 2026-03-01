"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Accessibility, Type, ZoomIn, ZoomOut, Contrast, RotateCcw, X } from "lucide-react"

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClose = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (!isOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        handleClose()
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose()
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, handleClose])

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`
  }, [fontSize])

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }, [highContrast])

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }
  }, [reducedMotion])

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 10, 150))
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 10, 80))

  const resetAll = () => {
    setFontSize(100)
    setHighContrast(false)
    setReducedMotion(false)
  }

  return (
    <>
      {/* Botao flutuante */}
      <div className="fixed bottom-6 left-6 z-[100]">
        <Button
          ref={buttonRef}
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-12 h-12 rounded-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1a0618] shadow-lg shadow-[#D4AF37]/30 transition-all duration-300 hover:scale-110"
          aria-label={isOpen ? "Fechar painel de acessibilidade" : "Abrir painel de acessibilidade"}
          aria-expanded={isOpen}
          aria-controls="accessibility-panel"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Accessibility className="w-5 h-5" />}
        </Button>
      </div>

      {/* Painel de acessibilidade */}
      {isOpen && (
        <div
          ref={panelRef}
          id="accessibility-panel"
          role="dialog"
          aria-label="Opcoes de acessibilidade"
          className="fixed bottom-20 left-6 z-[100] w-72 bg-[#1a0618]/95 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl shadow-2xl shadow-black/40 p-5"
        >
          <h3 className="text-lg font-serif text-[#D4AF37] mb-4 flex items-center gap-2">
            <Accessibility className="w-5 h-5" />
            Acessibilidade
          </h3>

          <div className="space-y-4">
            {/* Tamanho da fonte */}
            <div>
              <p className="text-xs text-white/60 uppercase tracking-wider mb-2">Tamanho do Texto</p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={decreaseFontSize}
                  disabled={fontSize <= 80}
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                  aria-label="Diminuir tamanho do texto"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm text-white flex-1 text-center font-mono">{fontSize}%</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={increaseFontSize}
                  disabled={fontSize >= 150}
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                  aria-label="Aumentar tamanho do texto"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Alto contraste */}
            <div>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  highContrast
                    ? "bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]"
                    : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/10"
                }`}
                role="switch"
                aria-checked={highContrast}
                aria-label="Ativar alto contraste"
              >
                <Contrast className="w-4 h-4 shrink-0" />
                <span>Alto Contraste</span>
                <span className={`ml-auto text-xs ${highContrast ? "text-[#D4AF37]" : "text-white/40"}`}>
                  {highContrast ? "Ativo" : "Inativo"}
                </span>
              </button>
            </div>

            {/* Reduzir animacoes */}
            <div>
              <button
                onClick={() => setReducedMotion(!reducedMotion)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  reducedMotion
                    ? "bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]"
                    : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/10"
                }`}
                role="switch"
                aria-checked={reducedMotion}
                aria-label="Reduzir animacoes"
              >
                <Type className="w-4 h-4 shrink-0" />
                <span>Reduzir Animacoes</span>
                <span className={`ml-auto text-xs ${reducedMotion ? "text-[#D4AF37]" : "text-white/40"}`}>
                  {reducedMotion ? "Ativo" : "Inativo"}
                </span>
              </button>
            </div>

            {/* Resetar */}
            <Button
              variant="outline"
              size="sm"
              onClick={resetAll}
              className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white mt-2"
              aria-label="Restaurar configuracoes padrao"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-2" />
              Restaurar Padrao
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
