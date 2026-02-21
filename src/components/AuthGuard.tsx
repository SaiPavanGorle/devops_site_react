import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { authStorage } from '../lib/storage'

const AuthGuard = () => {
  const location = useLocation()
  const token = authStorage.getToken()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default AuthGuard
