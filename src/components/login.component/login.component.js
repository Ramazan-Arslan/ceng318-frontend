import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import helpers from './login.component.helper'
import './login.component.css'


export default function Login() {
  const [userEmail, setEmail] = useState('')
  const [userPassword, setPassword] = useState('')

  async function login() {
    var json =
    {
      userData:
      {
        email: userEmail,
        password: userPassword
      }

    }
    const obj = await helpers.authentication(json);
    if(Boolean(obj.accessToken))
    {
      localStorage.setItem("userName",obj.userData.fullName);
      localStorage.setItem("token",obj.accessToken);

      window.history.pushState(null, "Dentist Appointment App", "/calendar")
      window.location.reload(true);
    }
  }

  return (
    <div className='login'>
      <div className='input-header'>
        <p className='login-text'>Welcome to the CENG 318</p>
      </div>
      <div className='input-items'>
        <TextField
          id='email'
          placeholder='Email'
          variant='filled'
          className='inputbox email'
          onChange={(event) => {
            setEmail(event.target.value)
          }}
        />
        <TextField
          id='password'
          placeholder='Password'
          type='password'
          security='true'
          variant='filled'
          className='inputbox password'
          onChange={(event) => {
            setPassword(event.target.value)
          }}
        />
        <Button className='login-button' onClick={login}>
          <p style={{ fontWeight: 'Bold' }}>Log In</p>
        </Button>
      </div>
    </div>
  )
}
