import { Star, Quote } from "lucide-react"

const reviews = [
  {
    name: "Alex Pereira",
    role: "Local Guide · 216 avaliações · 576 fotos",
    rating: 5,
    text: "Chama na qualidade!!! Os melhores!!!!",
    date: "2 anos atrás",
    initials: "AP",
  },
  {
    name: "Maycon Vieira",
    role: "2 avaliações",
    rating: 5,
    text: "Melhores mensagens diretas.",
    date: "2 anos atrás",
    initials: "MV",
  },
  {
    name: "Carlos de Laet",
    role: "5 avaliações · 1 foto",
    rating: 5,
    text: "Ótimo atendimento e qualidade impecável no corte.",
    date: "2 anos atrás",
    initials: "CL",
  },
]

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= count ? "fill-primary text-primary" : "fill-muted text-muted"}`}
        />
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="avaliacoes" className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <p className="text-primary text-xs tracking-widest uppercase mb-3">O que dizem</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
              Avaliações
            </h2>
            <div className="w-16 h-0.5 bg-primary mt-6" />
          </div>

          {/* Overall rating */}
          <div className="flex items-center gap-6 border border-border p-6">
            <div className="text-center">
              <p className="font-serif text-6xl font-bold text-primary leading-none">4,3</p>
              <div className="flex justify-center mt-2">
                <StarRow count={4} />
              </div>
              <p className="text-muted-foreground text-xs mt-1">4 avaliações</p>
            </div>
            <div className="w-px h-16 bg-border" />
            <div className="flex flex-col gap-1">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-2">{star}</span>
                  <div className="w-24 h-1 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width:
                          star === 5 ? "75%" : star === 4 ? "25%" : "0%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {reviews.map((review) => (
            <div key={review.name} className="bg-background p-8 flex flex-col gap-4">
              <Quote className="w-8 h-8 text-primary/30" />
              <p className="text-foreground leading-relaxed flex-1 text-pretty">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="border-t border-border pt-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                  {review.initials}
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm">{review.name}</p>
                  <p className="text-muted-foreground text-xs">{review.role}</p>
                </div>
                <div className="ml-auto flex flex-col items-end gap-1">
                  <StarRow count={review.rating} />
                  <span className="text-muted-foreground text-xs">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google note */}
        <p className="text-muted-foreground text-xs text-center mt-8">
          Avaliações verificadas pelo Google Maps
        </p>
      </div>
    </section>
  )
}
