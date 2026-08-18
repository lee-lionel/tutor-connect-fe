import React, { useEffect, useRef, useState } from "react";
import * as userApi from '../../utilities/users-service'

const Login = (props) => {
    const {setUser} = props
    const [userInput, setUserInput] = useState({
        input: '',
        password: '',
    })
    const [pending, setPending] = useState(false)
    const [slow, setSlow] = useState(false)
    const [error, setError] = useState('')
    const slowTimer = useRef(null)

    useEffect(() => () => clearTimeout(slowTimer.current), [])

    function handleChange(e) {
        setUserInput({...userInput, [e.target.name]: e.target.value})
        setError('')
    }

    async function handleSubmit (e) {
        e.preventDefault()
        if (pending) return

        setPending(true)
        setError('')
        /* The API sleeps on a free instance and can take twenty seconds to
           wake. Say so rather than leaving a dead button. */
        slowTimer.current = setTimeout(() => setSlow(true), 2500)

        try {
            const user = await userApi.login(userInput)
            setUser(user)
        } catch(err){
            setError(err.message || 'Could not sign in. Please try again.')
        } finally {
            clearTimeout(slowTimer.current)
            setSlow(false)
            setPending(false)
        }
    }
  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <div className="input-group">
      <label>
        Email/Phone Number :
        <input name='input' type="text" onChange={handleChange}></input>
      </label>
      </div>
      <div className="input-group">
      <label>
        Password :
        <input name='password' type="password" onChange={handleChange}></input>
      </label>
      </div>
      {error && <p className="auth-error" role="alert">{error}</p>}

      {slow && (
        <p className="auth-waking" role="status">
          Waking the server — it sleeps when nobody's using it. This can take
          up to half a minute the first time.
        </p>
      )}

      <button className="auth-page-button" disabled={pending}>
        {pending ? 'Signing in…' : 'Login'}
      </button>
    </form>
  );
};

export default Login;
