import axios from 'axios';

const API_URL = 'https://bus-booking-phi.vercel.app';

export const fetchBookings = async () => {
  const response = await axios.get(`${API_URL}/booking`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await axios.post(`${API_URL}/booking`, bookingData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const updateBooking = async (bookingId, bookingData) => {
  const response = await axios.put(`${API_URL}/booking/${bookingId}`, bookingData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const deleteBooking = async (bookingId) => {
  await axios.delete(`${API_URL}/booking/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};


