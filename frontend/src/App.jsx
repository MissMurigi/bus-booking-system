import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Theme from './components/theme/Theme';

function App() {
  return (
    <div>
      <Theme /> 
      <nav>
        <Navbar />
      </nav>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;