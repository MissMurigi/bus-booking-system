import React from 'react'

function BookingForm() {
  return (
    <div>
      <h1> Book a seat</h1>
      <form>
        <div>
          <label>Name</label>
          <input
            type='text'
            value={name}
            required />
        </div>
        <div>
          <label>Email</label>
          <input
            type='email'
            value={email}
            required />
        </div>
        <div>
          <label>Seats</label>



        </div>
        <button>
          Book Now!
        </button>

      </form>

    </div>
  )
}

export default BookingForm
