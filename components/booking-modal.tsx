"use client"

import { useState } from "react"
import { X, ChevronLeft, Check, Phone, Calendar, Scissors, User, ChevronRight } from "lucide-react"
import Image from "next/image"

// Brand colors
const BRAND_YELLOW = "#F5C518"
const BRAND_DARK   = "#111111"
const BRAND_CARD   = "#1a1a1a"
const BRAND_BORDER = "#2e2e2e"

const SERVICES = [
  { name: "Barba", price: "R$ 25,00", duration: "20 min" },
  { name: "Corte", price: "R$ 35,00", duration: "30 min" },
  { name: "Corte + barba + sobrancelha", price: "R$ 50,00", duration: "40 min" },
  { name: "Corte + barba", price: "R$ 50,00", duration: "40 min" },
  { name: "Corte + graxa", price: "R$ 60,00", duration: "40 min" },
  { name: "Corte infantil", price: "R$ 30,00", duration: "30 min" },
  { name: "Degradê + pigmentação", price: "R$ 60,00", duration: "40 min" },
  { name: "Degradê + pigmentação + barba", price: "R$ 60,00", duration: "40 min" },
  { name: "Limpeza de pele", price: "R$ 30,00", duration: "30 min" },
  { name: "Luzes, platinado ou nevar + corte", price: "R$ 130,00", duration: "1 h" },
  { name: "Progressiva", price: "R$ 80,00", duration: "1 h" },
  { name: "Sobrancelha", price: "R$ 10,00", duration: "10 min" },
]

const TIME_SLOTS = [
  "09:00", "09:35", "10:10", "10:45", "11:20", "11:55",
  "12:30", "13:05", "13:40", "14:15", "14:50", "15:25",
  "16:30", "17:05", "17:40", "18:15", "18:50", "19:25", "20:00",
]

const DAYS   = ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."]
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

