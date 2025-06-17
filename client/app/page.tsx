"use client"
import Header from "@/components/header"
import Balance from "@/components/balance"
import Services from "@/components/services"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <section className="p-4" onContextMenu={(e) => e.preventDefault()}>
      <main>
      <Header />
      <Balance />
      <Services />
      <Footer />
      </main>
   </section>
  )
}