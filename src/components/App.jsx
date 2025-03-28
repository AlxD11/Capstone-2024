// src/App.js
import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import CreateAccount from './CreateAccount';
import ResetPassword from './ResetPassword';
import HomePage from './HomePage';
import MoodPollScreen from './MoodPollScreen';
import ApplicationSettingsPage from './ApplicationSettingsPage';
import ProfilePage from './ProfilePage';
import ProfileViewPage from './ProfileViewPage';
import MedicationsPage from './MedicationsPage';
import ProfessionalHelp from './ProfessionalHelp';
import MoodJournal from './MoodJournal';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from '../contexts/AuthContext';
import Reports from './Reports.jsx';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const ThemeContext = createContext(null);

function App() {
    const [theme, setTheme] = useState("light");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDocRef = doc(db, "user_info", user.uid, "Data", "Preferences");
                    const docSnap = await getDoc(userDocRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        if (data && data.dark_mode !== undefined) {
                            setTheme(data.dark_mode ? "dark" : "light");
                            setLoading(false);
                            return;
                        }
                    }
                } catch (error) {
                    console.error("Error fetching dark mode preference:", error);
                }

                const storedPreference = localStorage.getItem('darkMode');
                if (storedPreference === 'true' || storedPreference === 'false') {
                    setTheme(storedPreference === 'true' ? 'dark' : 'light');
                    setLoading(false);
                    return;
                }

                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    setTheme('dark');
                } else {
                    setTheme('light');
                }
                setLoading(false);

            } else {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    setTheme("dark");
                } else {
                    setTheme("light");
                }
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const toggleTheme = async () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);

        if (auth.currentUser) {
            try {
                const userDocRef = doc(db, "user_info", auth.currentUser.uid, "Data", "Preferences");
                await setDoc(userDocRef, { dark_mode: newTheme === "dark" }, { merge: true });
                localStorage.setItem('darkMode', newTheme === "dark");
            } catch (error) {
                console.error("Error updating dark mode preference:", error);
            }
        } else {
            localStorage.setItem('darkMode', newTheme === "dark");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
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
                            <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                            <Route path="/poll-screen" element={<PrivateRoute><MoodPollScreen /></PrivateRoute>} />
                            <Route path="/Reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
                            <Route path="/mood-journal" element={<PrivateRoute><MoodJournal /></PrivateRoute>} />
                            <Route path="/settings" element={<PrivateRoute><ApplicationSettingsPage /></PrivateRoute>} />
                            <Route path="/profile" element={<PrivateRoute><ProfileViewPage /></PrivateRoute>} />
                            <Route path="/edit-profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                            <Route path="/professional-help" element={<PrivateRoute><ProfessionalHelp /></PrivateRoute>} />
                            <Route path="/medications" element={<PrivateRoute><MedicationsPage /></PrivateRoute>} />
                        </Routes>
                        <NavigateHomeIfLoggedIn />
                    </Router>
                </AuthProvider>
            </div>
        </ThemeContext.Provider>
    );
}

function NavigateHomeIfLoggedIn() {
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && (window.location.pathname === '/' || window.location.pathname === '/login' || window.location.pathname === '/create-account' || window.location.pathname === '/reset-password')) {
                navigate('/home');
            }
        });
        return () => unsubscribe();
    }, [navigate]);
    return null;
}

export default App;