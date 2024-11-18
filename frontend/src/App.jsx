import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/Routes';
import './assets/styles/global.css';

function App() {
    return (
        <Router>
            <Routes />
        </Router>
    );
}

export default App;
