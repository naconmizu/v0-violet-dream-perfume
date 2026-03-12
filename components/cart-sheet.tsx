"use client"

import { ShoppingBag, X, Plus, Minus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export function CartSheet() {
  const { items, removeFromCart, updateQuantity, totalFormatted, itemCount } = useCart()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .cart-sheet-content {
          font-family: 'Jost', sans-serif;
          background: linear-gradient(160deg, #0e0c10 0%, #14101a 50%, #0a0a0f 100%) !important;
          border-left: 1px solid rgba(212, 175, 100, 0.15) !important;
          box-shadow: -20px 0 80px rgba(0,0,0,0.7) !important;
        }

        .cart-sheet-content::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse 60% 40% at 80% 10%, rgba(212,175,100,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 20% 80%, rgba(150,100,200,0.04) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .cart-sheet-content > * { position: relative; z-index: 1; }

        .cart-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.4rem;
          letter-spacing: 0.12em;
          color: #e8d9b8;
        }

        .cart-subtitle {
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(212,175,100,0.5);
        }

        .cart-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,100,0.3), transparent);
          border: none;
          margin: 0;
        }

        .cart-item {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(212,175,100,0.1);
          border-radius: 12px;
          padding: 14px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
          transition: border-color 0.2s, background 0.2s;
          position: relative;
          overflow: hidden;
        }

        .cart-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212,175,100,0.03) 0%, transparent 50%);
          pointer-events: none;
        }

        .cart-item:hover {
          border-color: rgba(212,175,100,0.25);
          background: rgba(255,255,255,0.04);
        }

        .cart-item-image {
          width: 72px;
          height: 72px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
          position: relative;
          border: 1px solid rgba(212,175,100,0.15);
          background: rgba(255,255,255,0.03);
        }

        .cart-item-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 400;
          color: #e8d9b8;
          letter-spacing: 0.03em;
          line-height: 1.3;
          margin-bottom: 4px;
        }

        .cart-item-price {
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: rgba(212,175,100,0.7);
          margin-bottom: 10px;
        }

        .qty-control {
          display: flex;
          align-items: center;
          gap: 0;
          border: 1px solid rgba(212,175,100,0.2);
          border-radius: 20px;
          overflow: hidden;
          width: fit-content;
          background: rgba(0,0,0,0.3);
        }

        .qty-btn {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: rgba(212,175,100,0.6);
          cursor: pointer;
          transition: color 0.15s, background 0.15s;
        }

        .qty-btn:hover {
          color: #d4af64;
          background: rgba(212,175,100,0.08);
        }

        .qty-value {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: #e8d9b8;
          width: 28px;
          text-align: center;
          padding: 0 2px;
        }

        .remove-btn {
          background: transparent;
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.2);
          cursor: pointer;
          transition: color 0.15s, background 0.15s;
          flex-shrink: 0;
          margin-left: auto;
          align-self: flex-start;
        }

        .remove-btn:hover {
          color: #e05c6a;
          background: rgba(224,92,106,0.1);
        }

        .cart-total-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding: 16px 0 4px;
        }

        .cart-total-label {
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        .cart-total-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 300;
          color: #d4af64;
          letter-spacing: 0.04em;
        }

        .btn-checkout {
          width: 100%;
          height: 48px;
          background: linear-gradient(135deg, #c9a227 0%, #e8c84a 40%, #c9a227 100%);
          color: #0a0a0f;
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
        }

        .btn-checkout:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .btn-secondary {
          width: 100%;
          height: 42px;
          background: transparent;
          color: rgba(212,175,100,0.6);
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: 1px solid rgba(212,175,100,0.15);
          border-radius: 4px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        .btn-secondary:hover {
          border-color: rgba(212,175,100,0.35);
          color: rgba(212,175,100,0.9);
        }

        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 48px 24px;
          text-align: center;
        }

        .empty-icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 1px solid rgba(212,175,100,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(212,175,100,0.04);
          margin-bottom: 8px;
        }

        .empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 300;
          color: #e8d9b8;
          letter-spacing: 0.05em;
        }

        .empty-text {
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.3);
          max-width: 220px;
          line-height: 1.7;
        }

        .cart-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9a227, #e8c84a);
          color: #0a0a0f;
          font-size: 0.6rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #0a0a0f;
          font-family: 'Jost', sans-serif;
        }

        .scroll-area::-webkit-scrollbar { width: 3px; }
        .scroll-area::-webkit-scrollbar-track { background: transparent; }
        .scroll-area::-webkit-scrollbar-thumb { background: rgba(212,175,100,0.2); border-radius: 3px; }
      `}</style>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative text-white hover:text-accent hover:bg-white/10">
            <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
            {itemCount > 0 && (
              <span className="cart-badge">{itemCount}</span>
            )}
            <span className="sr-only">Carrinho</span>
          </Button>
        </SheetTrigger>

        <SheetContent className="cart-sheet-content w-full sm:max-w-md flex flex-col gap-0 p-0">

          {/* Header */}
          <div className="px-6 pt-8 pb-5">
            <SheetHeader className="space-y-1 text-left">
              <p className="cart-subtitle">Sua seleção</p>
              <SheetTitle className="cart-title p-0 m-0">
                Carrinho
              </SheetTitle>
            </SheetHeader>
          </div>

          <hr className="cart-divider mx-6" />

          {items.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon-wrap">
                <ShoppingBag style={{ width: 28, height: 28, color: "rgba(212,175,100,0.4)" }} />
              </div>
              <p className="empty-title">Carrinho vazio</p>
              <p className="empty-text">Adicione fragrâncias para começar sua jornada sensorial</p>
              <Link href="/#produtos" className="btn-checkout" style={{ width: "auto", padding: "0 28px", marginTop: 8 }}>
                <Sparkles style={{ width: 13, height: 13 }} />
                Explorar Fragrâncias
              </Link>
            </div>
          ) : (
            <>
              {/* Items */}
              <div
                className="scroll-area flex-1 overflow-y-auto px-6 py-5"
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {items.map((item) => (
                  <div key={item.product.id} className="cart-item">
                    <div className="cart-item-image">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="cart-item-name">{item.product.name}</p>
                      <p className="cart-item-price">{item.product.priceFormatted}</p>
                      <div className="qty-control">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          aria-label="Diminuir"
                        >
                          <Minus style={{ width: 10, height: 10 }} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          aria-label="Aumentar"
                        >
                          <Plus style={{ width: 10, height: 10 }} />
                        </button>
                      </div>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label="Remover item"
                    >
                      <X style={{ width: 13, height: 13 }} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 pb-8 pt-2">
                <hr className="cart-divider" />

                <div className="cart-total-row">
                  <span className="cart-total-label">Total</span>
                  <span className="cart-total-value">{totalFormatted}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
                  <Link href="/checkout" className="btn-checkout">
                    <Sparkles style={{ width: 13, height: 13 }} />
                    Finalizar Compra
                  </Link>
                  <Link href="/carrinho" className="btn-secondary">
                    Ver Carrinho Completo
                  </Link>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}