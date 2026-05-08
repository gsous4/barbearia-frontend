"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, Check, Phone, Calendar, Scissors, User, ChevronRight } from "lucide-react"
import Image from "next/image"

const BRAND_YELLOW = "#F5C518"
const BRAND_DARK   = "#111111"
const BRAND_CARD   = "#1a1a1a"
const BRAND_BORDER = "#2e2e2e"

const DAYS   = ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."]
const MONTHS = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]

function getDaysInMonth(year: number, month: number) { return new Date(year, month + 1, 0).getDate() }
function getFirstDayOfMonth(year: number, month: number) { return new Date(year, month, 1).getDay() }

interface Servico { id: string; nome: string; preco: number; duracao_minutos: number }
interface Barbeiro { id: string; nome: string }
interface BookingModalProps { open: boolean; onClose: () => void }

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const [step, setStep] = useState(0)
  const [servicos, setServicos] = useState<Servico[]>([])
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([])
  const [selectedService, setSelectedService] = useState<Servico | null>(null)
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([])
  const [loadingHorarios, setLoadingHorarios] = useState(false)

  const today = new Date()
  const [calYear, setCalYear]   = useState(today.getFullYear())
  const [calMonth, setCalMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<number | null>(today.getDate())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const [nome, setNome]             = useState("")
  const [sobrenome, setSobrenome]   = useState("")
  const [phone, setPhone]           = useState("")
  const [comentario, setComentario] = useState("")
  const [booked, setBooked]         = useState(false)
  const [loading, setLoading]       = useState(false)
  const [whatsappLink, setWhatsappLink] = useState("")

  useEffect(() => {
    if (!open) return
    fetch('/api/servicos').then(r => r.json()).then(setServicos)
    fetch('/api/barbeiros').then(r => r.json()).then(setBarbeiros)
  }, [open])

  useEffect(() => {
    if (!selectedDate || !selectedService || !barbeiros[0]) return
    setLoadingHorarios(true)
    const data = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`
    fetch(`/api/horarios-disponiveis?barbeiro_id=${barbeiros[0].id}&data=${data}&duracao=${selectedService.duracao_minutos}`)
      .then(r => r.json())
      .then(res => { setHorariosDisponiveis(res.horariosDisponiveis || []); setLoadingHorarios(false) })
  }, [selectedDate, selectedService, calYear, calMonth, barbeiros])

  if (!open) return null

  const totalDays  = getDaysInMonth(calYear, calMonth)
  const firstDay   = getFirstDayOfMonth(calYear, calMonth)
  const isCurrentMonth = calYear === today.getFullYear() && calMonth === today.getMonth()

  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y-1) } else setCalMonth(m => m-1); setSelectedDate(null); setSelectedTime(null) }
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y+1) } else setCalMonth(m => m+1); setSelectedDate(null); setSelectedTime(null) }

  const formatSelectedDate = () => {
    if (!selectedDate) return ""
    const d = new Date(calYear, calMonth, selectedDate)
    const dayName = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"][d.getDay()]
    return `${dayName}, ${selectedDate} de ${MONTHS[calMonth].toLowerCase()} de ${calYear}`
  }

  const handleConfirm = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !barbeiros[0]) return
    setLoading(true)
    const data = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`
    const data_hora = `${data}T${selectedTime}:00`
    const res = await fetch('/api/agendamentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        barbeiro_id: barbeiros[0].id,
        servico_id: selectedService.id,
        cliente_nome: `${nome} ${sobrenome}`.trim(),
        cliente_telefone: `55${phone}`,
        data_hora,
        comentario
      })
    })
    const json = await res.json()
    setLoading(false)
    if (res.ok) {
      setWhatsappLink(json.whatsapp)
      setBooked(true)
      setStep(4)
      window.open(json.whatsapp, '_blank')
    } else {
      alert(json.erro || 'Erro ao agendar')
    }
  }

  const handleClose = () => {
    setStep(0); setSelectedService(null); setSelectedDate(today.getDate())
    setSelectedTime(null); setPhone(""); setNome(""); setSobrenome("")
    setComentario(""); setBooked(false); setWhatsappLink(""); onClose()
  }

  const stepLabels = ["Serviço", "Data & Hora", "Contato", "Confirmar"]
  const barbeiro = barbeiros[0]

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]" style={{ background: BRAND_DARK, border: `1px solid ${BRAND_BORDER}` }}>

        {/* Header */}
        <div className="px-4 py-3 flex items-center gap-3 flex-shrink-0" style={{ background: BRAND_YELLOW }}>
          {step > 0 && !booked && (
            <button onClick={() => setStep(s => s-1)} className="p-1 rounded-full hover:bg-black/15" style={{ color: BRAND_DARK }}>
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex-1 text-center flex items-center justify-center gap-3">
            <Image src="/images/logo-oliveira.png" alt="Barbearia Oliveira" width={56} height={32} className="object-contain h-8 w-auto" />
            <div>
              <p className="font-bold text-sm leading-tight" style={{ color: BRAND_DARK }}>
                {booked ? "Agendado!" : step === 0 ? "Selecione o Serviço" : step === 1 ? "Data e hora" : step === 2 ? "Informações de contato" : "Confirmar agendamento"}
              </p>
              <p className="text-xs font-medium" style={{ color: BRAND_DARK + "cc" }}>{barbeiro?.nome || "Eduardo Oliveira"}</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-1 rounded-full hover:bg-black/15" style={{ color: BRAND_DARK }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        {!booked && (
          <div className="flex flex-shrink-0" style={{ background: BRAND_CARD, borderBottom: `1px solid ${BRAND_BORDER}` }}>
            {stepLabels.map((label, i) => (
              <div key={label} className="flex-1 text-center py-2.5 text-xs font-semibold flex items-center justify-center gap-1"
                style={{ color: i === step ? BRAND_YELLOW : i < step ? "#22c55e" : "#555", borderBottom: i === step ? `2px solid ${BRAND_YELLOW}` : "2px solid transparent" }}>
                {i < step ? <Check className="w-3.5 h-3.5" style={{ color: "#22c55e" }} /> : label}
              </div>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="overflow-y-auto flex-1" style={{ background: BRAND_DARK }}>

          {/* STEP 0 – Serviços */}
          {step === 0 && (
            <div>
              <div className="px-4 py-2.5 text-sm font-semibold" style={{ background: BRAND_CARD, color: BRAND_YELLOW, borderBottom: `1px solid ${BRAND_BORDER}` }}>
                Meus serviços {selectedService ? "(selecionado: 1)" : "(selecione 1)"}
              </div>
              {servicos.map((svc, idx) => (
                <button key={svc.id} onClick={() => setSelectedService(svc)} className="w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors"
                  style={{ borderBottom: idx < servicos.length-1 ? `1px solid ${BRAND_BORDER}` : "none", background: selectedService?.id === svc.id ? "#1f1f1f" : "transparent" }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: selectedService?.id === svc.id ? BRAND_YELLOW : "#e5e5e5" }}>{svc.nome}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#888" }}>de R$ {svc.preco.toFixed(2)}, {svc.duracao_minutos} min</p>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3"
                    style={{ borderColor: selectedService?.id === svc.id ? BRAND_YELLOW : BRAND_BORDER, background: selectedService?.id === svc.id ? BRAND_YELLOW : "transparent" }}>
                    {selectedService?.id === svc.id && <Check className="w-3 h-3" style={{ color: BRAND_DARK }} />}
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="p-4 flex flex-col gap-4">
              {selectedService && (
                <div className="rounded-xl p-3" style={{ background: BRAND_CARD, border: `1px solid ${BRAND_BORDER}` }}>
                  <p className="text-xs mb-0.5" style={{ color: "#888" }}>Barbearia Oliveira:</p>
                  <p className="text-sm font-semibold" style={{ color: BRAND_YELLOW }}>{selectedService.nome}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#888" }}>de R$ {selectedService.preco.toFixed(2)}, {selectedService.duracao_minutos} min</p>
                </div>
              )}
              <div className="rounded-xl p-4" style={{ background: BRAND_CARD, border: `1px solid ${BRAND_BORDER}` }}>
                <div className="flex items-center justify-between mb-4">
                  <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-white/10" style={{ color: "#ccc" }}><ChevronLeft className="w-4 h-4" /></button>
                  <p className="font-bold text-sm" style={{ color: BRAND_YELLOW }}>{MONTHS[calMonth]}, {calYear}</p>
                  <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-white/10" style={{ color: "#ccc" }}><ChevronRight className="w-4 h-4" /></button>
                </div>
                <div className="grid grid-cols-7 text-center mb-2">
                  {DAYS.map(d => <span key={d} className="text-xs font-semibold py-1" style={{ color: BRAND_YELLOW }}>{d}</span>)}
                </div>
                <div className="grid grid-cols-7 text-center gap-y-1">
                  {Array.from({ length: firstDay }).map((_, i) => <span key={`e-${i}`} />)}
                  {Array.from({ length: totalDays }).map((_, i) => {
                    const day = i+1
                    const isPast = isCurrentMonth && day < today.getDate()
                    const isToday = isCurrentMonth && day === today.getDate()
                    const isSelected = selectedDate === day
                    return (
                      <button key={day} disabled={isPast} onClick={() => { setSelectedDate(day); setSelectedTime(null) }}
                        className="w-8 h-8 mx-auto rounded-full text-sm font-medium"
                        style={{ background: isSelected ? BRAND_YELLOW : "transparent", color: isSelected ? BRAND_DARK : isPast ? "#444" : "#d4d4d4", border: isToday && !isSelected ? "2px solid #555" : "2px solid transparent", opacity: isPast ? 0.4 : 1, cursor: isPast ? "not-allowed" : "pointer" }}>
                        {day}
                      </button>
                    )
                  })}
                </div>
              </div>
              {selectedDate && (
                <div>
                  <p className="text-sm text-center mb-3" style={{ color: "#aaa" }}>{formatSelectedDate()}</p>
                  {loadingHorarios ? (
                    <p className="text-center text-sm" style={{ color: "#666" }}>Carregando horários...</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {horariosDisponiveis.map(t => (
                        <button key={t} onClick={() => setSelectedTime(t)} className="px-3 py-2 rounded-lg text-sm font-medium"
                          style={{ background: selectedTime === t ? BRAND_YELLOW : BRAND_CARD, color: selectedTime === t ? BRAND_DARK : "#ccc", border: `1px solid ${selectedTime === t ? BRAND_YELLOW : BRAND_BORDER}` }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="p-4 flex flex-col gap-4">
              <div className="rounded-xl p-4 flex flex-col gap-3" style={{ background: BRAND_CARD, border: `1px solid ${BRAND_BORDER}` }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: BRAND_YELLOW }}>
                    <User className="w-5 h-5" style={{ color: BRAND_DARK }} />
                  </div>
                  <p className="text-sm font-medium" style={{ color: "#e5e5e5" }}>Informações de contato</p>
                </div>
                <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome (obrigatório)"
                  className="w-full outline-none text-sm bg-transparent py-2 px-3 rounded-lg"
                  style={{ border: `1px solid ${BRAND_BORDER}`, color: "#e5e5e5" }} />
                <input type="text" value={sobrenome} onChange={e => setSobrenome(e.target.value)} placeholder="Sobrenome (obrigatório)"
                  className="w-full outline-none text-sm bg-transparent py-2 px-3 rounded-lg"
                  style={{ border: `1px solid ${BRAND_BORDER}`, color: "#e5e5e5" }} />
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm rounded px-2 py-2" style={{ border: `1px solid ${BRAND_BORDER}`, color: "#aaa" }}>
                    <span>+55</span>
                  </div>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ""))} placeholder="Número de telefone"
                    maxLength={11} className="flex-1 outline-none text-sm bg-transparent py-2 px-3 rounded-lg"
                    style={{ border: `1px solid ${BRAND_BORDER}`, color: "#e5e5e5" }} />
                </div>
                <textarea value={comentario} onChange={e => setComentario(e.target.value)} placeholder="Comentário (opcional)" rows={3}
                  className="w-full outline-none text-sm bg-transparent py-2 px-3 rounded-lg resize-none"
                  style={{ border: `1px solid ${BRAND_BORDER}`, color: "#e5e5e5" }} />
              </div>
            </div>
          )}

          {/* STEP 3 – Resumo */}
          {step === 3 && (
            <div className="p-4 flex flex-col gap-4">
              <div className="rounded-xl p-4 text-sm flex flex-col gap-3" style={{ background: BRAND_CARD, border: `1px solid ${BRAND_BORDER}` }}>
                <p className="font-semibold" style={{ color: BRAND_YELLOW }}>Resumo do agendamento</p>
                <div className="flex items-center gap-2">
                  <Scissors className="w-4 h-4 flex-shrink-0" style={{ color: BRAND_YELLOW }} />
                  <span style={{ color: "#ccc" }}>{selectedService?.nome} — R$ {selectedService?.preco.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: BRAND_YELLOW }} />
                  <span style={{ color: "#ccc" }}>{formatSelectedDate()} às {selectedTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 flex-shrink-0" style={{ color: BRAND_YELLOW }} />
                  <span style={{ color: "#ccc" }}>{nome} {sobrenome} — {phone}</span>
                </div>
                {comentario && (
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: BRAND_YELLOW }} />
                    <span style={{ color: "#ccc" }}>{comentario}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4 – Sucesso */}
          {step === 4 && booked && (
            <div className="p-8 flex flex-col items-center gap-4 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: BRAND_YELLOW + "22", border: `2px solid ${BRAND_YELLOW}` }}>
                <Check className="w-10 h-10" style={{ color: BRAND_YELLOW }} />
              </div>
              <h3 className="font-bold text-xl" style={{ color: BRAND_YELLOW }}>Agendado com sucesso!</h3>
              <p className="text-sm" style={{ color: "#aaa" }}>O WhatsApp do barbeiro foi aberto automaticamente para confirmar seu horário.</p>
              {whatsappLink && (
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                  className="w-full rounded-xl py-3 font-bold text-sm tracking-wide text-center transition-opacity hover:opacity-90"
                  style={{ background: "#25D366", color: "#fff" }}>
                  Abrir WhatsApp novamente
                </a>
              )}
              <button onClick={handleClose} className="w-full rounded-xl py-3 font-bold text-sm tracking-wide transition-opacity hover:opacity-90"
                style={{ background: BRAND_YELLOW, color: BRAND_DARK }}>
                Fechar
              </button>
            </div>
          )}
        </div>

        {!booked && (
          <div className="p-4 flex-shrink-0" style={{ background: BRAND_CARD, borderTop: `1px solid ${BRAND_BORDER}` }}>
            {step === 0 && (
              <button onClick={() => selectedService && setStep(1)} disabled={!selectedService}
                className="w-full rounded-xl py-3.5 font-bold text-sm tracking-widest uppercase"
                style={{ background: selectedService ? BRAND_YELLOW : "#333", color: selectedService ? BRAND_DARK : "#666", cursor: selectedService ? "pointer" : "not-allowed" }}>
                PROSSEGUIR
              </button>
            )}
            {step === 1 && (
              <button onClick={() => selectedDate && selectedTime && setStep(2)} disabled={!selectedDate || !selectedTime}
                className="w-full rounded-xl py-3.5 font-bold text-sm tracking-widest uppercase"
                style={{ background: selectedDate && selectedTime ? BRAND_YELLOW : "#333", color: selectedDate && selectedTime ? BRAND_DARK : "#666", cursor: selectedDate && selectedTime ? "pointer" : "not-allowed" }}>
                PROSSEGUIR
              </button>
            )}
            {step === 2 && (
              <button onClick={() => nome && sobrenome && phone.length >= 10 && setStep(3)} disabled={!nome || !sobrenome || phone.length < 10}
                className="w-full rounded-xl py-3.5 font-bold text-sm tracking-widest uppercase"
                style={{ background: nome && sobrenome && phone.length >= 10 ? BRAND_YELLOW : "#333", color: nome && sobrenome && phone.length >= 10 ? BRAND_DARK : "#666", cursor: nome && sobrenome && phone.length >= 10 ? "pointer" : "not-allowed" }}>
                PROSSEGUIR
              </button>
            )}
            {step === 3 && (
              <button onClick={handleConfirm} disabled={loading}
                className="w-full rounded-xl py-3.5 font-bold text-sm tracking-widest uppercase"
                style={{ background: BRAND_YELLOW, color: BRAND_DARK, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
                {loading ? "AGENDANDO..." : "CONFIRMAR AGENDAMENTO"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}