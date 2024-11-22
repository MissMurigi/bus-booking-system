import axios from 'axios';

// Base URL for the API
const BASE_URL = 'https://bus-booking-phi.vercel.app/buses'; 

// Get all buses
export const getBuses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data; // Returns an array of bus objects
  } catch (error) {
    console.error('Error fetching buses:', error);
    throw error;
  }
};

// Get a specific bus by ID
export const getBusById = async (bus_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${bus_id}`);
    return response.data; // Returns a single bus object
  } catch (error) {
    console.error(`Error fetching bus with ID ${bus_id}:`, error);
    throw error;
  }
};

// Create a new bus (Optional, if needed)
export const createBus = async (bus) => {
  try {
    const response = await axios.post(BASE_URL, bus);
    return response.data;
  } catch (error) {
    console.error('Error creating bus:', error);
    throw error;
  }
};

// Update a bus by ID (Optional, if needed)
export const updateBus = async (bus_id, bus) => {
  try {
    const response = await axios.put(`${BASE_URL}/${bus_id}`, bus);
    return response.data;
  } catch (error) {
    console.error(`Error updating bus with ID ${bus_id}:`, error);
    throw error;
  }
};

// Delete a bus by ID (Optional, if needed)
export const deleteBus = async (bus_id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${bus_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting bus with ID ${bus_id}:`, error);
    throw error;
  }
};

