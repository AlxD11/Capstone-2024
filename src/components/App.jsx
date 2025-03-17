// src/App.js
import React, { createContext, useState, useEffect } from 'react';
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
import { AuthProvider } from '../contexts/AuthContext';
import Reports from './Reports.jsx'

export const ThemeContext = createContext(null)

function App() {
  const [theme, setTheme] = useState("light")
  useEffect(() => {
    const storedPreference = localStorage.getItem('darkMode');
    if (storedPreference === 'true') {
      setTheme('dark');
    } else if (storedPreference === 'false') {
      setTheme('light');
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      }
    }
  }, []);
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="a" id={theme}>
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
              <Route path="/Reports" element={
                <PrivateRoute>
                  <Reports />
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
              <Route path="/medications" element={
                <PrivateRoute>
                  <MedicationsPage />
                </PrivateRoute>
              }
              ></Route>
            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
