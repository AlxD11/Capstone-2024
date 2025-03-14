import appLogo from '../assets/app_logo.png';
import ProfilePicture from './ProfilePicture';
import { Link } from 'react-router-dom'
import '../styles/GlobalStyles.css'

function NavBar() {
	const photoURL = ProfilePicture();
	return (
		<div className="NavBar">
			<Link to="/home">
				<img src={appLogo} className="logo" alt="App logo" />
			</Link>

			<nav>
				<Link to="/home">Home</Link>
				<Link to="/mood-journal">Mood Journal</Link>
				<a href="#">Report</a>
				<Link to ="/home">Home</Link>
				<Link to ="/mood-journal">Mood Journal</Link>
				<Link to="/Reports">Report</Link>
			</nav>

			<Link to="/profile">
				<img src={photoURL} className="avatar" alt="User avatar" />
			</Link>
		</div>
	);
}

export default NavBar