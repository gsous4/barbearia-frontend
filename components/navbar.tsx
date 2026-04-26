"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Localização", href: "#localizacao" },
  { label: "Contato", href: "#contato" },
]

interface NavbarProps {
  onBooking: () => void
}

export default function Navbar({ onBooking }: NavbarProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 md:h-28">
        {/* Logo */}
        <a href="#inicio" className="flex items-center">
          <Image
            src="/images/logo-oliveira.png"
            alt="Barbearia Oliveira"
            width={260}
            height={104}
            className="object-contain h-10 md:h-24 w-auto"
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Desktop */}
        <button
          onClick={onBooking}
          className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold tracking-wide uppercase hover:opacity-90 transition-opacity rounded"
        >
          Agendar
        </button>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); onBooking() }}
            className="bg-primary text-primary-foreground text-center px-5 py-2 text-sm font-semibold tracking-wide uppercase hover:opacity-90 transition-opacity mt-2 rounded"
          >
            Agendar
          </button>
        </div>
      )}
    </header>
  )
}
