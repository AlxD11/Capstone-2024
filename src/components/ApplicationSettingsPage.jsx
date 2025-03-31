import '../styles/GlobalStyles.css';
import { useNavigate } from 'react-router-dom';
import SettingsScreen from './SettingsScreen.jsx';
import ToggleButton from './user_inputs/ToggleButton.jsx';
import FormInput from './user_inputs/FormInput.jsx';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './App.jsx';
import { useAuth } from "../contexts/AuthContext"
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from '../firebase';
import { useLoading } from './Loading.jsx';

function SettingsControls() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [darkMode, setDarkMode] = useState(theme === 'dark');
    const { logout } = useAuth();
    const { error, setError } = useState('');
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    useEffect(() => {
        setDarkMode(theme === 'dark');
    }, [theme]);

    const handleDarkModeChange = async (newDarkMode) => {
        setDarkMode(newDarkMode);
        toggleTheme();

        if (auth.currentUser) {
            try {
                setLoading(true);
                const userDocRef = doc(db, "user_info", auth.currentUser.uid, "Data", "Preferences");
                await updateDoc(userDocRef, { dark_mode: newDarkMode });
            } catch (error) {
                console.error("Error updating dark mode preference:", error);
            } finally {
                setLoading(false);
            }
        }
        localStorage.setItem('darkMode', newDarkMode.toString());
    };

    return (
        <div className="SettingsControls">
            <form>
                <div className="SettingsControls-column">
                    <FormInput
                        label="Receive email reminders"
                        desc="Get encouragement to continue your mood journaling journey delivered to your inbox."
                    >
                        <ToggleButton
                            id="settings-email-reminders"
                            isChecked="true"
                        />
                    </FormInput>
                    <FormInput
                        label="Receive desktop notifications"
                    >
                        <ToggleButton
                            id="settings-desktop-notifications"
                        />
                    </FormInput>

                    <FormInput
                        label="Personalized recommendations"
                        desc="See help recommendations based on your (anonymized) data."
                    >
                        <ToggleButton
                            id="settings-personalization"
                            isChecked="true"
                        />
                    </FormInput>

                    <FormInput
                        label="Dark mode"
                    >
                        <ToggleButton
                            id="settings-dark-mode"
                            isChecked={darkMode}
                            onChange={handleDarkModeChange}
                        />
                    </FormInput>
                </div>

                <div className="SettingsControls-column">
                    <FormInput
                        label="Email reminder interval"
                        desc="Select how often you would like to recieve email reminders."
                        verticalAlignment="true"
                    >
                        <input
                            type="text"
                            placeholder="Enter a number here"
                        />
                        <select id="settings-email-interval" name="settings-email-interval">
                            <option value="0">minutes</option>
                            <option value="1">hours</option>
                            <option value="2" selected>days</option>
                            <option value="3">weeks</option>
                        </select>
                    </FormInput>

                    <FormInput
                        label="MFA method"
                        desc="Choose whether to require a verification code sent to text or email to log in."
                        verticalAlignment="true"
                    >
                        <select id="settings-mfa" name="settings-mfa">
                            <option value="email">Email me</option>
                            <option value="phone">Text me</option>
                            <option value="none" selected>None</option>
                        </select>
                    </FormInput>

                    <FormInput
                        label="Delete account"
                        desc="Permanently delete your account and data."
                        verticalAlignment="true"
                    >
                        <input
                            type="button"
                            value="Delete"
                        />
                    </FormInput>
                </div>
            </form>
        </div>
    );
}

function ApplicationSettings() {
    return (
        <div className="ApplicationSettings">
            <h2>Application Settings</h2>
            <SettingsControls />
        </div>
    );
}

function ApplicationSettingsPage() {
    return (
        <>
            <SettingsScreen>
                <ApplicationSettings />
            </SettingsScreen>
        </>
    );
}

export default ApplicationSettingsPage;