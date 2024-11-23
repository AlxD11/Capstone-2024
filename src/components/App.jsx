// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import CreateAccount from './CreateAccount';
import ResetPassword from './ResetPassword';
import MainScreen from './MainScreen';
import MoodPollScreen from './MoodPollScreen';
import MoodJournal from './MoodJournal';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from '../contexts/AuthContext';

function App() {
  return (  
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/main-screen"
            element={
              <PrivateRoute>
                <MainScreen />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/poll-screen" element={
            <PrivateRoute>
              <MoodPollScreen />
            </PrivateRoute>
            }
          ></Route>
          <Route path="/mood-journal" element={
            <PrivateRoute>
              <MoodJournal />
            </PrivateRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </AuthProvider>
    
  );
}

export default App;
