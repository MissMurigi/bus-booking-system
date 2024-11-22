import App from "/src/App.jsx";
import Home from "/src/pages/Home.jsx";
import Register from "/src/pages/Register.jsx";
import Login from "/src/pages/Login.jsx";
import AdminDash from "/src/pages/AdminDashboard.jsx";
import CustomerDash from "/src/pages/CustomerDashboard.jsx";
import ManageBuses from "/src/pages/ManageBuses.jsx";
import Buses from "/src/pages/Buses.jsx";
import Booking from "/src/pages/Booking.jsx"
import ManageBooking from "/src/pages/ManageBooking.jsx"
import AvailableRoutes from "/src/pages/AvailableRoutes.jsx"
import Shedule from "/src/pages/Shedule.jsx"


const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/admin", element: <AdminDash /> },
      { path: "/customer", element: <CustomerDash /> },
      { path: "/driver/manage-buses", element: <ManageBuses /> },
      { path: "/buses", element: <Buses /> },
      { path: "/customer/book-travel", element: <Booking /> },
      { path: "/customer/manage-bookings", element: <ManageBooking /> },
      { path: "/customer/view-routes", element: <AvailableRoutes /> },
      { path: "/driver/schedule", element: <Shedule /> },
      { path: "admin/buses-schedules", element: <Shedule /> },
      { path: "/admin/users", element: <AdminDash /> },
      
      
      
    ],
  },
];

export default routes;

