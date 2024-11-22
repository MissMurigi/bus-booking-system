import React, { useState, useEffect } from "react";
import { getSchedules, createSchedule, updateSchedule, deleteSchedule } from "../api/ScheduleApi";
import { getBuses } from "../api/BusApi";
import { FiEdit, FiTrash } from "react-icons/fi";
import { toast } from "react-toastify";

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [buses, setBuses] = useState([]);
  const [form, setForm] = useState({
    bus_id: "",
    departure_time: "",
    arrival_time: "",
    date: "",
    status: "scheduled",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schedulesData, busesData] = await Promise.all([getSchedules(), getBuses()]);
        setSchedules(schedulesData);
        setBuses(busesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data. Please try again.");
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'departure_time' || name === 'arrival_time' || name === 'date') {
      setForm(prevForm => ({
        ...prevForm,
        [name]: value // Store the raw value from the input
      }));
    } else {
      setForm(prevForm => ({ ...prevForm, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (form.schedule_id) {
        await updateSchedule(form.schedule_id, form);
        toast.success("Schedule updated successfully!");
      } else {
        await createSchedule(form);
        toast.success("Schedule created successfully!");
      }
      const updatedSchedules = await getSchedules();
      setSchedules(updatedSchedules);
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to save schedule. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      try {
        await deleteSchedule(id);
        const updatedSchedules = await getSchedules();
        setSchedules(updatedSchedules);
        toast.success("Schedule deleted successfully!");
      } catch (error) {
        console.error("Error deleting schedule:", error);
        toast.error("Failed to delete schedule. Please try again.");
      }
    }
  };

  const resetForm = () => {
    setForm({
      bus_id: "",
      departure_time: "",
      arrival_time: "",
      date: "",
      status: "scheduled",
    });
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return '';
    return dateTime.slice(0, 16); // This will work for both date and datetime-local inputs
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Bus Schedule Management</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Bus</label>
          <select
            name="bus_id"
            value={form.bus_id}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="" disabled>Select a bus</option>
            {buses.map((bus) => (
              <option key={bus.bus_id} value={bus.bus_id}>
                {bus.name || `Bus ID: ${bus.bus_id}`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Departure Time</label>
          <input
            type="datetime-local"
            name="departure_time"
            value={form.departure_time ? formatDateTime(form.departure_time) : ''}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Arrival Time</label>
          <input
            type="datetime-local"
            name="arrival_time"
            value={form.arrival_time ? formatDateTime(form.arrival_time) : ''}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? "Saving..." : (form.schedule_id ? "Update Schedule" : "Add Schedule")}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-8 mb-4">Scheduled Buses</h2>
      <ul className="space-y-4">
        {schedules.map((schedule) => (
          <li
            key={schedule.schedule_id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <div>
              <p className="font-medium">
                Bus ID: {schedule.bus_id} - {schedule.date}
              </p>
              <p className="text-sm text-gray-600">
                {new Date(schedule.departure_time).toLocaleString()} to {new Date(schedule.arrival_time).toLocaleString()}
              </p>
              <span
                className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                  schedule.status === "scheduled"
                    ? "bg-blue-200 text-blue-800"
                    : schedule.status === "completed"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {schedule.status}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setForm(schedule)}
                className="text-blue-600 hover:text-blue-800"
              >
                <FiEdit size={18} />
              </button>
              <button
                onClick={() => handleDelete(schedule.schedule_id)}
                className="text-red-600 hover:text-red-800"
              >
                <FiTrash size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;

