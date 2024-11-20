import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

function Sighup() {
  return (
    <div className='signup'>
      <h1>Sign Up</h1>
      <form>
        <h1>Create an New Account </h1>
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
          <button type='submit' className='signup-button'>
            Sign Up
            
          </button>
          <div>
            <p>Already have an account? </p>
            <Link to='/login'>Login</Link>

          </div>

      </form>
      <>Sign-up page</>

    </div>
  )
}

export default Sighup;
