import { MapPin, CalendarCheck } from "lucide-react"
import Image from "next/image"

interface ContactFooterProps {
  onBooking: () => void
}

export default function ContactFooter({ onBooking }: ContactFooterProps) {
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Barbearia+Oliveira+Av.+Tiradentes+Cidade+Jardim+%C3%81guas+Lindas+de+Goi%C3%A1s+GO"

  return (
    <>
      {/* Contact CTA */}
      <section
        id="contato"
        className="py-24 px-6 bg-card border-t border-border"
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary text-xs tracking-widest uppercase mb-4">Fale conosco</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Pronto para um novo visual?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 text-pretty max-w-xl mx-auto">
            Visite a Barbearia Oliveira na Av. Tiradentes, Cidade Jardim — Águas Lindas de Goiás.
            Qualidade e confiança que você merece.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onBooking}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-bold tracking-widest uppercase hover:opacity-90 transition-opacity rounded shadow-lg shadow-primary/20"
            >
              <CalendarCheck className="w-4 h-4" />
              Agendar Agora
            </button>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold tracking-widest uppercase hover:border-primary hover:text-primary transition-colors rounded"
            >
              <MapPin className="w-4 h-4" />
              Ver no Mapa
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#inicio">
            <Image
              src="/images/logo-oliveira.png"
              alt="Barbearia Oliveira"
              width={120}
              height={60}
              className="object-contain h-12 w-auto"
            />
          </a>

          {/* Address */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm text-center">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <span>Av. Tiradentes – Cidade Jardim, Águas Lindas de Goiás – GO, 72910-000</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <span className="text-primary font-bold">4,3</span>
            <span>★★★★☆ no Google</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-border mt-8 pt-6 text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Barbearia Oliveira — Águas Lindas de Goiás, GO. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  )
}
