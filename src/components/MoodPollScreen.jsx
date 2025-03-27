import smile_excellent from '../assets/smile_excellent.png';
import smile_good from '../assets/smile_good.png';
import smile_neutral from '../assets/smile_neutral.png';
import smile_poor from '../assets/smile_poor.png';
import smile_miserable from '../assets/smile_miserable.png';
import { useNavigate } from 'react-router-dom';
//import { Link, useNavigate } from 'react-router-dom';
import '../styles/GlobalStyles.css';
import MainScreen from './MainScreen.jsx';
import MedicationsList from "./user_inputs/MedicationsList.jsx";
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, Timestamp, doc } from 'firebase/firestore'
import React, { useState } from 'react';


/** Asks "How's your sleep quality?" */
// https://duckduckgo.com/?t=ffab&q=React+user+form+tutorial+-noai&iax=videos&ia=videos&iai=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DIkMND33x0qQ
// Make name="" the same for all inputs belonging to the same question
// Use on form for all questions so submission works easier

/** Creates a a multiple-choice question with answers ranging from "Excellent" (value of 4) to "Horrible" (value of 0).
 * 
 * FIXME: Keyboard users will be forced to submit an answer for each question - consider adding an explicit "No Response" option
 * 
 * @param {Object} param0 
 * @param {string} param0.questionName 	Tells buttons which question they belong to via the `name` attribute. Extra important for radio buttons.
 * @param {string} param0.questionText 	The actual question to display to the user.
 * @param {string} param0.desc 			(optional) The longer description to display under the question text.
 */
function PollQuestion({ questionName, questionText, desc, onChange }) {
	/** Create an array of objects that contain the data used to populate
	 * all the response options for the question. These objects are then
	 * mapped using `objects.map()` to build the HTML elements that make
	 * up the responses. */


	const [selectedOption, setSelectedOption] = useState(null);
	const options = [
		{ label: "Excellent", value: 5, icon: smile_excellent, iconAlt: "excellent" },
		{ label: "Good", value: 4, icon: smile_good, iconAlt: "good" },
		{ label: "So-so", value: 3, icon: smile_neutral, iconAlt: "neutral" },
		{ label: "Poor", value: 2, icon: smile_poor, iconAlt: "poor" },
		{ label: "Miserable", value: 1, icon: smile_miserable, iconAlt: "miserable" },
		{ label: "Skip", value: -1, icon: null, iconAlt: "" }
	];

	const handleSelect = (option) => {
		setSelectedOption(option);
		onChange(option.value);
	};


	//const component = document.querySelector("label");
	//const normalStyle = window.getComputedStyle(component);

	const normalTextColor = "inherit";
	const normalBGColor = "inherit";
	const selectedBGColor = "#E33A5F";
	const selectedTextColor = "white";

	const styleClass = "PollQuestion-mc";
	const selectedStyleClass = "PollQuestion-selection";

	/** @deprected:  not used because I'm having trouble understanding how onClick() fires and propogates.
	 * Toggles the CSS class that handles styling the user's active selection to the HTML element's class list.
	 * Reference: https://stackoverflow.com/q/63519495, https://www.geeksforgeeks.org/changing-css-styling-with-react-onclick-event/ */
	const toggleSelect = (event) => {
		/* This event gets triggered for contained child elements and it doesn't propogate
		back up to the parent, leaving mis-matched colors.
		To prevent this, restrict the event to only fire if the target (element that triggered the event)
		is the expected <label>. */

		// If the firing element is a label (the parent)...
		// Ref: https://stackoverflow.com/q/254302
		if (event.target.nodeName.toLowerCase() !== "img" && event.target.nodeName.toLowerCase() !== "input") {
			// If the class name already includes the class for the selection rules,
			if (event.target.className.includes(selectedStyleClass)) {
				// Remove the selection rules and reset the style class to the original
				event.target.className = styleClass;
			}
			else {
				// Append the class for the selection style rules to the class list
				event.target.className = styleClass + " " + selectedStyleClass;
			}

			alert("not img");
		}
		// If the firing element is one of the contained children...
		else {
			// Get the direct parent (assumed to be the label, like we need)
			// Ref: https://www.w3schools.com/jsref/prop_node_parentelement.asp
			if (event.target.parentElement.className.includes(selectedStyleClass)) {
				event.target.parentElement.className = styleClass;
			}
			else {
				event.target.parentElement.className = styleClass + " " + selectedStyleClass;
			}
			alert("IMAGE IMAGE IMAGE");
		}

	}

	//Ref: https://www.freecodecamp.org/news/how-to-render-lists-in-react/

	return (
		<div className="PollQuestion">
			<p>{questionText}</p>
			<p className="PollQuestion-description">{desc}</p>

			{options.map((option, index) => (
				<label
					key={index}
					className={styleClass}
				>
					<div>
						<input
							type="radio"
							name={questionName}
							value={option.value}
							checked={selectedOption && selectedOption.value === option.value}
							onChange={() => handleSelect(option)}
						/>
						{option.label}
					</div>
					<img src={option.icon} className="PollQuestion-icon" alt={option.iconAlt} />
				</label>
			))}
		</div>
	);
}

