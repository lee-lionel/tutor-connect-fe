import React from "react";
import { useState } from "react";
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
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (userInput.phoneNumber.length !== 8) {
      return alert('Enter an 8 digit phone number')
    }
    if (userInput.password.length < 5) {
      return alert('Password must be at least 5 characters')
    }
    try {
        const user = await userApi.signUp(userInput)
        setUser(user)
    } catch(error){
        alert(error.message)
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
      <button className="auth-page-button">Sign Up</button>
    </form>
  );
};

export default SignUp;
