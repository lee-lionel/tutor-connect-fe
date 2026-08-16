import React from 'react'
import Login from '../../components/Login/Login'
import SignUp from '../../components/SignUp/SignUp'
import { useState } from 'react'
import './AuthPage.css'

const AuthPage = (props) => {
    const {setUser} = props
    const [choice,setChoice] = useState(true)
  return (
    <div className="auth-page">
      <div className="auth-card">
        <header className="auth-brand">
          <span className="auth-brand-mark">TC</span>
          <h1 className="auth-brand-name">Tutors Connect</h1>
          <p className="auth-brand-sub">
            {choice ? 'Sign in to your account' : 'Create your account'}
          </p>
        </header>

        <div className="login-signup">
          {choice ? <Login setUser={setUser}/> : <SignUp setUser={setUser}/>}
        </div>

        <p className="auth-switch">
          {choice ? "Don't have an account?" : 'Already have an account?'}
          <span className="toggle-text" onClick={() => setChoice(!choice)}>
            {choice ? 'Sign Up Instead' : 'Sign In Instead'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default AuthPage
