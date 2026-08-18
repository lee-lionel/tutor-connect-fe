import React, { useEffect, useRef, useState } from "react";
import * as userApi from '../../utilities/users-service'


const SignUp = (props) => {
  const {setUser} = props

  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'tutor',
  })
  const [pending, setPending] = useState(false)
  const [slow, setSlow] = useState(false)
  const [error, setError] = useState('')
  const slowTimer = useRef(null)

  useEffect(() => () => clearTimeout(slowTimer.current), [])

  function handleChange(e) {
    const inputValue = e.target.value
    if (e.target.name === 'phoneNumber') {
        // Digits only, max 8 — the schema requires exactly 8 characters, and
        // type="number" would otherwise let through 'e', '+' and '-'.
        const digits = inputValue.replace(/\D/g, '').slice(0, 8);
        setUserInput({ ...userInput, phoneNumber: digits });
    } else {
    setUserInput({ ...userInput, [e.target.name]: inputValue });
    }
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (pending) return

    /* Inline, not alert(): a modal dialog blocks the page and loses the
       field it is complaining about. */
    if (userInput.phoneNumber.length !== 8) {
      return setError('Enter an 8 digit phone number')
    }
    if (userInput.password.length < 5) {
      return setError('Password must be at least 5 characters')
    }

    setPending(true)
    setError('')
    slowTimer.current = setTimeout(() => setSlow(true), 2500)

    try {
        const user = await userApi.signUp(userInput)
        setUser(user)
    } catch(err){
        setError(err.message || 'Could not create the account. Please try again.')
    } finally {
        clearTimeout(slowTimer.current)
        setSlow(false)
        setPending(false)
    }
  }
  
  return (
    
    <form className='signup-form' onSubmit={handleSubmit}>
      <div className="input-group">
      <label>
        Name :<input name='name' type="text" onChange={handleChange}></input>
      </label>
      </div>
      <div className="input-group">
      <label>
        Email :<input name='email' type="email" onChange={handleChange}></input>
      </label>
      </div>
      <div className="input-group">
      <label>
        Password :<input name='password' type="password" onChange={handleChange}></input>
      </label>
      </div>
      <div className="input-group">
      <label>
        Phone No : +65
        <input
          name="phoneNumber"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="8 digits"
          value={userInput.phoneNumber}
          onChange={handleChange}
          required
        ></input>
      </label>
      </div>
      <div className="input-group">
      <label>
        You are a :
        <select name='role' onChange={handleChange}>
          <option>tutor</option>
          <option>parent</option>
        </select>
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
        {pending ? 'Creating account…' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignUp;
