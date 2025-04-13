import '../styles/GlobalStyles.css';

import SettingsScreen from './SettingsScreen.jsx';
import MedicationsList from "./user_inputs/MedicationsList.jsx"
import { auth } from '../firebase';

/** The main content for the medication page. */
function Medications() {
	const currentUser = auth.currentUser;
	const userId = currentUser ? currentUser.uid : null;

	if (!userId) {
		return <div>Please log in to see your medications.</div>;
	}

	return (
		<div className="Settings">
			<h2>Manage Medications</h2>
			<p>You can enter the medications you take regularly to save time when logging your day.</p>
			<div>
				<MedicationsList userId={userId} />
			</div>
		</div>
	);
}

function MedicationsPage() {
	return (
		<>
			<SettingsScreen>
				<Medications />
			</SettingsScreen>
		</>
	);
}

export default MedicationsPage;