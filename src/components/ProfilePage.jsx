import '../styles/GlobalStyles.css';

import SettingsScreen from './SettingsScreen.jsx';
import FormInput from './user_inputs/FormInput.jsx';
import { useState } from 'react';
import { db, auth } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';


// TODO: This is very similar to the Settings page, so maybe figure out a way to recycle the components.


function ProfileSettings() {
	const [userName, setUserName] = useState('')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [userWishes, setUserWishes] = useState('')
	const [userGoals, setUserGoals] = useState('')
	const [userHealth, setUserHealth] = useState('')
	const [userMedication, setUserMedication] =useState('')
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const updateUserData = async (e) => {
		e.preventDefault();
		try {
			const currentUser = auth.currentUser;
			if (!currentUser) {
				console.error("No user is signed in.");
				return;
			}
			const userId = currentUser.uid;
			const userDoc = doc(db, "user_info", userId, "Data", "Profile")
			const newFields = {UserName: userName, Name: name, email: email, Phone: phone, Improve: userWishes, Goal: userGoals, Health: userHealth}
			await updateDoc(userDoc, newFields)
			navigate('/home')
			console.log(newFields)
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	}
	return (
		<div className="SettingsControls">
			<form>
				<div className="SettingsControls-column">
					<FormInput
						label="Username"
						desc="The name you use to log in."
						verticalAlignment="true"
					>
						<input
							type="text"
							id="settings-username"
							placeholder="xX_Sunny-Haz3_Xx"
							value={userName}
            				onChange={(e) => setUserName(e.target.value)}
						/>
					</FormInput>

					<FormInput
						label="Name"
						desc="The name you want to go by."
						verticalAlignment="true"
					>
						<input
							type="text"
							id="settings-name"
							placeholder="Lord Farquaad"
							value={name}
            				onChange={(e) => setName(e.target.value)}
						/>
					</FormInput>

					<FormInput
						label="Email address"
						verticalAlignment="true"
					>
						<input
							type="email"
							id="settings-email-address"
							placeholder="example@snailmail.com"
							value={email}
            				onChange={(e) => setEmail(e.target.value)}
						/>
					</FormInput>

					<FormInput
						label="Phone"
						desc="(Optional)"
						verticalAlignment="true"
					>
						<input
							type="tel"
							id="settings-phone-number"
							placeholder="(972) 000-0000"
							value={phone}
            				onChange={(e) => setPhone(e.target.value)}
						/>
					</FormInput>
				</div>

				<div className="SettingsControls-column">
					<FormInput
						label="What would you like help with?"
						desc="If you're not sure, try imagining this: what would be different about your life if you could magically change anything you wanted to?"
						verticalAlignment="true"
					>
						<textarea
							id="settings-user-wishes"
							name="settings-user-wishes"
							placeholder="Example: I wish I could be less stressed about work"
							value={userWishes}
            				onChange={(e) => setUserWishes(e.target.value)}
						/>
					</FormInput>

					<FormInput
						label="What are your goals?"
						desc="If you're not sure, try looking at what you want help with and imagining what it would be like for those dreams to come true."
						verticalAlignment="true"
					>
						<textarea
							id="settings-user-goals"
							name="settings-user-goals"
							placeholder="Example: I want to work towards feeling like it's ok to set boundaries with coworkers and other people."
							value={userGoals}
            				onChange={(e) => setUserGoals(e.target.value)}
						/>
					</FormInput>

					<FormInput
						label="Current health concerns / conditions"
						desc="Automatically filter professional help results based on what applies to you. (Optional)"
						verticalAlignment="true"
					>
						<textarea
							id="settings-user-health-concerns"
							name="settings-user-health-concerns"
							placeholder="Examples: ADHD, anxiety, interpersonal boundaries"
							value={userHealth}
            				onChange={(e) => setUserHealth(e.target.value)}
						/>
					</FormInput>

					<FormInput
						label="Current medications"
						desc="Save your medications for quick access in your mood journal. (Optional)"
						verticalAlignment="true"
					>
						<button
							type="button"
							className="linked-button"
						>
							<Link to="/medications">Manage medications</Link>
						</button>
					</FormInput>
					<FormInput>
						<button
							type="submit"
							className="linked-button"
							onClick={updateUserData}
						>
							Done
						</button>
					</FormInput>
				</div>
			</form>
		</div>
	);
}

/** The main content for the profile page. */
function Profile() {
	return (
		<div className="Profile">
			<h2>Profile Settings</h2>
			<ProfileSettings />
		</div>
	);
}

/** The profile page, plus the standard header and footer. */
function ProfilePage() {
	return (
		<>
			<SettingsScreen>
				<Profile />
			</SettingsScreen>
		</>
	);
}

export default ProfilePage;