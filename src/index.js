import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {message } from 'antd'
message.config({
    top: 100,
    style: {
        marginTop: '20vh',
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
