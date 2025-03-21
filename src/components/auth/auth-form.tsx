
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"

export function AuthForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      })
      return
    }
    
    setIsLoading(true)
    console.log('Starting authentication process...')

    try {
      if (isSignUp) {
        console.log('Attempting signup...')
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          }
        })
        
        console.log('Signup response:', { data, error })
        
        if (error) {
          throw error
        }
        
        if (data?.user) {
          toast({
            title: "Success",
            description: "Please check your email to verify your account",
          })
        }
      } else {
        console.log('Attempting signin...')
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        console.log('Signin response:', { data, error })
        
        if (error) {
          throw error
        }

        if (data.session) {
          toast({
            title: "Success",
            description: "You have been logged in successfully",
          })
        }
      }
    } catch (error: any) {
      console.error('Detailed authentication error:', error)
      
      let errorMessage = "An unexpected error occurred. Please try again."
      
      if (error.message.includes('Failed to fetch') || error.message.includes('network')) {
        errorMessage = "Unable to connect to the authentication service. Please check your internet connection and try again. If the problem persists, the service might be temporarily unavailable."
      } else if (error.message) {
        errorMessage = error.message
      }
      
      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-sm space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{isSignUp ? "Create an account" : "Welcome back"}</h1>
        <p className="text-gray-500">
          {isSignUp
            ? "Enter your email to create your account"
            : "Enter your email to sign in to your account"}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : isSignUp ? "Create account" : "Sign in"}
        </Button>
      </form>
      <div className="text-center">
        <Button
          variant="link"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm"
        >
          {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
        </Button>
      </div>
    </div>
  )
}
