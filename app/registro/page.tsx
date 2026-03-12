"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Eye, EyeOff, Sparkles, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import EmailValidation from "../util/EmailValidation"

export default function RegisterPage() {
  const [nome, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const { register } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) { setError("As senhas não coincidem"); return }
    if (password.length < 6) { setError("A senha deve ter pelo menos 6 caracteres"); return }

    setIsLoading(true)
    if (!EmailValidation.validateEmail(email)) {
      setError("Por favor, insira um email válido")
      setIsLoading(false)
      return
    }

    const success = await register(nome, email, password)
    if (success) {
      toast({ title: "Conta criada", description: "Bem-vindo(a)! Você foi redirecionado(a) para o seu perfil." })
      router.push("/perfil")
    } else {
      setError("Este email já está cadastrado")
    }
    setIsLoading(false)
  }

  const passwordStrength = useMemo(() => {
    if (!password) return 0
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return Math.min(score, 4)
  }, [password])

  const strengthLabel = ["", "Fraca", "Razoável", "Boa", "Forte"][passwordStrength]
  const strengthColor = ["", "#e05c6a", "#d4a843", "#8fc97a", "#5bbf8a"][passwordStrength]

  const isFormValid =
    nome.trim() !== "" &&
    /\S+@\S+\.\S+/.test(email) &&
    password.length >= 6 &&
    password === confirmPassword

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .reg-page {
          font-family: 'Jost', sans-serif;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          background:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212,175,100,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(140,90,180,0.05) 0%, transparent 50%),
            linear-gradient(170deg, #0b0a0e 0%, #110e18 50%, #0a0a0c 100%);
        }

        .reg-center {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 20px;
        }

        .reg-card {
          width: 100%;
          max-width: 440px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(212,175,100,0.12);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          backdrop-filter: blur(12px);
        }

        .reg-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,100,0.4), transparent);
        }

        .reg-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 40% at 50% 0%, rgba(212,175,100,0.04) 0%, transparent 60%);
          pointer-events: none;
        }

        .reg-header {
          padding: 40px 40px 28px;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .reg-eyebrow {
          font-size: 0.62rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(212,175,100,0.5);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .reg-eyebrow::before, .reg-eyebrow::after {
          content: '';
          height: 1px;
          width: 28px;
          background: linear-gradient(90deg, transparent, rgba(212,175,100,0.35));
        }
        .reg-eyebrow::after {
          background: linear-gradient(90deg, rgba(212,175,100,0.35), transparent);
        }

        .reg-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.9rem;
          font-weight: 300;
          font-style: italic;
          color: #e8d9b8;
          letter-spacing: 0.04em;
          line-height: 1.2;
          margin-bottom: 6px;
        }

        .reg-desc {
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.3);
        }

        .reg-body {
          padding: 0 40px 40px;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .field-wrap { display: flex; flex-direction: column; gap: 7px; }

        .field-label {
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(212,175,100,0.5);
          transition: color 0.2s;
        }
        .field-label.active { color: rgba(212,175,100,0.9); }

        .field-input-wrap { position: relative; }

        .field-input {
          width: 100%;
          height: 46px;
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
        .field-input::placeholder { color: rgba(255,255,255,0.15); }
        .field-input:focus {
          border-color: rgba(212,175,100,0.4);
          background: rgba(212,175,100,0.03);
          box-shadow: 0 0 0 3px rgba(212,175,100,0.06), inset 0 1px 0 rgba(212,175,100,0.05);
        }
        .field-input.has-error { border-color: rgba(224,92,106,0.45); box-shadow: 0 0 0 3px rgba(224,92,106,0.06); }
        .field-input.is-valid { border-color: rgba(91,191,138,0.35); }
        .field-input[type="password"] { letter-spacing: 0.15em; }

        .field-icon {
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
        }
        .field-icon:hover { color: rgba(212,175,100,0.7); }
        .field-icon.valid { color: #5bbf8a; cursor: default; }

        /* Password strength bar */
        .strength-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
        }
        .strength-bars {
          display: flex;
          gap: 3px;
          flex: 1;
        }
        .strength-bar {
          height: 2px;
          flex: 1;
          border-radius: 2px;
          background: rgba(255,255,255,0.07);
          transition: background 0.3s;
        }
        .strength-label {
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: color 0.3s;
          min-width: 40px;
          text-align: right;
        }

        .field-hint {
          font-size: 0.65rem;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.22);
        }
        .field-hint.error { color: #e05c6a; }
        .field-hint.success { color: #5bbf8a; }

        .error-msg {
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          color: #e05c6a;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .error-msg::before {
          content: '';
          display: inline-block;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #e05c6a;
          flex-shrink: 0;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,100,0.12), transparent);
          margin: 2px 0;
        }

        .btn-register {
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
          position: relative;
          overflow: hidden;
        }
        .btn-register::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .btn-register:hover:not(:disabled) { background-position: left; transform: translateY(-1px); }
        .btn-register:hover:not(:disabled)::before { opacity: 1; }
        .btn-register:disabled { opacity: 0.35; cursor: not-allowed; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 14px; height: 14px;
          border: 1.5px solid rgba(0,0,0,0.25);
          border-top-color: #0a0a0c;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .reg-footer {
          text-align: center;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.25);
        }
        .reg-footer a {
          color: rgba(212,175,100,0.65);
          text-decoration: none;
          border-bottom: 1px solid rgba(212,175,100,0.2);
          padding-bottom: 1px;
          transition: color 0.15s, border-color 0.15s;
        }
        .reg-footer a:hover { color: #d4af64; border-bottom-color: rgba(212,175,100,0.5); }
      `}</style>

      <div className="reg-page">
        <Header />

        <div className="reg-center">
          <div className="reg-card">

            <div className="reg-header">
              <div className="reg-eyebrow">Nova conta</div>
              <h1 className="reg-title">Criar sua conta</h1>
              <p className="reg-desc">Junte-se à experiência Violet Dream</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="reg-body">

                {/* Name */}
                <div className="field-wrap">
                  <label htmlFor="name" className={`field-label ${focused === "name" ? "active" : ""}`}>
                    Nome completo
                  </label>
                  <div className="field-input-wrap">
                    <input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      value={nome}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className={`field-input ${nome.trim().length > 1 ? "is-valid" : ""}`}
                      required
                      autoComplete="name"
                    />
                    {nome.trim().length > 1 && (
                      <span className="field-icon valid">
                        <Check style={{ width: 13, height: 13 }} />
                      </span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="field-wrap">
                  <label htmlFor="email" className={`field-label ${focused === "email" ? "active" : ""}`}>
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
                      className={`field-input ${/\S+@\S+\.\S+/.test(email) ? "is-valid" : ""}`}
                      required
                      autoComplete="email"
                    />
                    {/\S+@\S+\.\S+/.test(email) && (
                      <span className="field-icon valid">
                        <Check style={{ width: 13, height: 13 }} />
                      </span>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div className="field-wrap">
                  <label htmlFor="password" className={`field-label ${focused === "password" ? "active" : ""}`}>
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
                      className="field-input"
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="field-icon"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showPassword
                        ? <EyeOff style={{ width: 15, height: 15 }} />
                        : <Eye style={{ width: 15, height: 15 }} />}
                    </button>
                  </div>

                  {password.length > 0 && (
                    <div className="strength-row">
                      <div className="strength-bars">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="strength-bar"
                            style={{ background: i <= passwordStrength ? strengthColor : undefined }}
                          />
                        ))}
                      </div>
                      <span className="strength-label" style={{ color: strengthColor }}>
                        {strengthLabel}
                      </span>
                    </div>
                  )}

                  {!password && (
                    <span className="field-hint">Mínimo 6 caracteres</span>
                  )}
                </div>

                {/* Confirm password */}
                <div className="field-wrap">
                  <label htmlFor="confirmPassword" className={`field-label ${focused === "confirm" ? "active" : ""}`}>
                    Confirmar senha
                  </label>
                  <div className="field-input-wrap">
                    <input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onFocus={() => setFocused("confirm")}
                      onBlur={() => setFocused(null)}
                      className={`field-input ${
                        confirmPassword.length > 0
                          ? passwordsMatch ? "is-valid" : "has-error"
                          : ""
                      }`}
                      required
                      autoComplete="new-password"
                    />
                    {passwordsMatch && (
                      <span className="field-icon valid">
                        <Check style={{ width: 13, height: 13 }} />
                      </span>
                    )}
                  </div>
                  {confirmPassword.length > 0 && !passwordsMatch && (
                    <span className="field-hint error">As senhas não coincidem</span>
                  )}
                </div>

                {error && (
                  <p className="error-msg" role="alert">{error}</p>
                )}

                <div className="divider" />

                <button
                  type="submit"
                  className="btn-register"
                  disabled={isLoading || !isFormValid}
                >
                  {isLoading ? (
                    <><span className="spinner" /> Criando conta…</>
                  ) : (
                    <><Sparkles style={{ width: 13, height: 13 }} /> Criar conta</>
                  )}
                </button>

                <p className="reg-footer">
                  Já tem uma conta?{" "}
                  <Link href="/login">Entrar</Link>
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