
import { AuthForm } from "@/components/auth/auth-form"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { supabase } from "@/lib/supabase"

const Auth = () => {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/')
      }
    })
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthForm />
    </div>
  )
}

export default Auth
