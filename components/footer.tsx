import { Instagram, Facebook, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer role="contentinfo" aria-label="Rodape do site" className="border-t border-border py-12 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, hsl(305 32% 7%) 0%, hsl(305 38% 5%) 25%, hsl(305 35% 6%) 50%, hsl(305 40% 4%) 75%, hsl(305 32% 7%) 100%)'
    }}>
      {/* Padrão de fundo decorativo */}
      <div className="absolute inset-0 bg-pattern-mesh opacity-40"></div>
      
      {/* Padrão de grid sutil */}
      <div className="absolute inset-0 bg-pattern-grid opacity-30"></div>
      
      {/* Efeitos de fundo decorativos animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent"></div>
      </div>
      
      {/* Padrão SVG decorativo */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="footer-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="2" fill="currentColor" className="text-primary"/>
            <path d="M0 50 L100 50 M50 0 L50 100" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-pattern)"/>
      </svg>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-2xl font-rif mb-4">
              <span className="text-primary">Violet</span>
              <span className="text-accent"> Dream</span>
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Perfumaria artesanal inspirada nas frutas roxas mais nobres da natureza.
            </p>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Produtos</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Perfumes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Coleções
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Presentes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Novidades
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Sobre</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Nossa História
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Sustentabilidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Redes Sociais</h5>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                aria-label="Siga-nos no Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                aria-label="Siga-nos no Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                aria-label="Envie-nos um email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Violet Dream. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
