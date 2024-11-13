import Home from './pages/Home';
import Login from './pages/Login';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import BusDetails from './pages/BusDetails';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactUs from './pages/ContactUs';
import TermOfService from './pages/TermsOfService';
import SIgnup from './pages/Signup'
//import PaymentMethod from './pages/PaymentMethod'; 


const routes = [
    {
        path: '/',
        component: <Home />,
        errorElement: <NotFound />,

        children: [
          { path: "/", element: <Home /> },
          { path: "/login", element: <Login /> },
          { path: "/booking", element: <Booking /> },
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/busdetails", element: <BusDetails /> },
          { path: "/privacypolicy", element: <PrivacyPolicy /> },
          { path: "/contactus", element: <ContactUs /> },
          { path: "/termsofservice", element: <TermOfService /> },
          { path: "/signup", element: <SIgnup /> },
          { path: "/payment-method", element: <PaymentMethod /> },


        ]

    },
       
]

export default routes;




















































