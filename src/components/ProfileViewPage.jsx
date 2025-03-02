import '../styles/GlobalStyles.css';

import SettingsScreen from './SettingsScreen.jsx';
import FormInput from './user_inputs/FormInput.jsx';

import { Link, useNavigate } from 'react-router-dom';


function ViewProfileSettings()
{
	// TODO: Get from backend
	
	const username = "Username";
	const name = "Name";
	const email = "email@ye.haw";
	const phone = "(972) 000-0000";
	
	// Will probably change to desiredHelp
	const userWishes = "I wish I could be less stressed about work.";
	const userGoals = "I want to work towards feeling like it's ok to set boundaries with coworkers and other people.";
	// Make as a list separated by semicolons (??)
	const healthConcerns = "ADHD, anxiety, interpersonal boundaries";
	
	// TODO: Remove <FormInput> and replace with something not intended for user input. :P
	return(
		<div className="ViewProfileSettings">
			<div className="SettingsControls-column">
				<FormInput
					label="Username"
					desc="The name you use to log in."
					verticalAlignment="true"
				>
					<p className="ViewSetting">{username}</p>
				</FormInput>
				
				<FormInput
					label="Name"
					desc="The name we'll call you."
					verticalAlignment="true"
				>
					<p className="ViewSetting">{name}</p>
				</FormInput>
				
				<FormInput
					label="Email address"
					verticalAlignment="true"
				>
					<p className="ViewSetting">{email}</p>
				</FormInput>
				
				<FormInput
					label="Phone"
					desc="(Optional)"
					verticalAlignment="true"
				>
					<p className="ViewSetting">{phone}</p>
				</FormInput>
			</div>
			
			<div className="SettingsControls-column">
				<FormInput
					label="What would you like help with?"
					desc="If you're not sure, try imagining this: what would be different about your life if you could magically change anything you wanted to?"
					verticalAlignment="true"
				>
					<p className="ViewSetting">{userWishes}</p>
				</FormInput>
				
				<FormInput
					label="What are your goals?"
					desc="If you're not sure, try looking at what you want help with and imagining what it would be like for those dreams to come true."
					verticalAlignment="true"
				>
					<p className="ViewSetting">{userGoals}</p>
				</FormInput>
				
				<FormInput
					label="Current health concerns / conditions"
					desc="Automatically filter professional help results based on what applies to you. (Optional)"
					verticalAlignment="true"
				>
					<p className="ViewSetting">{healthConcerns}</p>
				</FormInput>
				
				<FormInput
					label="Current medications"
					desc="Save your medications for quick access in your mood journal. (Optional)"
					verticalAlignment="true"
				>
					<button
						type="button"
						className="linked-button"
					>
						<Link to ="/medications">Manage medications</Link>
					</button>
				</FormInput>
			</div>
		</div>
	);
}

/** The main content for the profile page. */
function ViewProfile()
{
	return (
		<div className="Profile">
			<h2>Profile Settings</h2>
			<ViewProfileSettings />
			<button className="linked-button"><Link to ="/edit-profile">Edit profile</Link></button>
		</div>
	);
}

/** The profile page, plus the standard header and footer. */
function ProfileViewPage()
{
	return (
		<>
			<SettingsScreen>
				<ViewProfile />
			</SettingsScreen>
		</>
	);
}

export default ProfileViewPage;