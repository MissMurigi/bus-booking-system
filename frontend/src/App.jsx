<<<<<<< HEAD
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Theme from './components/theme/Theme'; // Import the Theme component
=======
// app.jsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
>>>>>>> fa02b3b87fea02f4f85551df4ce6393efec563eb

function App() {
  const [count, setCount] = useState(0);

  return (
<<<<<<< HEAD
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
=======
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
>>>>>>> fa02b3b87fea02f4f85551df4ce6393efec563eb
  );
}

export default App;
