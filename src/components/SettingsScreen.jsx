import '../styles/GlobalStyles.css';

import MainScreen from "./MainScreen";
import SettingsSidebar from './SettingsSidebar.jsx';


/** The settings page, plus the standard header and footer.*/
function SettingsScreen({ children })
{
	return (
		<>
			<MainScreen>
				<div className="SettingsScreen">
					<SettingsSidebar />
					{children}
				</div>
			</MainScreen>
		</>
	);
}

export default SettingsScreen;