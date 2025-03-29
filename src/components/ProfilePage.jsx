import '../styles/GlobalStyles.css';
import '../styles/SettingsPage.css'; // Sharing style rules with Application Settings Page for now
import SettingsScreen from './SettingsScreen.jsx';
import FormInput from './user_inputs/FormInput.jsx';
import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext"
import { ClipLoader } from 'react-spinners';

// TODO: This is very similar to the Settings page, so maybe figure out a way to recycle the components.


function ProfileSettings() {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [photoURL, setPhotoURL] = useState('');
	const [userName, setUserName] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [userWishes, setUserWishes] = useState('');
	const [userGoals, setUserGoals] = useState('');
	const [userHealth, setUserHealth] = useState('');
	const [userMedication, setUserMedication] = useState('');
	const { upload, currentUser, updateEmail } = useAuth();
	const [oldUserName, setOldUserName] = useState('');
	const [oldName, setOldName] = useState('');
	const [oldEmail, setOldEmail] = useState('');
	const [oldPhone, setOldPhone] = useState('');
	// Will probably change to desiredHelp
	const [oldUserWishes, setOldUserWishes] = useState('');
	const [oldUserGoals, setOldUserGoals] = useState('');
	// Make as a list separated by semicolons (??)
	const [oldUserHealth, setOldUserHealth] = useState('');
	const [oldUserMedication, setOldUserMedication] = useState('');
	const promises = []
	const navigate = useNavigate();
	const handleOpenPopup = () => setIsPopupOpen(true);
	const handleClosePopup = () => setIsPopupOpen(false);
	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};
	const fetchUserData = async () => {
		setLoading(true)
		try {
			const currentUser = auth.currentUser;
			const userId = currentUser.uid;
			const unsub = onSnapshot(doc(db, "user_info", userId, "Data", "Profile"), doc => {
				if (doc.exists()) {
					const userData = doc.data()
					setOldName(userData.Name || "Lord Farquaad");
					setOldUserName(userData.UserName || "xX_Sunny-Haz3_Xx");
					setOldEmail(userData.email || "example@snailmail.com");
					setOldPhone(userData.Phone || "(972) 000-0000");
					setOldUserWishes(userData.Improve || "Example: I wish I could be less stressed about work");
					setOldUserGoals(userData.Goal || "Example: I want to work towards feeling like it's ok to set boundaries with coworkers and other people.");
					setOldUserHealth(userData.Health || "Examples: ADHD, anxiety, interpersonal boundaries");
					setOldUserMedication(userData.Medication || "Yet to set your current Medication/s");
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
	if (loading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<ClipLoader color="#36D7B7" size={50} />
			</div>
		);
	}
	const handleUpload = async () => {
		if (selectedFile && currentUser) {
			try {
				await upload(selectedFile);
				console.log('File uploaded successfully:');
				handleClosePopup();
			} catch (error) {
				console.error('Error uploading file:', error);
				setError('Error uploading file.');
			}
		}
	};

	const updateUserData = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const currentUser = auth.currentUser;
			if (!currentUser) {
				console.error("No user is signed in.");
				return;
			}
			const userId = currentUser.uid;
			const userDoc = doc(db, "user_info", userId, "Data", "Profile");
			const newFields = {};
			if (userName) newFields.UserName = userName;
			if (name) newFields.Name = name;
			if (email !== currentUser.email) {
				promises.push(updateEmail(email))
				newFields.email = email
			};
			if (phone) newFields.Phone = phone;
			if (userWishes) newFields.Improve = userWishes;
			if (userGoals) newFields.Goal = userGoals;
			if (userHealth) newFields.Health = userHealth;

			if (Object.keys(newFields).length > 0) {
				await updateDoc(userDoc, newFields);
				Promise.all(promises).then(() => {
					navigate('/profile');
				})
				console.log("Updated fields:", newFields);
			} else {
				console.log("No fields to update.");
			}
		} catch (error) {
			console.error("Error updating user data:", error);
			setError("Error updating user data.");
		} finally {
			setLoading(false);
		}
	};

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
							placeholder={oldUserName}
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
							placeholder={oldName}
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
							placeholder={oldEmail}
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
							placeholder={oldPhone}
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
							placeholder={oldUserWishes}
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
							placeholder={oldUserGoals}
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
							placeholder={oldUserHealth}
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
			<div>
				<button type="button" className="linked-button" onClick={handleOpenPopup}>Edit Profile Picture</button>
				{isPopupOpen && (
					<div className="popup">
						<div className="popup-content">
							<button className="close-button" onClick={handleClosePopup}>X</button>
							<input type="file" onChange={handleFileChange} />
							{selectedFile && <p>Selected: {selectedFile.name}</p>}
							<button type="button" className="linked-button" onClick={handleUpload}>Upload</button>
						</div>
					</div>
				)}
			</div>
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