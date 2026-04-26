import { MapPin, CalendarCheck } from "lucide-react"
import Image from "next/image"

interface HeroProps {
  onBooking: () => void
}

export default function Hero({ onBooking }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Ferramentas de barbearia — tigela metálica com pincel, navalha reta e pentes sobre toalha escura"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-background" />
      </div>

      {/* Decorative gold lines */}
      <div className="absolute left-8 top-1/4 bottom-1/4 w-px bg-primary/20 hidden lg:block" />
      <div className="absolute right-8 top-1/4 bottom-1/4 w-px bg-primary/20 hidden lg:block" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        {/* Logo grande no hero */}
        <div className="mb-8">
          <Image
            src="/images/logo-oliveira.png"
            alt="Barbearia Oliveira"
            width={700}
            height={400}
            className="object-contain w-[340px] md:w-[620px] lg:w-[700px] mx-auto drop-shadow-2xl"
            priority
          />
        </div>

        <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10 text-pretty">
          Qualidade, estilo e tradição. O melhor corte da região está aqui — venha nos conhecer.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onBooking}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-bold tracking-widest uppercase hover:opacity-90 transition-opacity rounded shadow-lg shadow-primary/20"
          >
            <CalendarCheck className="w-4 h-4" />
            Agendar Agora
          </button>
          <a
            href="#localizacao"
            className="flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold tracking-widest uppercase hover:border-primary hover:text-primary transition-colors rounded"
          >
            <MapPin className="w-4 h-4" />
            Como Chegar
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
