import '../styles/GlobalStyles.css';

import SettingsScreen from './SettingsScreen.jsx';
import FormInput from './user_inputs/FormInput.jsx';

import { Link, useNavigate } from 'react-router-dom';


// TODO: This is very similar to the Settings page, so maybe figure out a way to recycle the components.

function ProfileSettings()
{
	return(
		<div className="SettingsControls">
			<form>
				<div className="SettingsControls-column">
					<FormInput
						label="Username"
						desc="The name you use to log in."
						verticalAlignment="true"
					>
						<input
							type="text"
							id="settings-username"
							placeholder="xX_Sunny-Haz3_Xx"
						/>
					</FormInput>
					
					<FormInput
						label="Name"
						desc="The name you want to go by."
						verticalAlignment="true"
					>
						<input
							type="text"
							id="settings-name"
							placeholder="Lord Farquaad"
						/>
					</FormInput>
					
					<FormInput
						label="Email address"
						verticalAlignment="true"
					>
						<input
							type="email"
							id="settings-email-address"
							placeholder="example@snailmail.com"
						/>
					</FormInput>
					
					<FormInput
						label="Phone"
						desc="(Optional)"
						verticalAlignment="true"
					>
						<input
							type="tel"
							id="settings-email-address"
							placeholder="(972) 000-0000"
						/>
					</FormInput>
				</div>
				
				<div className="SettingsControls-column">
					<FormInput
						label="What would you like help with?"
						desc="If you're not sure, try imagining this: what would be different about your life if you could magically change anything you wanted to?"
						verticalAlignment="true"
					>
						<textarea
							id="settings-user-wishes"
							name="settings-user-wishes"
							placeholder="Example: I wish I could be less stressed about work"
						/>
					</FormInput>
					
					<FormInput
						label="What are your goals?"
						desc="If you're not sure, try looking at what you want help with and imagining what it would be like for those dreams to come true."
						verticalAlignment="true"
					>
						<textarea
							id="settings-user-goals"
							name="settings-user-goals"
							placeholder="Example: I want to work towards feeling like it's ok to set boundaries with coworkers and other people."
						/>
					</FormInput>
					
					<FormInput
						label="Current health concerns / conditions"
						desc="Automatically filter professional help results based on what applies to you. (Optional)"
						verticalAlignment="true"
					>
						<textarea
							id="settings-user-health-concerns"
							name="settings-user-health-concerns"
							placeholder="Examples: ADHD, anxiety, interpersonal boundaries"
						/>
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
			</form>
		</div>
	);
}

/** The main content for the profile page. */
function Profile()
{
	return (
		<div className="Profile">
			<h2>Profile Settings</h2>
			<ProfileSettings />
		</div>
	);
}

/** The profile page, plus the standard header and footer. */
function ProfilePage()
{
	return (
		<>
			<SettingsScreen>
				<Profile />
			</SettingsScreen>
		</>
	);
}

export default ProfilePage;