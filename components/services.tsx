import { Scissors, Sparkles, Zap, Star, Baby, Palette, Layers, Leaf } from "lucide-react"

interface ServiceItem {
  icon: React.ElementType
  title: string
  description: string
  price: string
  duration: string
}

const services: ServiceItem[] = [
  { icon: Scissors, title: "Corte", description: "Corte masculino clássico ou moderno com acabamento preciso.", price: "R$ 35,00", duration: "30 min" },
  { icon: Sparkles, title: "Barba", description: "Modelagem e aparo completo para uma barba sempre impecável.", price: "R$ 25,00", duration: "20 min" },
  { icon: Zap, title: "Corte + Barba", description: "Combo completo para sair renovado com total estilo.", price: "R$ 50,00", duration: "40 min" },
  { icon: Baby, title: "Corte Infantil", description: "Corte especial para os pequenos com carinho e atenção.", price: "R$ 30,00", duration: "30 min" },
  { icon: Palette, title: "Degradê + Pigmentação", description: "Degradê preciso com pigmentação para um visual moderno.", price: "R$ 60,00", duration: "40 min" },
  { icon: Star, title: "Sobrancelha", description: "Design de sobrancelha para um acabamento perfeito.", price: "R$ 10,00", duration: "10 min" },
  { icon: Layers, title: "Progressiva", description: "Tratamento de alisamento progressivo para cabelos rebeldes.", price: "R$ 80,00", duration: "1 h" },
  { icon: Leaf, title: "Limpeza de Pele", description: "Tratamento completo de limpeza facial e cuidados com a pele.", price: "R$ 30,00", duration: "30 min" },
]

interface ServicesProps {
  onBooking: () => void
}

export default function Services({ onBooking }: ServicesProps) {
  return (
    <section id="servicos" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-primary text-xs tracking-widest uppercase mb-3">O que oferecemos</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
            Nossos Serviços
          </h2>
          <div className="w-16 h-0.5 bg-primary mt-6" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="bg-card p-7 flex flex-col gap-4 group hover:bg-secondary transition-colors duration-300 cursor-pointer"
                onClick={onBooking}
              >
                <div className="w-10 h-10 border border-primary/40 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                  <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {service.description}
                </p>
                <div className="border-t border-border pt-4 flex items-center justify-between">
                  <span className="text-primary text-sm font-bold">{service.price}</span>
                  <span className="text-muted-foreground text-xs">{service.duration}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Booking CTA */}
        <div className="text-center mt-12">
          <button
            onClick={onBooking}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-3.5 text-sm font-bold tracking-widest uppercase hover:opacity-90 transition-opacity rounded shadow-lg shadow-primary/20"
          >
            <Scissors className="w-4 h-4" />
            Agendar um Serviço
          </button>
        </div>
      </div>
    </section>
  )
}
