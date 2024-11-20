import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
  return (
    <div className='login'>
      <div className="login-container">
        <h1> Login</h1>
        <form>
          <div className="div">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" placeholder='username'required />
            
          </div>

          <div className='email'> 
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder='email' required/>
          </div>

          <div className='password'>
            <label for="password">password:</label>
            <input type="password" id="password" name="password" placeholder='password' required/>

          </div>
          <button type='submit' className='login-button'>
            Login
          </button>

          <div className='signup-link'>
            <p>Don't have an account?</p>
            <Link to='/signup'>Sign up here</Link>
          </div>



          

        </form>





      </div>
    </div>
  )
}

export default Login
