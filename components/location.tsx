import { MapPin, Navigation, Clock, Phone } from "lucide-react"

const info = [
  {
    icon: MapPin,
    label: "Endereço",
    value: "Av. Tiradentes - Cidade Jardim",
    sub: "Águas Lindas de Goiás - GO, 72910-000",
  },
  {
    icon: Navigation,
    label: "Código Plus",
    value: "7P5Q+G9",
    sub: "Cidade Jardim, Águas Lindas de Goiás - GO",
  },
  {
    icon: Clock,
    label: "Horário",
    value: "Seg – Sáb: 08h às 20h",
    sub: "Domingo: fechado",
  },
  {
    icon: Phone,
    label: "Contato",
    value: "Consulte pelo Google Maps",
    sub: "ou visite pessoalmente",
  },
]

export default function Location() {
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Barbearia+Oliveira+Av.+Tiradentes+Cidade+Jardim+Águas+Lindas+de+Goiás+GO"

  return (
    <section id="localizacao" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-primary text-xs tracking-widest uppercase mb-3">Onde estamos</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
            Localização
          </h2>
          <div className="w-16 h-0.5 bg-primary mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
            {info.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="bg-card p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-xs tracking-widest uppercase text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-foreground font-semibold">{item.value}</p>
                  <p className="text-muted-foreground text-sm">{item.sub}</p>
                </div>
              )
            })}
          </div>

          {/* Map embed area */}
          <div className="flex flex-col gap-6">
            <div className="relative overflow-hidden bg-card border border-border aspect-video">
              <iframe
                title="Localização Barbearia Oliveira no Google Maps"
                src="https://maps.google.com/maps?q=Av.+Tiradentes+Cidade+Jardim+%C3%81guas+Lindas+de+Goi%C3%A1s+GO&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 pointer-events-none border border-primary/20" />
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 text-sm font-semibold tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              <Navigation className="w-4 h-4" />
              Abrir no Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