interface BookingModalProps {
  open: boolean
  onClose: () => void
}

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const [step, setStep] = useState(0)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const today = new Date()
  const [calYear, setCalYear]       = useState(today.getFullYear())
  const [calMonth, setCalMonth]     = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<number | null>(today.getDate())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [phone, setPhone]           = useState("")
  const [booked, setBooked]         = useState(false)

  if (!open) return null

  const totalDays     = getDaysInMonth(calYear, calMonth)
  const firstDay      = getFirstDayOfMonth(calYear, calMonth)
  const todayDate     = today.getDate()
  const isCurrentMonth = calYear === today.getFullYear() && calMonth === today.getMonth()

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1) }
    else setCalMonth(m => m - 1)
    setSelectedDate(null)
  }
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1) }
    else setCalMonth(m => m + 1)
    setSelectedDate(null)
  }

  const selectedSvc = SERVICES.find(s => s.name === selectedService)

  const formatSelectedDate = () => {
    if (!selectedDate) return ""
    const d = new Date(calYear, calMonth, selectedDate)
    const dayName = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"][d.getDay()]
    return `${dayName}, ${selectedDate} de ${MONTHS[calMonth].toLowerCase()} de ${calYear}`
  }

  const handleConfirm = () => {
    setBooked(true)
    setStep(3)
  }

  const handleClose = () => {
    setStep(0)
    setSelectedService(null)
    setSelectedDate(today.getDate())
    setSelectedTime(null)
    setPhone("")
    setBooked(false)
    onClose()
  }

  const stepLabels = ["Serviço", "Data & Hora", "Telefone"]

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        style={{ background: BRAND_DARK, border: `1px solid ${BRAND_BORDER}` }}
      >

        {/* Header */}
        <div
          className="px-4 py-3 flex items-center gap-3 flex-shrink-0"
          style={{ background: BRAND_YELLOW }}
        >
          {step > 0 && !booked && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="p-1 rounded-full transition-colors hover:bg-black/15"
              style={{ color: BRAND_DARK }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex-1 text-center flex items-center justify-center gap-3">
            <Image
              src="/images/logo-oliveira.png"
              alt="Barbearia Oliveira"
              width={56}
              height={32}
              className="object-contain h-8 w-auto"
            />
            <div>
              <p className="font-bold text-sm leading-tight" style={{ color: BRAND_DARK }}>
                {booked ? "Agendamento Confirmado!" :
                  step === 0 ? "Selecione o Serviço" :
                  step === 1 ? "Data e hora" :
                  "Seu número de celular"}
              </p>
              <p className="text-xs font-medium" style={{ color: BRAND_DARK + "cc" }}>Eduardo Oliveira</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-full transition-colors hover:bg-black/15"
            style={{ color: BRAND_DARK }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress steps */}
        {!booked && (
          <div
            className="flex flex-shrink-0"
            style={{ background: BRAND_CARD, borderBottom: `1px solid ${BRAND_BORDER}` }}
          >
            {stepLabels.map((label, i) => (
              <div
                key={label}
                className="flex-1 text-center py-2.5 text-xs font-semibold transition-all flex items-center justify-center gap-1"
                style={{
                  color: i === step ? BRAND_YELLOW : i < step ? "#22c55e" : "#555",
                  borderBottom: i === step ? `2px solid ${BRAND_YELLOW}` : "2px solid transparent",
                }}
              >
                {i < step
                  ? <Check className="w-3.5 h-3.5" style={{ color: "#22c55e" }} />
                  : label}
              </div>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="overflow-y-auto flex-1" style={{ background: BRAND_DARK }}>

          {/* STEP 0 – Services */}
          {step === 0 && (
            <div>
              <div
                className="px-4 py-2.5 text-sm font-semibold"
                style={{ background: BRAND_CARD, color: BRAND_YELLOW, borderBottom: `1px solid ${BRAND_BORDER}` }}
              >
                Meus serviços {selectedService ? "(selecionado: 1)" : "(selecione 1)"}
              </div>
              <div>
                {SERVICES.map((svc, idx) => (
                  <button
                    key={svc.name}
                    onClick={() => setSelectedService(svc.name)}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors"
                    style={{
                      borderBottom: idx < SERVICES.length - 1 ? `1px solid ${BRAND_BORDER}` : "none",
                      background: selectedService === svc.name ? "#1f1f1f" : "transparent",
                    }}
                  >
                    <div>
                      <p className="text-sm font-medium" style={{ color: selectedService === svc.name ? BRAND_YELLOW : "#e5e5e5" }}>
                        {svc.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#888" }}>
                        de {svc.price}, {svc.duration}
                      </p>
                    </div>
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3 transition-all"
                      style={{
                        borderColor: selectedService === svc.name ? BRAND_YELLOW : BRAND_BORDER,
                        background:  selectedService === svc.name ? BRAND_YELLOW : "transparent",
                      }}
                    >
                      {selectedService === svc.name && (
                        <Check className="w-3 h-3" style={{ color: BRAND_DARK }} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 – Date & Time */}
          {step === 1 && (
            <div className="p-4 flex flex-col gap-4">
              {/* Service summary */}
              {selectedSvc && (
                <div
                  className="rounded-xl p-3"
                  style={{ background: BRAND_CARD, border: `1px solid ${BRAND_BORDER}` }}
                >
                  <p className="text-xs mb-0.5" style={{ color: "#888" }}>Barbearia Oliveira:</p>
                  <p className="text-sm font-semibold" style={{ color: BRAND_YELLOW }}>{selectedSvc.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#888" }}>de {selectedSvc.price}, {selectedSvc.duration}</p>
                </div>
              )}

              {/* Calendar */}
              <div
                className="rounded-xl p-4"
                style={{ background: BRAND_CARD, border: `1px solid ${BRAND_BORDER}` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={prevMonth}
                    className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
                    style={{ color: "#ccc" }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <p className="font-bold text-sm" style={{ color: BRAND_YELLOW }}>
                    {MONTHS[calMonth]}, {calYear}
                  </p>
                  <button
                    onClick={nextMonth}
                    className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
                    style={{ color: "#ccc" }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 text-center mb-2">
                  {DAYS.map(d => (
                    <span key={d} className="text-xs font-semibold py-1" style={{ color: BRAND_YELLOW }}>
                      {d}
                    </span>
                  ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7 text-center gap-y-1">
                  {Array.from({ length: firstDay }).map((_, i) => <span key={`e-${i}`} />)}
                  {Array.from({ length: totalDays }).map((_, i) => {
                    const day = i + 1
                    const isPast     = isCurrentMonth && day < todayDate
                    const isToday    = isCurrentMonth && day === todayDate
                    const isSelected = selectedDate === day
                    return (
                      <button
                        key={day}
                        disabled={isPast}
                        onClick={() => { setSelectedDate(day); setSelectedTime(null) }}
                        className="w-8 h-8 mx-auto rounded-full text-sm transition-all font-medium"
                        style={{
                          background: isSelected ? BRAND_YELLOW : isToday ? "transparent" : "transparent",
                          color: isSelected
                            ? BRAND_DARK
                            : isPast
                            ? "#444"
                            : isToday
                            ? "#fff"
                            : "#d4d4d4",
                          border: isToday && !isSelected ? "2px solid #555" : "2px solid transparent",
                          cursor: isPast ? "not-allowed" : "pointer",
                          opacity: isPast ? 0.4 : 1,
                        }}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time slots */}
              {selectedDate && (
                <div>
                  <p className="text-sm text-center mb-3" style={{ color: "#aaa" }}>
                    {formatSelectedDate()}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {TIME_SLOTS.map(t => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                        style={{
                          background:   selectedTime === t ? BRAND_YELLOW : BRAND_CARD,
                          color:        selectedTime === t ? BRAND_DARK : "#ccc",
                          border:       `1px solid ${selectedTime === t ? BRAND_YELLOW : BRAND_BORDER}`,
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2 – Phone */}
          {step === 2 && (
            <div className="p-4 flex flex-col gap-4">
              <div
                className="rounded-xl p-4 flex flex-col gap-4"
                style={{ background: BRAND_CARD, border: `1px solid ${BRAND_BORDER}` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: BRAND_YELLOW }}
                  >
                    <Phone className="w-5 h-5" style={{ color: BRAND_DARK }} />
                  </div>
                  <p className="text-sm font-medium" style={{ color: "#e5e5e5" }}>
                    Insira seu telefone de contato
                  </p>
                </div>
                <div
                  className="flex items-center gap-2 pb-3"
                  style={{ borderBottom: `1px solid ${BRAND_BORDER}` }}
                >
                  <div
                    className="flex items-center gap-1 text-sm rounded px-2 py-1.5"
                    style={{ border: `1px solid ${BRAND_BORDER}`, color: "#aaa" }}
                  >
                    <span>+55</span>
                    <ChevronRight className="w-3 h-3 rotate-90" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="Número de telefone"
                    maxLength={11}
                    className="flex-1 outline-none text-sm bg-transparent"
                    style={{ color: "#e5e5e5" }}
                  />
                </div>
                <p className="text-xs" style={{ color: "#666" }}>
                  Enviamos uma mensagem de texto (SMS) com um código para confirmar seu número de telefone.
                </p>
              </div>

              {/* Booking summary */}
              {selectedSvc && selectedDate && selectedTime && (
                <div
                  className="rounded-xl p-4 text-sm flex flex-col gap-2"
                  style={{ background: BRAND_CARD, border: `1px solid ${BRAND_BORDER}` }}
                >
                  <p className="font-semibold mb-1" style={{ color: BRAND_YELLOW }}>Resumo do agendamento</p>
                  <div className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 flex-shrink-0" style={{ color: BRAND_YELLOW }} />
                    <span style={{ color: "#ccc" }}>{selectedSvc.name} — {selectedSvc.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: BRAND_YELLOW }} />
                    <span style={{ color: "#ccc" }}>{formatSelectedDate()} às {selectedTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 flex-shrink-0" style={{ color: BRAND_YELLOW }} />
                    <span style={{ color: "#ccc" }}>Eduardo Oliveira — Barbearia Oliveira</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3 – Success */}
          {step === 3 && booked && (
            <div className="p-8 flex flex-col items-center gap-4 text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: BRAND_YELLOW + "22", border: `2px solid ${BRAND_YELLOW}` }}
              >
                <Check className="w-10 h-10" style={{ color: BRAND_YELLOW }} />
              </div>
              <h3 className="font-bold text-xl" style={{ color: BRAND_YELLOW }}>
                Agendado com sucesso!
              </h3>
              <p className="text-sm" style={{ color: "#aaa" }}>
                Seu horário foi reservado. Eduardo Oliveira entrará em contato para confirmar.
              </p>
              {selectedSvc && selectedDate && selectedTime && (
                <div
                  className="rounded-xl p-4 text-sm w-full text-left flex flex-col gap-2"
                  style={{ background: BRAND_CARD, border: `1px solid ${BRAND_BORDER}` }}
                >
                  <div className="flex items-center gap-2">
                    <Scissors className="w-4 h-4" style={{ color: BRAND_YELLOW }} />
                    <span className="font-medium" style={{ color: "#e5e5e5" }}>{selectedSvc.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" style={{ color: BRAND_YELLOW }} />
                    <span style={{ color: "#ccc" }}>{formatSelectedDate()} às {selectedTime}</span>
                  </div>
                </div>
              )}
              <button
                onClick={handleClose}
                className="w-full rounded-xl py-3 font-bold text-sm tracking-wide mt-2 transition-opacity hover:opacity-90"
                style={{ background: BRAND_YELLOW, color: BRAND_DARK }}
              >
                Fechar
              </button>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        {!booked && (
          <div
            className="p-4 flex-shrink-0"
            style={{ background: BRAND_CARD, borderTop: `1px solid ${BRAND_BORDER}` }}
          >
            {step === 0 && (
              <button
                onClick={() => selectedService && setStep(1)}
                disabled={!selectedService}
                className="w-full rounded-xl py-3.5 font-bold text-sm tracking-widest uppercase transition-opacity"
                style={{
                  background: selectedService ? BRAND_YELLOW : "#333",
                  color:      selectedService ? BRAND_DARK   : "#666",
                  cursor:     selectedService ? "pointer"    : "not-allowed",
                }}
              >
                PROSSEGUIR
              </button>
            )}
            {step === 1 && (
              <button
                onClick={() => selectedDate && selectedTime && setStep(2)}
                disabled={!selectedDate || !selectedTime}
                className="w-full rounded-xl py-3.5 font-bold text-sm tracking-widest uppercase transition-opacity"
                style={{
                  background: selectedDate && selectedTime ? BRAND_YELLOW : "#333",
                  color:      selectedDate && selectedTime ? BRAND_DARK   : "#666",
                  cursor:     selectedDate && selectedTime ? "pointer"    : "not-allowed",
                }}
              >
                PROSSEGUIR
              </button>
            )}
            {step === 2 && (
              <button
                onClick={() => phone.length >= 10 && handleConfirm()}
                disabled={phone.length < 10}
                className="w-full rounded-xl py-3.5 font-bold text-sm tracking-widest uppercase transition-opacity"
                style={{
                  background: phone.length >= 10 ? BRAND_YELLOW : "#333",
                  color:      phone.length >= 10 ? BRAND_DARK   : "#666",
                  cursor:     phone.length >= 10 ? "pointer"    : "not-allowed",
                }}
              >
                CONFIRMAR AGENDAMENTO
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
