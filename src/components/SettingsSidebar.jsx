import '../styles/GlobalStyles.css';
import ProfilePicture from './ProfilePicture';
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { useLoading } from './Loading';

/* TODO: Recyle component for use on Profile page.
Also make into a mini-navigation to get between profile settings and and application settings */
function SettingsSidebar() {
	const photoURL = ProfilePicture();
	const { setLoading } = useLoading();
	const [error, setError] = useState('');
	const [name, setName] = useState("Hello!");

	const fetchUserData = async () => {
		setLoading(true)
		try {
			const currentUser = auth.currentUser;
			const userId = currentUser.uid;
			const unsub = onSnapshot(doc(db, "user_info", userId, "Data", "Profile"), doc => {
				if (doc.exists()) {
					const userData = doc.data()
					setName(userData.Name ? userData.Name : "Hello");
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
		<div className="SettingsSidebar">
			<h2>{name}</h2>

			<img src={photoURL} className="avatar" alt="User avatar" />

			<nav>
				<p><Link to="/profile">Profile Settings</Link></p>
				<p><Link to="/settings">Application Settings</Link></p>
			</nav>
		</div>
	);
}

export default SettingsSidebar;