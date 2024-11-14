import appLogo from '../assets/app_logo.png';
import smile_excellent from '../assets/smile_excellent.png';
import smile_good from '../assets/smile_good.png';
import smile_neutral from '../assets/smile_neutral.png';
import smile_poor from '../assets/smile_poor.png';
import smile_miserable from '../assets/smile_miserable.png';

//import { Link, useNavigate } from 'react-router-dom';
import './GlobalStyles.css';
import Footer from './Footer.jsx'
import NavBar from './NavBar.jsx'


function MoodPoll()
{
	return (
		<div className="MoodPoll">
			<h2>Mood Poll</h2>
			<p>1 of 5: How would you rate your sleep quality?</p>
			<ul>
				<li>Excellent
					<img src={smile_excellent} className="poll-icon" alt="excellent" />
				</li>
				<li>
					Good
					<img src={smile_good} className="poll-icon" alt="good" />
				</li>
				<li>
					So-so
					<img src={smile_neutral} className="poll-icon" alt="neutral" />
				</li>
				<li>
					Poor
					<img src={smile_poor} className="poll-icon" alt="poor" />
				</li>
				<li>
					Horrible
					<img src={smile_miserable} className="poll-icon" alt="miserable" />
				</li>
			</ul>
		</div>
	);
}

function MoodPollScreen()
{
	return (
		<>
			<NavBar />
			<MoodPoll />
			<Footer />
		</>
	);
}

export default MoodPollScreen