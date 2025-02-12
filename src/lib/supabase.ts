
import { createClient } from '@supabase/supabase-js'

// The Supabase client is automatically configured by Lovable
// when you connect your Supabase project
export const supabase = createClient(
  'https://pzsqoumcgremholumfnl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6c3FvdW1jZ3JlbWhvbHVtZm5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3ODE0NDAsImV4cCI6MjAyNjM1NzQ0MH0.bvJOInStlnKtTaYrM_RCMlutXpYCKT1LqsCL1KXLT1E'
)
