import '../styles/GlobalStyles.css';
import ProfilePicture from './ProfilePicture';
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';


/* TODO: Recyle component for use on Profile page.
Also make into a mini-navigation to get between profile settings and and application settings */
function SettingsSidebar() {
	let username = "[USERNAME]";
	const photoURL = ProfilePicture();

	return (
		<div className="SettingsSidebar">
			<h2>{username}</h2>

			<img src={photoURL} className="avatar" alt="User avatar" />

			<nav>
				<p><Link to="/profile">Profile Settings</Link></p>
				<p><Link to="/settings">Application Settings</Link></p>
			</nav>
		</div>
	);
}

export default SettingsSidebar;