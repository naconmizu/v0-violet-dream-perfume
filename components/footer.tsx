import { Instagram, Facebook, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border py-12">
      <div className="container mx-auto px-4">
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
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
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
