import '../styles/GlobalStyles.css';

import SettingsScreen from './SettingsScreen.jsx';
import MedicationsList from "./user_inputs/MedicationsList.jsx"


/** The main content for the medication page. */
function Medications()
{
	return (
		<div className="Settings">
			<h2>Manage Medications</h2>
			<p>You can enter the medications you take regularly to save time when logging your day.</p>
			<div>
				<MedicationsList />
			</div>
		</div>
	);
}

function MedicationsPage()
{
	return (
		<>
			<SettingsScreen>
				<Medications />
			</SettingsScreen>
		</>
	);
}

export default MedicationsPage;