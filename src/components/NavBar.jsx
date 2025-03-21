import appLogo from '../assets/app_logo.png';
import ProfilePicture from './ProfilePicture';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/GlobalStyles.css';
import { useState } from 'react';
import { useAuth } from "../contexts/AuthContext"

function NavBar() {
	const [showDropdown, setShowDropdown] = useState(false);
	
	const navigate = useNavigate();

	const handleDropdownToggle = () => {
		setShowDropdown((prev) => !prev);
	};
	
	const photoURL = ProfilePicture();

	const { logout } = useAuth();
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
		<div className="NavBar">
			<Link to="/home">
				<img src={appLogo} className="logo" alt="App logo" />
			</Link>

			<nav>
				<Link to="/home">Home</Link>
				<Link to="/mood-journal">Mood Journal</Link>
				<Link to="/reports">Report</Link>
			</nav>

			<div className="avatar-wrapper relative" onClick={handleDropdownToggle}>
				<img src={photoURL} className="avatar" alt="User avatar" />

				{showDropdown && (
					<div className="dropdown-menu p-4 w-52 shadow-lg absolute left-0 top-full mt-2">
						<ul>
							<li className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100">
								<Link to="/profile">Profile</Link>
							</li>
							<li className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100">
								<Link to="/edit-profile">Profile Settings</Link>
							</li>
							<li className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100">
								<Link to="/settings">Application Settings</Link>
							</li>
							<li
    							className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100"
    							onClick={handleLogout} // Add onClick handler
							>
   							 Logout
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}

export default NavBar;