/** Renders the poll question that asks the user to enter their medication doses.
 * TODO: auto-populate suggestions with user's currently listed meds from the settings page. */
function PollQuestionMedDoses({ onChange }) {
	const medName = "";

	//TODO: Find more user-friendly way to enter a date / time, dear gOD
	return (
		<div className="PollQuestion">
			<p>What are your most recent medication doses?</p>
			<div>
				<form>
					<MedicationsList onChange={onChange} />
				</form>
			</div>
		</div>
	);
}

/** Renders navigation buttons to move between questions / pages. */
function PollControlls({ onSubmit }) {
	return (
		<div className="PollControlls">
			<button onClick={onSubmit}>Submit</button>
		</div>
	);
}

function MoodPoll() {
	const [sleepQuality, setSleepQuality] = useState();
	const [physicalEnergy, setPhysicalEnergy] = useState();
	const [mentalEnergy, setMentalEnergy] = useState();
	const [medications, setMedications] = useState([]);
	const [loading, setLoading] = useState(false)
	const userId = auth.currentUser.uid;
	const date = new Date()
	const navigate = useNavigate()
	const [moodLevel, setMoodLevel] = useState();

	const handleSubmit = async () => {
		const moodValues = [sleepQuality, physicalEnergy, mentalEnergy].filter(value => value !== null && value !== -1);

		let averageMood = null;
		if (moodValues.length > 0) {
			const sum = moodValues.reduce((acc, value) => acc + value, 0);
			averageMood = sum / moodValues.length;
		}


		console.log(averageMood)
		try {
			setLoading(true)
			const startOfDay = new Date(date);
			startOfDay.setHours(0, 0, 0, 0);
			const endOfDay = new Date(date);
			endOfDay.setHours(23, 59, 59, 999);
			const moodEntriesCollection = collection(
				db,
				"user_info",
				userId,
				"Data",
				"Mood Poll",
				"Mood_entries"
			);

			const q = query(
				moodEntriesCollection,
				where("date", ">=", Timestamp.fromDate(startOfDay)),
				where("date", "<=", Timestamp.fromDate(endOfDay)),
			)
			const querySnapshot = await getDocs(q);
			const newFields = {
				sleepQuality: sleepQuality,
				physicalEnergy: physicalEnergy,
				mentalEnergy: mentalEnergy,
				medications: medications,
				date: Timestamp.fromDate(date),
				moodLevel: averageMood,
			}
			if (!querySnapshot.empty) {
				querySnapshot.forEach(async (document) => {
					console.log(document, newFields)
					await updateDoc(doc(moodEntriesCollection, document.id), newFields);
				});
				console.log("Document updated:", newFields);
				alert("Poll Submitted!");
			} else {
				await addDoc(moodEntriesCollection, newFields);
				console.log("Document written with ID: ", docRef.id);
				alert("Poll Submitted!");
				await addDoc(moodEntriesCollection, newFields);
				console.log("Document added:", newFields);
			}
			navigate("/home");
		} catch (e) {
			console.error("Error adding document: ", e);
			alert("Error submitting poll.");
		}
		finally {
			setLoading(false)
		}
	};
	return (
		<div className="MoodPoll">
			<h2>Mood Poll</h2>
			<p>Let's see how you've been doing lately.</p>
			<p>All questions are optional; only answer the ones you want to.</p>

			<PollQuestionMedDoses onChange={setMedications} />
			<PollQuestion
				questionName="question-sleep"
				questionText="How's your sleep quality been?"
				onChange={setSleepQuality}
			/>
			<PollQuestion
				questionName="question-physical-energy"
				questionText="How's your physical energy level?"
				onChange={setPhysicalEnergy}
			/>
			<PollQuestion
				questionName="question-mental-energy"
				questionText="How's your mental energy level?"
				onChange={setMentalEnergy}
			/>
			<PollControlls onSubmit={handleSubmit} />
		</div>
	);
}

function MoodPollScreen() {
	return (
		<>
			<MainScreen>
				<MoodPoll />
			</MainScreen>
		</>
	);
}

export default MoodPollScreen