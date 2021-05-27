import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import postRequest from '../../server-connections/postRequest'
import helpers from './login.component.helper'
import './login.component.css'


export default function Login() {
  const [userEmail, setEmail] = useState('')
  const [userPassword, setPassword] = useState('')

  function login() {
    var json =
    {
      email: userEmail,
      password: userPassword
    }
    helpers.authentication(json);
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
        <Button className='login-button'>
          <p style={{ fontWeight: 'Bold' }}>Log In</p>
        </Button>
      </div>
    </div>
  )
}
