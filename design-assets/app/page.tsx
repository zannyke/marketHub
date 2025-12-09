import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { FeaturedCategories } from "@/components/featured-categories"
import { FeaturedProducts } from "@/components/featured-products"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <Footer />
    </main>
  )
}
