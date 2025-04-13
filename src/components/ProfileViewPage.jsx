import '../styles/GlobalStyles.css';
import '../styles/SettingsPage.css';
import SettingsScreen from './SettingsScreen.jsx';
import FormInput from './user_inputs/FormInput.jsx';
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useLoading } from './Loading';

function ViewProfileSettings() {
	// TODO: Get from backend

	const { setLoading } = useLoading();
	const [error, setError] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	// Will probably change to desiredHelp
	const [userWishes, setUserWishes] = useState('');
	const [userGoals, setUserGoals] = useState('');
	// Make as a list separated by semicolons (??)
	const [userHealth, setUserHealth] = useState('');
	const [userMedication, setUserMedication] = useState([]);
	const fetchUserData = async () => {
		setLoading(true)
		try {
			const currentUser = auth.currentUser;
			const userId = currentUser.uid;
			const unsub = onSnapshot(doc(db, "user_info", userId, "Data", "Profile"), doc => {
				if (doc.exists()) {
					const userData = doc.data()
					setName(userData.Name ? userData.Name : <span style={{ color: 'red' }}>Yet to set your Name</span>);
					setEmail(userData.email ? userData.email : <span style={{ color: 'red' }}>Yet to set your Email ID</span>);
					setPhone(userData.Phone ? userData.Phone : <span style={{ color: 'red' }}>Yet to set your Phone Number</span>);
					setUserWishes(userData.Improve ? userData.Improve : <span style={{ color: 'red' }}>Yet to set your Wishes</span>);
					setUserGoals(userData.Goal ? userData.Goal : <span style={{ color: 'red' }}>Yet to set your goals</span>);
					setUserHealth(userData.mentalHealthTopic ? userData.mentalHealthTopic.toUpperCase() : <span style={{ color: 'red' }}>Yet to set your Current health concerns/conditions</span>);
					const loadedMeds = userData.medications.map((med, index) => ({
						id: index.toString(),
						name: med.name,
						order: med.order !== undefined ? med.order : index
					})).sort((a, b) => a.order - b.order);
					setUserMedication(loadedMeds.length > 0 ? loadedMeds : <span style={{ color: 'red' }}>Yet to set your current Medication/s</span>);
				} else {
					console.log("No user data found for UID:", userId)
				}
			})
		} catch (error) {
			console.error("Error fetching user data:", error);
		} finally {
			setLoading(false);
		}
		return () => {
			unsub();
		};
	}
	useEffect(() => {
		fetchUserData();
	}, []);

	return (
		<div className="ViewProfileSettings">
			<div className="SettingsControls-column">
				<FormInput
					label="Name"
					verticalAlignment="true"
					textOnly="true"
				>
					<p className="ViewSetting">{name}</p>
				</FormInput>

				<FormInput
					label="Email address"
					verticalAlignment="true"
					textOnly="true"
				>
					<p className="ViewSetting">{email}</p>
				</FormInput>

				<FormInput
					label="Phone"
					verticalAlignment="true"
					textOnly="true"
				>
					<p className="ViewSetting">{phone}</p>
				</FormInput>
			</div>

			<div className="SettingsControls-column">
				<FormInput
					label="What would you like help with?"
					verticalAlignment="true"
					textOnly="true"
				>
					<p className="ViewSetting">{userWishes}</p>
				</FormInput>

				<FormInput
					label="What are your goals?"
					verticalAlignment="true"
					textOnly="true"
				>
					<p className="ViewSetting">{userGoals}</p>
				</FormInput>

				<FormInput
					label="Current health concerns / conditions"
					verticalAlignment="true"
					textOnly="true"
				>
					<p className="ViewSetting">{userHealth}</p>
				</FormInput>

				<FormInput
					label="Current medications"
					verticalAlignment="true"
					textOnly="true"
				>
					<div className="ViewSetting">
						{Array.isArray(userMedication) ? (
							userMedication.length > 0 ? (
								<p>
									{userMedication.map((med) => (
										<li key={med.id}>{med.name}</li>
									))}
								</p>
							) : (
								userMedication
							)
						) : (
							<p>{userMedication}</p>
						)}
					</div>
				</FormInput>
			</div>
		</div>
	);
}

/** The main content for the profile page. */
function ViewProfile() {
	return (
		<div className="Profile">
			<h2>Profile Settings</h2>
			<ViewProfileSettings />
			<button className="linked-button"><Link to="/edit-profile">Edit profile</Link></button>
		</div>
	);
}

/** The profile page, plus the standard header and footer. */
function ProfileViewPage() {
	return (
		<>
			<SettingsScreen>
				<ViewProfile />
			</SettingsScreen>
		</>
	);
}

export default ProfileViewPage;