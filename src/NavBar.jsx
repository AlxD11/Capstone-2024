import appLogo from '/vite.svg'
import profilePic from './assets/profile_picture.jpg'
import './GlobalStyles.css'

function NavBar()
{
	return(
		<div className="NavBar">
        	<img src={appLogo} className="logo" alt="App logo" />
			
			<nav>
				<a href="#">Home</a>
				<a href="#">Mood Journal</a>
				<a href="#">Report</a>
			</nav>

			<img src={profilePic} className="logo" alt="User avatar" />
		</div>
	);
}

export default NavBar