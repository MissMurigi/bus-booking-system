import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { AuthProvider } from './context/AuthContext';

import routes from './routes';

// Set axios default baseURL based on the environment
const isDev = import.meta.env.MODE === 'development';
axios.defaults.baseURL = isDev 
  ? import.meta.env.VITE_API_BASE_URL_DEV 
  : import.meta.env.VITE_API_BASE_URL_PROD;

// Create the router using createBrowserRouter
const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </AuthProvider>
  </StrictMode>,
);


