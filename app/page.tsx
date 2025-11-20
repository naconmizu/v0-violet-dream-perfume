import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { Essences } from "@/components/essences"
import { RedCollection } from "@/components/red-collection"
import { GoldCollection } from "@/components/gold-collection"
import { About } from "@/components/about"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedProducts />
      <RedCollection />
      <GoldCollection />
      <Essences />
      <About />
      <Newsletter />
      <Footer />
    </main>
  )
}
