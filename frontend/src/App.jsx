import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Theme from './components/theme/Theme'; // Import the Theme component

function App() {
  return (
    <div>
      <Theme /> {/* Theme toggle button */}
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
