import React, {useState} from "react";
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom'

import {axiosWithAuth} from '../utils/axiosWithAuth'

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const initialLogin = {
    username: '',
    password: '',
  }
  const [login, setLogin] = useState(initialLogin)
  const [isLoading, setIsLoading] = useState(false)
  let history = useHistory()
  const inputHandler = (e) => {
  setLogin({...login, [e.target.name]: e.target.value})
  }
  const submitHandler = (e) => {
  e.preventDefault()
  setIsLoading(true)
  axiosWithAuth()
      .post('/api/login', login)
      .then(response => {
          window.localStorage.setItem('token', response.data.payload)
          history.push('./protected')
          setLogin(initialLogin)
          setIsLoading(false)
      })
      .catch(error => {
          debugger
          console.log(error)
          setIsLoading(false)
      })
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={submitHandler}>
        <TextField
            label='Username'
            variant="outlined"
            name='username'
            value={login.username}
            onChange={inputHandler}
            type='text'
        />
        <TextField
            label='Password'
            variant="outlined"
            name='password'
            value={login.password}
            onChange={inputHandler}
            type='password'
        />
        {isLoading ? <CircularProgress /> : ''}
        <Button type='submit' >
            Login
        </Button>
      </form>
    </>
  );
};

export default Login;
