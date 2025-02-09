import appLogo from '../assets/app_logo.png';

import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from 'react-router-dom'
import '../styles/GlobalStyles.css'

function NavBar()
{
	const { currentUser } = useAuth();
	const [photo, setPhoto] = useState(null);
	const [loading, setLoading] = useState(false);
	const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
	const navigate = useNavigate();
	
	return(
		<div className="NavBar">
        	<Link to ="/home">
				<img src={appLogo} className="logo" alt="App logo" />
			</Link>
			
			<nav>
				<Link to ="/home">Home</Link>
				<Link to ="/mood-journal">Mood Journal</Link>
				<a href="#">Report</a>
			</nav>

			<Link to ="/profile">
				<img src={photoURL} className="avatar" alt="User avatar"/>
			</Link>
		</div>
	);
}

export default NavBar