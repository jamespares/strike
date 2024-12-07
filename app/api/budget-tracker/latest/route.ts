import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    // Initialize Supabase client
    const supabase = createRouteHandlerClient({ cookies })

    // Check authentication
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    if (authError || !session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get the latest budget tracker
    const { data: asset, error: assetError } = await supabase
      .from('user_assets')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('asset_type', 'budget_tracker')
      .eq('status', 'completed')
      .order('last_updated', { ascending: false })
      .limit(1)
      .single()

    if (assetError) {
      return NextResponse.json({ error: 'Budget tracker not found' }, { status: 404 })
    }

    return NextResponse.json(asset)
  } catch (error: any) {
    console.error('Error fetching budget tracker:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch budget tracker' },
      { status: 500 }
    )
  }
} 