import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from('barbeiros')
    .select('*')

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })
  return NextResponse.json(data)
}