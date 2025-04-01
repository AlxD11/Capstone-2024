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
import BestPractices from './BestPractices'; // 3/31
import Support from './Support'; // 3/31
import Developers from './Developers'; // 3/31
import MoodJournal from './MoodJournal';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from '../contexts/AuthContext';
import Reports from './Reports.jsx';
import DetailedReports from "./DetailedReports.jsx"
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { LoadingProvider, LoadingComponent } from './Loading';

export const ThemeContext = createContext(null);

function App() {
    const [theme, setTheme] = useState("light");

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
                            return;
                        }
                    }
                } catch (error) {
                    console.error("Error fetching dark mode preference:", error);
                }

                const storedPreference = localStorage.getItem('darkMode');
                if (storedPreference === 'true' || storedPreference === 'false') {
                    setTheme(storedPreference === 'true' ? 'dark' : 'light');
                    return;
                }
            }

            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setTheme('dark');
            } else {
                setTheme('light');
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
            } catch (error) {
                console.error("Error updating dark mode preference:", error);
            }
        }
        localStorage.setItem('darkMode', newTheme === "dark");
    };

    return (
        <LoadingProvider>
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
                                <Route path="/DetailedReports" element={<PrivateRoute><DetailedReports /></PrivateRoute>} />
                                <Route path="/mood-journal" element={<PrivateRoute><MoodJournal /></PrivateRoute>} />
                                <Route path="/settings" element={<PrivateRoute><ApplicationSettingsPage /></PrivateRoute>} />
                                <Route path="/profile" element={<PrivateRoute><ProfileViewPage /></PrivateRoute>} />
                                <Route path="/edit-profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                                <Route path="/professional-help" element={<PrivateRoute><ProfessionalHelp /></PrivateRoute>} />
                                <Route path="/best-practices" element={<PrivateRoute><BestPractices /></PrivateRoute>} />            // 3/31
                                <Route path="/support" element={<PrivateRoute><Support /></PrivateRoute>} />                        // 3/31
                                <Route path="/developers" element={<PrivateRoute><Developers /></PrivateRoute>} />                 //3/31
                                <Route path="/professional-help" element={<PrivateRoute><ProfessionalHelp /></PrivateRoute>} />
                                <Route path="/medications" element={<PrivateRoute><MedicationsPage /></PrivateRoute>} />
                            </Routes>
                            <NavigateHomeIfLoggedIn />
                        </Router>
                    </AuthProvider>
                </div>
            </ThemeContext.Provider>
            <LoadingComponent />
        </LoadingProvider>
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
