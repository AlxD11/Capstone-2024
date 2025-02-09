import '../styles/GlobalStyles.css'

import MainScreen from "./MainScreen";

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { BarChart } from './Bar';


/** Returns a random friendly welcome message. */
function getRandomWelcomeMessage()
{
	const messages = [];
	let i = 0;
	
	messages[i] = "Take time for yourself today to do one thing that makes you smile."
	i++;
	messages[i] = "It's good to see you!"
	i++;
	messages[i] = "In case you need a reminder: you are awesome."
	i++;
	messages[i] = "You're doing great today!"
	i++;
	messages[i] = "Joy is within you."
	i++;
	
	return messages[Math.floor(Math.random() * messages.length)];
}

/** The welcome message for the home screen. */
function HomeWelcomeMsg({name})
{
	/* FIXME: This is getting called twice. I think it's an easy fix, but I forget how ATM. */
	const welcomeMsg = getRandomWelcomeMessage();
	
	return(
		<div className="HomeWelcomeMsg">
			<h2>Welcome {name},</h2>
			<p>{welcomeMsg}</p>
		</div>
	);
}

/** Displays the reminder message and button for the user to enter their daily mood stuff. */
function ReminderMoodLog()
{
	return(
		<div className="reminder-entry">
			<p><span>How are you feeling today?</span></p>
			<button className="linked-button"><Link to ="/poll-screen">Log Mood</Link></button>
		</div>
	);
}

/** Queries what the user should be reminded of and displays it on the homepage. */
function Reminders()
{
	// TODO: Query whether the user has entered their mood / energy / sleep data for the day and display the appropriate reminder

	return(
		<div className="Reminders">
			<h2>Today's Reminders</h2>
			<ReminderMoodLog/>
		</div>
	);
}

function InfoSummary({mood})
{
	// TODO: Analyze user's data and determine what to say for the summary.
	const summary = "You don't have any mood history yet."
	return(
		<div className="InfoSummary">
			<BarChart>{mood}
				
			</BarChart> 
		</div>
	);
}

/** The main content of the home screen. This should be rendered in a Main Screen component, after the top navigation bar and before the page footer. */
function HomePage()
{
	/* The home screen needs:
		X the top nav bar
		X the welcome message
		- the day's reminders
		X the "Take Test" button
		- the mood / energy / sleep summary
		X the closing footer stuff */

	const [name, setName] = useState(""); 
	const [summary, setSummary] = useState("Loading your data...");
	const [mood, setMood] = useState([]);
	const fetchUserData = () => {
		try {
			const currentUser = auth.currentUser;

			if (!currentUser) {
				console.error("No user is signed in.");
				setSummary("Please log in to view your data.");
				return;
			}

			const userId = currentUser.uid; 

			const unsub = onSnapshot(doc(db,"user_info", userId), doc =>{
				if (doc.exists()) {
					const userData = doc.data()
					setName(userData.name || "User")
					setMood([...userData.Mood])
					setSummary(`Welcome back, ${userData.name}!`)
				} else {
					console.log("No user data found for UID:", userId)
					setSummary("No user data found.")
				}})
		} catch (error) {
			console.error("Error fetching user data:", error);
			setSummary("Error loading data.");
		}
		return () =>{
			unsub();
		};
	};
	useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <MainScreen>
			<div className="HomeScreen">
				<HomeWelcomeMsg name={name} />
				<div className="HomeScreen-info">
					<Reminders />
					<InfoSummary mood={[mood]} />
				</div>
			</div>
		</MainScreen>
    );
}

export default HomePage;
