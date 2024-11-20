import React from 'react';
import BusImage from './bus.jpg';

function BusCard() {
  return (
    <div>
      <h1>Bus Card</h1>
      <div className="bucard-container">
        <div className="bucard-image">
          <img
           src={BusImage} 
           alt="bus image" 
           className='busimage'/>

        </div>
        <button  >
          View Avaivable Busses
        </button>

      </div>
      
    </div>
  )
}

export default BusCard
