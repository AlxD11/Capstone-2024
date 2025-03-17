import appLogo from '../assets/app_logo.png';
import ProfilePicture from './ProfilePicture';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/GlobalStyles.css';
import { useState } from 'react';

function NavBar() {
	const [showDropdown, setShowDropdown] = useState(false);
	const navigate = useNavigate();

	const handleDropdownToggle = () => {
		setShowDropdown((prev) => !prev);
	};


	return (
		<div className="NavBar">
			<Link to="/home">
				<img src={appLogo} className="logo" alt="App logo" />
			</Link>

			<nav>
				<Link to="/home">Home</Link>
				<Link to="/mood-journal">Mood Journal</Link>
				<Link to="/reports">Report</Link>
			</nav>

			<div onClick={handleDropdownToggle} className="avatar-wrapper">
				<ProfilePicture />
			</div>

			{showDropdown && (
				<div className="p-4 w-52 shadow-lg absolute -left-14 top-24">
					<ul>
						<li className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100">
							<Link to="/profile-page">Profile Settings</Link>
						</li>
						<li className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100">
							<Link to="/application-settings">Application Settings</Link>
						</li>
						<li
							className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100"
						>
							Logout
						</li>
					</ul>
				</div>
			)}
		</div>
	);
}

export default NavBar;
