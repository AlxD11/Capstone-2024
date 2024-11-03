import appLogo from '/vite.svg'
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import './GlobalStyles.css'

function NavBar()
{
	const { currentUser } = useAuth();
	const [photo, setPhoto] = useState(null);
	const [loading, setLoading] = useState(false);
	const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
	return(
		<div className="NavBar">
        	<img src={appLogo} className="logo" alt="App logo" />
			
			<nav>
				<a href="#">Home</a>
				<a href="#">Mood Journal</a>
				<a href="#">Report</a>
			</nav>

			<img src={photoURL} className="avatar" alt="User avatar" />
		</div>
	);
}

export default NavBar