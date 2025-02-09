import '../styles/GlobalStyles.css';

import SettingsScreen from './SettingsScreen.jsx';
import ToggleButton from './user_inputs/ToggleButton.jsx';
import FormInput from './user_inputs/FormInput.jsx';

// IDK what I'm doing and THAT'S OK!
// IDK what I'm doing and THAT'S EXPECTED!
// I'm learning as I go and THAT'S THE GOAL!
// My old code feels like crap and THAT MEANS I'M LEARNING!

/** TODO: Add confirmation dialog to account delete button */
function SettingsControls()
{
	return(
		<div className="SettingsControls">
			<form>
				<div className="SettingsControls-column">
					<FormInput
						label="Receive email reminders"
						desc="Get encouragement to continue your mood journaling journey delivered to your inbox."
					>
						<ToggleButton
							id="settings-email-reminders"
							isChecked="true"
						/>
					</FormInput>
					<FormInput
						label="Receive desktop notifications"
					>
						<ToggleButton
							id="settings-desktop-notifications"
						/>
					</FormInput>
					
					<FormInput
						label="Personalized recommendations"
						desc="See help recommendations based on your (anonymized) data."
					>
						<ToggleButton
							id="settings-personalization"
							isChecked="true"
						/>
					</FormInput>
					
					<FormInput
						label="High contrast mode"
					>
						<ToggleButton
							id="settings-high-contrast"
						/>
					</FormInput>
				</div>
				
				<div className="SettingsControls-column">
					<FormInput
						label="Email reminder interval"
						desc="Select how often you would like to recieve email reminders."
						verticalAlignment="true"
					>
						<input
							type="text"
							placeholder="Enter a number here"
						/>
						<select id="settings-email-interval" name="settings-email-interval">
							<option value="0">minutes</option>
							<option value="1">hours</option>
							<option value="2" selected>days</option>
							<option value="3">weeks</option>
						</select>
					</FormInput>
					
					<FormInput
						label="MFA method"
						desc="Choose whether to require a verification code sent to text or email to log in."
						verticalAlignment="true"
					>
						<select id="settings-mfa" name="settings-mfa">
							<option value="email">Email me</option>
							<option value="phone">Text me</option>
							<option value="none" selected>None</option>
						</select>
					</FormInput>
					
					<FormInput
						label="Delete account"
						desc="Permanently delete your account and data."
						verticalAlignment="true"
					>
						<input
							type="button"
							value="Delete"
						/>
					</FormInput>
				</div>
			</form>
		</div>
	);
}

/** The main content for the settings page. */
function ApplicationSettings()
{
	return (
		<div className="ApplicationSettings">
			<h2>Application Settings</h2>
			<SettingsControls />
		</div>
	);
}

/** The settings page, plus the standard header and footer.
TODO: It'd be good to have a component that includes the header and footer and changes out the body content
instead of having each page re-include the header and footer. */
function ApplicationSettingsPage()
{
	return (
		<>
			<SettingsScreen>
				<ApplicationSettings />
			</SettingsScreen>
		</>
	);
}

export default ApplicationSettingsPage;