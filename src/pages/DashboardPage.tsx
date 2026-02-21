import { useMemo } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { authStorage } from '../lib/storage'

const allCards = [
  'Developer Dashboard',
  'DevOps Dashboard',
  'Tester Dashboard',
  'Manager Dashboard',
  'BA Dashboard',
]

const DashboardPage = () => {
  const navigate = useNavigate()

  const user = useMemo(() => authStorage.getUser(), [])

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const handleLogout = () => {
    authStorage.clearAll()
    navigate('/login', { replace: true })
  }

  return (
    <main className="dashboard-layout">
      <header className="card dashboard-header">
        <div>
          <h1>DevOps Release Portal</h1>
          <p>
            Logged in as <strong>{user.name}</strong> ({user.role})
          </p>
        </div>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section className="card-grid">
        {allCards.map((title) => (
          <article className="card" key={title}>
            <h2>{title}</h2>
            <p>Placeholder content for {title.toLowerCase()}.</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default DashboardPage
