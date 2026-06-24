import { FormEvent, useState } from 'react'
import './CvPasswordGate.css'

const CV_USERNAME = 'cv'
const CV_PASSWORD = 'cv'
const AUTH_KEY = 'cv-auth'

export function isCvAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === 'true'
}

interface CvPasswordGateProps {
  children: React.ReactNode
}

function CvPasswordGate({ children }: CvPasswordGateProps) {
  const [authenticated, setAuthenticated] = useState(isCvAuthenticated)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (username === CV_USERNAME && password === CV_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      setAuthenticated(true)
      setError(false)
    } else {
      setError(true)
      setPassword('')
    }
  }

  if (authenticated) {
    return <>{children}</>
  }

  return (
    <div className="cv-gate">
      <div className="cv-gate__card">
        <h1 className="cv-gate__title">CV</h1>
        <p className="cv-gate__subtitle">Bitte Zugangsdaten eingeben</p>
        <form className="cv-gate__form" onSubmit={handleSubmit}>
          <label className="cv-gate__field">
            <span>Benutzername</span>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError(false)
              }}
              autoComplete="username"
              autoFocus
            />
          </label>
          <label className="cv-gate__field">
            <span>Passwort</span>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              autoComplete="current-password"
            />
          </label>
          {error && (
            <p className="cv-gate__error" role="alert">
              Benutzername oder Passwort ist falsch.
            </p>
          )}
          <button type="submit" className="cv-gate__submit">
            Anmelden
          </button>
        </form>
      </div>
    </div>
  )
}

export default CvPasswordGate
