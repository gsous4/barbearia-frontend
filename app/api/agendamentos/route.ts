import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

export async function POST(request: Request) {
  const body = await request.json()

  const {
    barbeiro_id,
    servico_id,
    cliente_nome,
    cliente_telefone,
    data_hora,
    comentario
  } = body

  // Validação dos campos obrigatórios
  if (
    !barbeiro_id ||
    !servico_id ||
    !cliente_nome ||
    !cliente_telefone ||
    !data_hora
  ) {
    return NextResponse.json(
      { erro: 'Todos os campos são obrigatórios' },
      { status: 400 }
    )
  }

  // Verifica se já existe agendamento nesse horário
  const { data: agendamentoExistente } = await supabase
    .from('agendamentos')
    .select('id')
    .eq('barbeiro_id', barbeiro_id)
    .eq('data_hora', data_hora)
    .neq('status', 'cancelado')
    .single()

  if (agendamentoExistente) {
    return NextResponse.json(
      { erro: 'Esse horário já está ocupado' },
      { status: 409 }
    )
  }

  // Busca dados do serviço
  const { data: servico } = await supabase
    .from('servicos')
    .select('nome, preco')
    .eq('id', servico_id)
    .single()

  // Busca dados do barbeiro
  const { data: barbeiro } = await supabase
    .from('barbeiros')
    .select('nome')
    .eq('id', barbeiro_id)
    .single()

  // Cria agendamento
  const { data, error } = await supabase
    .from('agendamentos')
    .insert([
      {
        barbeiro_id,
        servico_id,
        cliente_nome,
        cliente_telefone,
        data_hora,
        comentario
      }
    ])
    .select()

  // Tratamento de erro
  if (error) {
    return NextResponse.json(
      { erro: error.message },
      { status: 500 }
    )
  }

  // Formata data
  const dataFormatada = new Date(data_hora).toLocaleString('pt-BR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Cuiaba'
  })

  // Mensagem WhatsApp
  const mensagemBarbeiro = `
🔔 *Novo Agendamento!*

👤 Cliente: ${cliente_nome}
📱 Telefone: ${cliente_telefone}
✂️ Serviço: ${servico?.nome}
💰 Valor: R$ ${servico?.preco}
📅 Data: ${dataFormatada}
💈 Barbeiro: ${barbeiro?.nome}
${comentario ? `💬 Obs: ${comentario}` : ''}

Para confirmar, responda esta mensagem!
`

  // Número do barbeiro
  const numeroBarbeiro = '5561993594562'

  // Link do WhatsApp
  const linkWhatsapp = `https://wa.me/${numeroBarbeiro}?text=${encodeURIComponent(
    mensagemBarbeiro
  )}`

  // Retorno
  return NextResponse.json(
    {
      agendamento: data[0],
      whatsapp: linkWhatsapp
    },
    { status: 201 }
  )
}