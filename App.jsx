// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import CreateAccount from './CreateAccount';
import ResetPassword from './ResetPassword';
import MainScreen from './src/MainScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/main-screen" element={<MainScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
