"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BackButton() {
  const router = useRouter()

  return (
    <div className="fixed left-4 top-4 z-50">
      <Button size="sm" variant="ghost" className="rounded-full p-2" onClick={() => router.back()} aria-label="Voltar">
        <ArrowLeft className="w-5 h-5" />
      </Button>
    </div>
  )
}
