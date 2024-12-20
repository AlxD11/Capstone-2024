import smile_excellent from '../assets/smile_excellent.png';
import smile_good from '../assets/smile_good.png';
import smile_neutral from '../assets/smile_neutral.png';
import smile_poor from '../assets/smile_poor.png';
import smile_miserable from '../assets/smile_miserable.png';

//import { Link, useNavigate } from 'react-router-dom';
import './GlobalStyles.css';
import Footer from './Footer.jsx'
import NavBar from './NavBar.jsx'


function PollQuestionSleep()
{
	return(
		<div className="PollQuestion">
			<p>How's your sleep quality?</p>
			<ul>
				<li>
					<span>Excellent</span>
					<img src={smile_excellent} className="poll-icon" alt="excellent" />
				</li>
				<li>
					<span>Good</span>
					<img src={smile_good} className="poll-icon" alt="good" />
				</li>
				<li>
					<span>So-so</span>
					<img src={smile_neutral} className="poll-icon" alt="neutral" />
				</li>
				<li>
					<span>Poor</span>
					<img src={smile_poor} className="poll-icon" alt="poor" />
				</li>
				<li>
					<span>Horrible</span>
					<img src={smile_miserable} className="poll-icon" alt="miserable" />
				</li>
			</ul>
		</div>	
	);
}

function PollQuestionPhysicalEnergy()
{
	return(
		<div className="PollQuestion">
			<p>How's your physical energy level?</p>
			<ul>
				<li>
					<span>Excellent</span>
					<img src={smile_excellent} className="poll-icon" alt="excellent" />
				</li>
				<li>
					<span>Good</span>
					<img src={smile_good} className="poll-icon" alt="good" />
				</li>
				<li>
					<span>So-so</span>
					<img src={smile_neutral} className="poll-icon" alt="neutral" />
				</li>
				<li>
					<span>Poor</span>
					<img src={smile_poor} className="poll-icon" alt="poor" />
				</li>
				<li>
					<span>Horrible</span>
					<img src={smile_miserable} className="poll-icon" alt="miserable" />
				</li>
			</ul>
		</div>	
	);
}

function PollQuestionMentalEnergy()
{
	return(
		<div className="PollQuestion">
			<p>How's your mental energy level?</p>
			<ul>
				<li>
					<span>Excellent</span>
					<img src={smile_excellent} className="poll-icon" alt="excellent" />
				</li>
				<li>
					<span>Good</span>
					<img src={smile_good} className="poll-icon" alt="good" />
				</li>
				<li>
					<span>So-so</span>
					<img src={smile_neutral} className="poll-icon" alt="neutral" />
				</li>
				<li>
					<span>Poor</span>
					<img src={smile_poor} className="poll-icon" alt="poor" />
				</li>
				<li>
					<span>Horrible</span>
					<img src={smile_miserable} className="poll-icon" alt="miserable" />
				</li>
			</ul>
		</div>	
	);
}

function PollQuestionMedDoses()
{
	//TODO: Find more user-friendly way to enter a date / time, dear gOD
	return(
		<div className="PollQuestion">
			<p>What are your most recent medication doses?</p>
			<div>
				<form>
					<label>
						Medication 1:
						<input type="text" placeholder="Medication Name" />
						<input type="text" placeholder="Dose" />
						<input type="datetime-local" placeholder="Time" />
					</label>
				</form>
				<button>Add Dose</button>
			</div>
		</div>
	);
}

function PollControlls()
{
	return(
		<div className="PollControlls">
			<p>Next</p>
		</div>
	);
}

function MoodPoll()
{
	return (
		<div className="MoodPoll">
			<h2>Mood Poll</h2>
			<p>Let's see how you've been doing lately.</p>
			<PollQuestionMedDoses />
			<PollQuestionSleep />
			<PollQuestionPhysicalEnergy />
			<PollQuestionMentalEnergy />
			<PollControlls />
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