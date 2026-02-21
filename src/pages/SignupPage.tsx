import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { signup } from '../lib/auth'
import { ROLES } from '../types'

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password is too long'),
  role: z.enum(ROLES, { message: 'Role is required' }),
})

type SignupFormValues = z.infer<typeof signupSchema>

const SignupPage = () => {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: 'Developer',
    },
  })

  const onSubmit = async (values: SignupFormValues) => {
    setApiError(null)

    try {
      await signup(values)
      navigate('/dashboard', { replace: true })
    } catch {
      setApiError('Signup failed. Please check your details and try again.')
    }
  }

  return (
    <div className="auth-layout">
      <form className="card form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>Create account</h1>

        <label>
          Name
          <input type="text" {...register('name')} placeholder="Jane Doe" />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </label>

        <label>
          Email
          <input type="email" {...register('email')} placeholder="you@company.com" />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </label>

        <label>
          Password
          <input type="password" {...register('password')} placeholder="Create a secure password" />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </label>

        <label>
          Role
          <select {...register('role')}>
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && <span className="error">{errors.role.message}</span>}
        </label>

        {apiError && <p className="error">{apiError}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Sign up'}
        </button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default SignupPage
