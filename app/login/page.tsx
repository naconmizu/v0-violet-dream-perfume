"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Eye, EyeOff, Sparkles } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    const success = await login(email, password)
    if (success) {
      router.push("/perfil")
    } else {
      setError("Email ou senha incorretos")
    }
    setIsLoading(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .login-page {
          font-family: 'Jost', sans-serif;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          background:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212,175,100,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 90%, rgba(140,90,180,0.05) 0%, transparent 50%),
            linear-gradient(170deg, #0b0a0e 0%, #110e18 50%, #0a0a0c 100%);
        }

        .login-center {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 20px;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(212,175,100,0.12);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          backdrop-filter: blur(12px);
        }

        .login-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,100,0.4), transparent);
        }

        .login-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,175,100,0.04) 0%, transparent 60%);
          pointer-events: none;
        }

        .login-header {
          padding: 44px 40px 32px;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .login-eyebrow {
          font-size: 0.62rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(212,175,100,0.5);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .login-eyebrow::before,
        .login-eyebrow::after {
          content: '';
          height: 1px;
          width: 28px;
          background: linear-gradient(90deg, transparent, rgba(212,175,100,0.35));
        }
        .login-eyebrow::after {
          background: linear-gradient(90deg, rgba(212,175,100,0.35), transparent);
        }

        .login-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 300;
          font-style: italic;
          color: #e8d9b8;
          letter-spacing: 0.04em;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .login-desc {
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.3);
        }

        .login-body {
          padding: 0 40px 40px;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .field-wrap {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field-label {
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(212,175,100,0.55);
          transition: color 0.2s;
        }

        .field-label.active {
          color: rgba(212,175,100,0.9);
        }

        .field-input-wrap {
          position: relative;
        }

        .field-input {
          width: 100%;
          height: 48px;
          background: rgba(0,0,0,0.35);
          border: 1px solid rgba(212,175,100,0.12);
          border-radius: 6px;
          padding: 0 44px 0 16px;
          font-family: 'Jost', sans-serif;
          font-size: 0.875rem;
          font-weight: 300;
          color: #e8d9b8;
          letter-spacing: 0.04em;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
          box-sizing: border-box;
        }

        .field-input::placeholder {
          color: rgba(255,255,255,0.15);
          letter-spacing: 0.08em;
        }

        .field-input:focus {
          border-color: rgba(212,175,100,0.4);
          background: rgba(212,175,100,0.03);
          box-shadow: 0 0 0 3px rgba(212,175,100,0.06), inset 0 1px 0 rgba(212,175,100,0.05);
        }

        .field-input.has-error {
          border-color: rgba(224,92,106,0.4);
          box-shadow: 0 0 0 3px rgba(224,92,106,0.06);
        }

        .field-input[type="password"] {
          letter-spacing: 0.15em;
        }

        .toggle-pw {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          color: rgba(212,175,100,0.3);
          transition: color 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toggle-pw:hover { color: rgba(212,175,100,0.7); }

        .error-msg {
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: #e05c6a;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .error-msg::before {
          content: '';
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #e05c6a;
          flex-shrink: 0;
        }

        .btn-login {
          width: 100%;
          height: 50px;
          background: linear-gradient(135deg, #b8911f 0%, #d4af64 45%, #b8911f 100%);
          background-size: 200% 100%;
          background-position: right;
          color: #0a0a0c;
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-position 0.4s ease, transform 0.15s, opacity 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 4px;
          position: relative;
          overflow: hidden;
        }

        .btn-login::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .btn-login:hover:not(:disabled) {
          background-position: left;
          transform: translateY(-1px);
        }

        .btn-login:hover:not(:disabled)::before { opacity: 1; }

        .btn-login:active:not(:disabled) { transform: translateY(0); }

        .btn-login:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .spinner {
          width: 14px;
          height: 14px;
          border: 1.5px solid rgba(0,0,0,0.25);
          border-top-color: #0a0a0c;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .login-footer {
          text-align: center;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.25);
        }

        .login-footer a {
          color: rgba(212,175,100,0.65);
          text-decoration: none;
          transition: color 0.15s;
          border-bottom: 1px solid rgba(212,175,100,0.2);
          padding-bottom: 1px;
        }

        .login-footer a:hover {
          color: #d4af64;
          border-bottom-color: rgba(212,175,100,0.5);
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,100,0.12), transparent);
          margin: 4px 0;
        }
      `}</style>

      <div className="login-page">
        <Header />

        <div className="login-center">
          <div className="login-card">

            <div className="login-header">
              <div className="login-eyebrow">Acesso exclusivo</div>
              <h1 className="login-title">Bem-vindo de volta</h1>
              <p className="login-desc">Entre para continuar sua jornada</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="login-body">

                <div className="field-wrap">
                  <label
                    htmlFor="email"
                    className={`field-label ${focused === "email" ? "active" : ""}`}
                  >
                    Email
                  </label>
                  <div className="field-input-wrap">
                    <input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className={`field-input ${error ? "has-error" : ""}`}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="field-wrap">
                  <label
                    htmlFor="password"
                    className={`field-label ${focused === "password" ? "active" : ""}`}
                  >
                    Senha
                  </label>
                  <div className="field-input-wrap">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocused("password")}
                      onBlur={() => setFocused(null)}
                      className={`field-input ${error ? "has-error" : ""}`}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="toggle-pw"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showPassword
                        ? <EyeOff style={{ width: 15, height: 15 }} />
                        : <Eye style={{ width: 15, height: 15 }} />
                      }
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="error-msg">{error}</p>
                )}

                <div className="divider" />

                <button type="submit" className="btn-login" disabled={isLoading}>
                  {isLoading ? (
                    <><span className="spinner" /> Entrando…</>
                  ) : (
                    <><Sparkles style={{ width: 13, height: 13 }} /> Entrar</>
                  )}
                </button>

                <p className="login-footer">
                  Não tem uma conta?{" "}
                  <Link href="/registro">Registre-se</Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}