import '../styles/GlobalStyles.css';
import '../styles/SettingsPage.css';
import { useNavigate } from 'react-router-dom';
import SettingsScreen from './SettingsScreen.jsx';
import ToggleButton from './user_inputs/ToggleButton.jsx';
import FormInput from './user_inputs/FormInput.jsx';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './App.jsx';
import { useAuth } from "../contexts/AuthContext"
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

/** TODO: Add confirmation dialog to account delete button */
function SettingsControls() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [darkMode, setDarkMode] = useState(false);
    const { logout } = useAuth();
    const { error, setError } = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInitialDarkMode = async () => {
            if (useAuth().currentUser) {
                try {
                    const userDocRef = doc(db, "user_info", useAuth().currentUser.uid, "Data", "Preferences");
                    const docSnap = await getDoc(userDocRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        if (data && data.dark_mode !== undefined) {
                            setDarkMode(data.dark_mode);
                            return;
                        }
                    }
                } catch (error) {
                    console.error("Error fetching dark mode preference:", error);
                }

                const storedPreference = localStorage.getItem('darkMode');
                if (storedPreference === 'true' || storedPreference === 'false') {
                    setDarkMode(storedPreference === 'true');
                    return;
                }

                setDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
            } else {
                setDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
            }
        };

        fetchInitialDarkMode();
    }, [useAuth().currentUser]); // Add useAuth().currentUser as a dependency

    useEffect(() => {
        if (darkMode) {
            if (theme !== 'dark') {
                toggleTheme();
            }
            localStorage.setItem('darkMode', 'true');
        } else {
            if (theme !== 'light') {
                toggleTheme();
            }
            localStorage.setItem('darkMode', 'false');
        }
    }, [darkMode, theme, toggleTheme]);

    const handleDarkModeChange = (newDarkMode) => {
        setDarkMode(newDarkMode);
    };

    async function handleLogout() {
        try {
            await logout()
            navigate('/')
        }
        catch {
            setError('Failed to log out')
        }
    }
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
                            isChecked={darkMode} // Use darkMode state
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
                    <FormInput
                        label="Logout"
                        desc="Logout off your account"
                        verticalAlignment="true"
                    >
                        <input
                            type="button"
                            value="Logout"
                            onClick={handleLogout}
                        />
                    </FormInput>
                </div>
            </form>
        </div>
    );
}

/** The main content for the settings page. */
function ApplicationSettings() {
    return (
        <div className="ApplicationSettings">
            <h2>Application Settings</h2>
            <SettingsControls />
        </div>
    );
}

/** The settings page, plus the standard header and footer.
TODO: It'd be good to have a component that includes the header and footer and changes out the body content
instead of having each page re-include the header and footer. */
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