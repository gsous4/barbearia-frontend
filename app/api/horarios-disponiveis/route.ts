import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const barbeiro_id = searchParams.get('barbeiro_id')
  const data = searchParams.get('data')
  const duracao = searchParams.get('duracao')

  if (!barbeiro_id || !data || !duracao) {
    return NextResponse.json({ erro: 'barbeiro_id, data e duracao são obrigatórios' }, { status: 400 })
  }

  const inicio = 9
  const fim = 20
  const duracaoMinutos = parseInt(duracao)

  const { data: agendamentosDoDia, error } = await supabase
    .from('agendamentos')
    .select('data_hora, servicos(duracao_minutos)')
    .eq('barbeiro_id', barbeiro_id)
    .gte('data_hora', `${data}T00:00:00`)
    .lte('data_hora', `${data}T23:59:59`)
    .neq('status', 'cancelado')

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })

  const horariosOcupados = agendamentosDoDia.map((a: any) => ({
    inicio: new Date(a.data_hora),
    fim: new Date(new Date(a.data_hora).getTime() + a.servicos.duracao_minutos * 60000)
  }))

  const horariosDisponiveis: string[] = []
  const dataBase = new Date(`${data}T00:00:00`)

  for (let hora = inicio * 60; hora + duracaoMinutos <= fim * 60; hora += 5) {
    const slotInicio = new Date(dataBase.getTime() + hora * 60000)
    const slotFim = new Date(slotInicio.getTime() + duracaoMinutos * 60000)

    const ocupado = horariosOcupados.some((ag: any) =>
      slotInicio < ag.fim && slotFim > ag.inicio
    )

    if (!ocupado) {
      const horas = String(slotInicio.getHours()).padStart(2, '0')
      const minutos = String(slotInicio.getMinutes()).padStart(2, '0')
      horariosDisponiveis.push(`${horas}:${minutos}`)
    }
  }

  return NextResponse.json({ data, horariosDisponiveis })
}