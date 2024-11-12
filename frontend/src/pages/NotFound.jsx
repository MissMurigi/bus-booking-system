import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className='not-found-container'>
      <>Not Found Page</>
      <h1 className='not-found-header'>404</h1>
      <p className='not-found-message'> Ooops! Page not found</p>
      <Link to="/" className='not-found-link'>Go back to Home</Link>

    </div>
  )
}

export default NotFound
