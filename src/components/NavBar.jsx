import appLogo from '../assets/app_logo.png';
import ProfilePicture from './ProfilePicture';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/GlobalStyles.css';
import '../styles/NavBar.css';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext"

function NavBar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const photoURL = ProfilePicture();

    const handleDropdownToggle = () => {
        setShowDropdown((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    async function handleLogout() {
        try {
            await logout();
            navigate('/');
        } catch {
            console.error('Failed to log out');
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

            <div className="avatar-wrapper relative" ref={dropdownRef}>
                <img src={photoURL} className="avatar cursor-pointer" alt="User avatar" onClick={handleDropdownToggle} />
                {showDropdown && (
                    <div className="dropdown-menu">
                        <ul>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/edit-profile">Profile Settings</Link></li>
                            <li><Link to="/settings">Application Settings</Link></li>
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NavBar;
