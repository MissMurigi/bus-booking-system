import Home from './pages/Home';
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import BusDetails from './pages/BusDetails';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactUs from './pages/ContactUs';
import TermOfService from './pages/TermsOfService';
import SIgnup from './pages/Signup'
import PaymentMethod from './pages/PaymentMethod';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import DriverDashboard from './pages/DriverDashboard';




const routes = [
    {
        path: '/',
        component: <Home />,
        errorElement: <NotFound />,

        children: [
          { path: "/", element: <Home /> },
          { path: "/login", element: <Login /> },
          { path: "/booking", element: <CustomerDashboard/> },
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/busdetails", element: <BusDetails /> },
          { path: "/privacypolicy", element: <PrivacyPolicy /> },
          { path: "/contactus", element: <ContactUs /> },
          { path: "/termsofservice", element: <TermOfService /> },
          { path: "/signup", element: <SIgnup /> },
          { path: "/payment-method", element: <PaymentMethod /> },
          { path: "/admin-dashboard", element: <AdminDashboard />  },
          { path: "/customer-dashboard", element: <CustomerDashboard /> },
          { path: "/driver-dashboard", element: <DriverDashboard />  }
          
          


        ]

    },
       
];

export default routes;




















































