import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { login } from '../lib/auth'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (values: LoginFormValues) => {
    setApiError(null)

    try {
      await login(values)
      const redirectTo = location.state?.from?.pathname ?? '/dashboard'
      navigate(redirectTo, { replace: true })
    } catch {
      setApiError('Login failed. Please verify your credentials and try again.')
    }
  }

  return (
    <div className="auth-layout">
      <form className="card form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>Login</h1>

        <label>
          Email
          <input type="email" {...register('email')} placeholder="you@company.com" />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </label>

        <label>
          Password
          <input type="password" {...register('password')} placeholder="••••••••" />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </label>

        {apiError && <p className="error">{apiError}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <p>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
