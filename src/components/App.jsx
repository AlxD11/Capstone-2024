// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import CreateAccount from './CreateAccount';
import ResetPassword from './ResetPassword';
import HomePage from './HomePage';
import MoodPollScreen from './MoodPollScreen';
import ApplicationSettingsPage from './ApplicationSettingsPage';
import ProfilePage from './ProfilePage';
import ProfileViewPage from './ProfileViewPage';
import MedicationsPage from './MedicationsPage';
import MoodJournal from './MoodJournal';
import PrivateRoute from './PrivateRoute';
import ProfessionalHelp from './ProfessionalHelp';
import { AuthProvider } from '../contexts/AuthContext';

function App() {
  return (  
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home"
            element={
              <PrivateRoute>
                <HomePage />
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
          <Route path="/settings" element={
            <PrivateRoute>
              <ApplicationSettingsPage />
            </PrivateRoute>
            }
          ></Route>
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfileViewPage />
            </PrivateRoute>
            }
          ></Route>
          <Route path="/edit-profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
            }
          ></Route>
          <Route path="/professional-help" element={
            <PrivateRoute>
              <ProfessionalHelp />
            </PrivateRoute>
            }
          ></Route>
          <Route path="/medications" element={
            <PrivateRoute>
              <MedicationsPage />
            </PrivateRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </AuthProvider>
    
  );
}

export default App;
