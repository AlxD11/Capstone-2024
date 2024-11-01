import './GlobalStyles.css'


/** The welcome message for the home screen. */
function HomeWelcomeMsg()
{
	return(
		<div className="HomeWelcomeMsg">
			<h2>Welcome, User</h2>
			<p>Take time for yourself today to do one thing that makes you smile.</p>
		</div>
	);
}

/** Displays the reminder message and button for the user to enter their daily mood stuff. */
function ReminderMoodLog()
{
	return(
		<div className="reminder-entry">
			<p>You haven't logged your mood for today. Would you like to?</p>
			<button>Take test</button>
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

function InfoSummary()
{
	// TODO: Analyze user's data and determine what to say for the summary.
	const summary = "You don't have any mood history yet."

	return(
		<div className="InfoSummary">
			<p>{summary}</p>
		</div>
	);
}

/** The main content of the home screen. This should be rendered after the top navigation bar and before the page footer. */
function HomeScreen()
{
	/* The home screen needs:
		- the top nav bar
		- the welcome message
		- the day's reminders
		- the "Take Test" button
		- the mood / energy / sleep summary
		- the closing footer stuff */

	return(
		<div className="HomeScreen">
			<HomeWelcomeMsg/>
			
			<div className="HomeScreen-info">
				<Reminders/>
				<InfoSummary/>
			</div>
		</div>
	)
}

export default HomeScreen