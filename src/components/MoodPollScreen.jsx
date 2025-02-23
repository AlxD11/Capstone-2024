import smile_excellent from '../assets/smile_excellent.png';
import smile_good from '../assets/smile_good.png';
import smile_neutral from '../assets/smile_neutral.png';
import smile_poor from '../assets/smile_poor.png';
import smile_miserable from '../assets/smile_miserable.png';

//import { Link, useNavigate } from 'react-router-dom';
import '../styles/GlobalStyles.css';
import MainScreen from './MainScreen.jsx';

import React, {useState} from 'react';


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
	/** Create an array of objects that contain the data used to populate
	 * all the response options for the question. These objects are then
	 * mapped using `objects.map()` to build the HTML elements that make
	 * up the responses. */
	
	
	const [selectedOption, setSelectedOption] = useState(null);
	const options = [
		{label: "Excellent", value: 4, icon: smile_excellent, iconAlt: "excellent"},
		{label: "Good", value: 3, icon: smile_good, iconAlt: "good"},
		{label: "So-so", value: 2, icon: smile_neutral, iconAlt: "neutral"},
		{label: "Poor", value: 1, icon: smile_poor, iconAlt: "poor"},
		{label: "Miserable", value: 0, icon: smile_miserable, iconAlt: "miserable"}
	];
	
	const handleSelect = (option) => {
		setSelectedOption(option);
	};
	
	
	//const component = document.querySelector("label");
	//const normalStyle = window.getComputedStyle(component);
	
	const normalTextColor = "inherit";
	const normalBGColor = "inherit";
	const selectedBGColor = "#E33A5F";
	const selectedTextColor = "white";
	
	const styleClass = "PollQuestion-mc";
	const selectedStyleClass = "PollQuestion-selection";
	
	/** Toggles the CSS class that handles styling the user's active selection to the HTML element's class list.
	 * Reference: https://stackoverflow.com/q/63519495, https://www.geeksforgeeks.org/changing-css-styling-with-react-onclick-event/ */
	const toggleSelect = (event) =>
	{
		/* This event gets triggered for contained child elements and it doesn't propogate
		back up to the parent, leaving mis-matched colors.
		To prevent this, restrict the event to only fire if the target (element that triggered the event)
		is the expected <label>. */
		
		// If the firing element is a label (the parent)...
		// Ref: https://stackoverflow.com/q/254302
		if (event.target.nodeName.toLowerCase() == "label")
		{
			// If the class name already includes the class for the selection rules,
			if (event.target.className.includes(selectedStyleClass))
			{
				// Remove the selection rules and reset the style class to the original
				event.target.className = styleClass;
			}
			else
			{
				// Append the class for the selection style rules to the class list
				event.target.className = styleClass + " " + selectedStyleClass;
			}
		}
		// If the firing element is one of the contained children...
		else
		{
			// Get the direct parent (assumed to be the label, like we need)
			// Ref: https://www.w3schools.com/jsref/prop_node_parentelement.asp
			if (event.target.parentElement.className.includes(selectedStyleClass))
			{
				event.target.parentElement.className = styleClass;
			}
			else
			{
				event.target.parentElement.className = styleClass + " " + selectedStyleClass;
			}
		}
		
	}
	
	//Ref: https://www.freecodecamp.org/news/how-to-render-lists-in-react/
	
	return(
		<div className="PollQuestion">
			<p>{questionText}</p>
			<p className="PollQuestion-description">{desc}</p>
			
			{options.map((option, index) => (
				<label
					key={index}
					onClick={(e) => toggleSelect(e)}
					className={styleClass}
				>
					{option.label}
					<input
						type="radio"
						name={questionName}
						value={option.value}
					/>
					<img src={option.icon} className="PollQuestion-icon" alt={option.iconAlt} />
				</label>
			))}
			
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

/** Renders the poll question that asks the user to enter their medication doses.
 * TODO: auto-populate suggestions with user's currently listed meds from the settings page. */
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

/** Renders navigation buttons to move between questions / pages. */
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