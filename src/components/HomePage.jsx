import '../styles/GlobalStyles.css'
import MainScreen from "./MainScreen";
import { ClipLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { doc, onSnapshot, addDoc, collection, Timestamp, query, where, getDocs, orderBy } from 'firebase/firestore';
import { BarChart } from './Bar';


/** The welcome message for the home screen. */
function HomeWelcomeMsg({ name, welcomeMsg }) {
	/* FIXME: This is getting called twice. I think it's an easy fix, but I forget how ATM. */

	return (
		<div className="HomeWelcomeMsg">
			<h2>Welcome {name},</h2>
			<p>{welcomeMsg}</p>
		</div>
	);
}

/** Queries what the user should be reminded of and displays it on the homepage. */
function Reminders({ checkMood }) {
	if (checkMood === false) {
		return (
			<div className="Reminders">
				<h2>Today's Reminders</h2>
				<div className="reminder-entry">
					<p>
						<span>How are you feeling today?</span>
					</p>
					<Link to="/poll-screen" className="linked-button">
						Log Mood
					</Link>
				</div>
			</div>
		);
	} else {
		return (
			<div className="Reminders">
				<h2>Today's Reminders</h2>
				<div className="reminder-entry">
					<p>
						<span>You are all done for the day!</span>
					</p>
				</div>
			</div>
		);
	}
}

function InfoSummary({ mood }) {
	// TODO: Analyze user's data and determine what to say for the summary.
	const summary = "You don't have any mood history yet."
	return (
		<div className="InfoSummary">
			<BarChart>{mood}

			</BarChart>
		</div>
	);
}

/** The main content of the home screen. This should be rendered in a Main Screen component, after the top navigation bar and before the page footer. */
function HomePage() {
	/* The home screen needs:
		X the top nav bar
		X the welcome message
		X the day's reminders
		X the "Take Test" button
		X the mood / energy / sleep summary
		X the closing footer stuff */
	const [isLoading, setIsLoading] = useState(true);
	const [name, setName] = useState("");
	const [summary, setSummary] = useState("Loading your data...");
	const [mood, setMood] = useState([]);
	const [checkMood, setCheckMood] = useState(false)
	const [welcomeMsg, setWelcomeMsg] = useState("");
	const fetchUserData = async () => {
		try {
			const currentUser = auth.currentUser;
			if (!currentUser) {
				console.error("No user is signed in.");
				setSummary("Please log in to view your data.");
				return;
			}
			const userId = currentUser.uid;
			const date = new Date()
			const dateString = new Date(date.dateString)
			const startOfWeek = new Date(date);
			startOfWeek.setDate(date.getDate() - date.getDay());
			startOfWeek.setHours(0, 0, 0, 0);
			const endOfWeek = new Date(date);
			endOfWeek.setDate(date.getDate() + (6 - date.getDay()));
			endOfWeek.setHours(23, 59, 59, 999);
			const startOfDay = new Date(date);
			startOfDay.setHours(0, 0, 0, 0);
			const endOfDay = new Date(date);
			endOfDay.setHours(23, 59, 59, 999);
			const moodEntriesCollection = collection(db, "user_info", userId, "Data", "Mood Poll", "Mood_entries");

			//Returns name to homepage
			const unsubName = onSnapshot(doc(db, "user_info", userId, "Data", "Profile"), doc => {
				if (doc.exists()) {
					const userData = doc.data()
					setName(userData.Name || "User")
					setSummary(`Welcome back, ${userData.name}!`)
				} else {
					console.log("No user data found for UID:", userId)
					setSummary("No user data found.")
				}
			})

			//Welcome message
			const messages = []
			const welcomeMessage = collection(db, "Motivation")
			const queryMessage = await getDocs(welcomeMessage)
			queryMessage.forEach((doc) => {
				messages.push(doc.data().message);
			})
			const randomIndex = Math.floor(Math.random() * messages.length);
			setWelcomeMsg(messages[randomIndex])

			//Mood level
			const moodLevelq = query(
				moodEntriesCollection,
				where("date", ">=", Timestamp.fromDate(startOfWeek)),
				where("date", "<=", Timestamp.fromDate(endOfWeek)),
				orderBy("date")
			);
			const moodLevelqs = await getDocs(moodLevelq);
			const moodData = [];
			moodLevelqs.forEach((doc) => {
				moodData.push(doc.data());
			});
			setMood(moodData)
			//Check if mood poll is already entered for the day
			const checkMoodq = query(
				moodEntriesCollection,
				where("date", ">=", Timestamp.fromDate(startOfDay)),
				where("date", "<=", Timestamp.fromDate(endOfDay)),
			)
			const checkMoodqs = await getDocs(checkMoodq);
			checkMoodqs.forEach((doc) => {
				if (doc.exists()) {
					setCheckMood(true)
				}
			});
		} catch (error) {
			console.error("Error fetching user data:", error);
			setSummary("Error loading data.");
		} finally {
			setIsLoading(false);
		}
		return () => {
			unsubName();
			setIsLoading(false);
		};
	};
	useEffect(() => {
		fetchUserData();
	}, []);
	//Loading state
	if (isLoading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<ClipLoader color="#36D7B7" size={50} />
			</div>
		);
	}
	return (
		<MainScreen>
			<div className="HomeScreen">
				<HomeWelcomeMsg name={name} welcomeMsg={welcomeMsg} />
				<div className="HomeScreen-info">
					<Reminders checkMood={checkMood} />
					<InfoSummary mood={[mood]} />
				</div>
			</div>
		</MainScreen>
	);
}

export default HomePage;
