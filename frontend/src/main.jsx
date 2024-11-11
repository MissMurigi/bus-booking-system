import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';  
import './index.css';
import routes from './routes';  


// Create the router using createBrowserRouter
const router = createBrowserRouter(routes);  

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <RouterProvider router={router} />  
  </StrictMode>
);

