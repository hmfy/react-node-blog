import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import {message } from 'antd'
message.config({
    top: 100,
    style: {
        marginTop: '20vh',
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <Router basename={'/blog'}>
            <App />
        </Router>
    // </React.StrictMode>
);
