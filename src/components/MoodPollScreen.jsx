import smile_excellent from '../assets/smile_excellent.png';
import smile_good from '../assets/smile_good.png';
import smile_neutral from '../assets/smile_neutral.png';
import smile_poor from '../assets/smile_poor.png';
import smile_miserable from '../assets/smile_miserable.png';

//import { Link, useNavigate } from 'react-router-dom';
import '../styles/GlobalStyles.css';
import MainScreen from './MainScreen.jsx';


/** Asks "How's your sleep quality?" */
// https://duckduckgo.com/?t=ffab&q=React+user+form+tutorial+-noai&iax=videos&ia=videos&iai=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DIkMND33x0qQ
// Make name="" the same for all inputs belonging to the same question
// Use on form for all questions so submission works easier

/** Creates a a multiple-choice question with answers ranging from "Excellent" (value of 4) to "Horrible" (value of 0).
 * 
 * FIXME: Not working well with tab-indexing on keyboard - only (seemingly) jumps to question text.
 * 
 * @param {Object} param0 
 * @param {string} param0.questionName 	Tells buttons which question they belong to via the `name` attribute. Extra important for radio buttons.
 * @param {string} param0.questionText 	The actual question to display to the user.
 * @param {string} param0.desc 			(optional) The longer description to display under the question text.
 */
function PollQuestion({ questionName, questionText, desc })
{
	return(
		<div className="PollQuestion">
			<p>{questionText}</p>
			<p className="PollQuestion-description">{desc}</p>
			
			<label className="PollQuestion-mc">Excellent
				<input
					type="radio"
					name={questionName}
					value="4"
				/>
				<img src={smile_excellent} className="poll-icon" alt="excellent" />
			</label>
			
			<label className="PollQuestion-mc">Good
				<input
					type="radio"
					name={questionName}
					value="3"
				/>
				<img src={smile_good} className="poll-icon" alt="good" />
			</label>
			
			<label className="PollQuestion-mc">So-so
				<input
					type="radio"
					name={questionName}
					value="2"
				/>
				<img src={smile_neutral} className="poll-icon" alt="neutral" />
			</label>
			
			<label className="PollQuestion-mc">Poor
				<input
					type="radio"
					name={questionName}
					value="1"
				/>
				<img src={smile_poor} className="poll-icon" alt="poor" />
			</label>
			
			<label className="PollQuestion-mc">Horrible
				<input
					type="radio"
					name={questionName}
					value="0"
				/>
				<img src={smile_miserable} className="poll-icon" alt="miserable" />
			</label>
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
					<label className="PollQuestion-dose">
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
			<p>All questions are optional; only answer the ones you want to.</p>
			
			<PollQuestionMedDoses />
			<PollQuestion
				questionName="question-sleep"
				questionText="How's your sleep quality been?"
			/>
			<PollQuestion
				questionName="question-physical-energy"
				questionText="How's your physical energy level?"
			/>
			<PollQuestion
				questionName="question-mental-energy"
				questionText="How's your mental energy level?"
			/>
			<PollControlls />
		</div>
	);
}

function MoodPollScreen()
{
	return (
		<>
			<MainScreen>
				<MoodPoll />
			</MainScreen>
		</>
	);
}

export default MoodPollScreen