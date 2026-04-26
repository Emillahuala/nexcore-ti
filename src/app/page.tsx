import Navbar      from '@/components/layout/Navbar'
import Footer      from '@/components/layout/Footer'
import Hero        from '@/components/sections/Hero'
import Services    from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import Pricing     from '@/components/sections/Pricing'
import About       from '@/components/sections/About'
import Contact     from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <Testimonials />
        <Pricing />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
