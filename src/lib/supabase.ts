
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://pzsqoumcgremholumfnl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6c3FvdW1jZ3JlbWhvbHVtZm5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3ODE0NDAsImV4cCI6MjAyNjM1NzQ0MH0.bvJOInStlnKtTaYrM_RCMlutXpYCKT1LqsCL1KXLT1E',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storageKey: 'auth-storage',
      storage: window.localStorage
    },
    global: {
      headers: {
        'X-Client-Info': 'supabase-js-web',
        'Content-Type': 'application/json',
      },
    },
    db: {
      schema: 'public'
    }
  }
)

// Listen for auth state changes instead of using the deprecated onError
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    console.log('User signed out')
  } else if (event === 'SIGNED_IN') {
    console.log('User signed in:', session?.user?.email)
  } else if (event === 'USER_UPDATED') {
    console.log('User updated:', session?.user?.email)
  }
})
