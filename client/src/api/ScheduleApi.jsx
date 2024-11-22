import axios from 'axios';

const API_URL = 'https://bus-booking-phi.vercel.app/schedule';

const formatDateForServer = (dateString, isDateOnly = false) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (isDateOnly) {
    return date.toISOString().split('T')[0]; // Returns only the date part
  }
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

export const getSchedules = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching schedules:", error);
    throw error;
  }
};

export const createSchedule = async (schedule) => {
  try {
    const formattedSchedule = {
      ...schedule,
      departure_time: formatDateForServer(schedule.departure_time),
      arrival_time: formatDateForServer(schedule.arrival_time),
      date: formatDateForServer(schedule.date, true), // Use true for date-only
      status: schedule.status,
    };
    console.log('Formatted schedule being sent:', formattedSchedule);
    const response = await axios.post(API_URL, formattedSchedule);
    return response.data;
  } catch (error) {
    console.error("Error creating schedule:", error);
    throw error;
  }
};

export const updateSchedule = async (id, schedule) => {
  try {
    const formattedSchedule = {
      ...schedule,
      departure_time: formatDateForServer(schedule.departure_time),
      arrival_time: formatDateForServer(schedule.arrival_time),
      date: formatDateForServer(schedule.date, true), // Use true for date-only
      status: schedule.status,
    };
    console.log('Formatted schedule being sent:', formattedSchedule);
    const response = await axios.put(`${API_URL}/${id}`, formattedSchedule);
    return response.data;
  } catch (error) {
    console.error("Error updating schedule:", error);
    throw error;
  }
};

export const deleteSchedule = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting schedule:", error);
    throw error;
  }
};


