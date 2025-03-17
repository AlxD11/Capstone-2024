import '../styles/GlobalStyles.css';

import MainScreen from './MainScreen.jsx';

import { Link, useNavigate } from 'react-router-dom';

function FindTherapist({ link })
{
	return(<div>
		<p> Locate a <a href={link}> therapist near you</a>.</p>
	</div>)
	
}
function MedicationResources({ link })
{
	return(<div>
		<p> Want to learn more about your<a href={link}> current medication</a>?</p>
	</div>)
	
}
function OtherResources({ link })
{
	return(<div>
		<p> More informative resources about mental health can be found at this <a href={link}>Mental Health Guide</a>.</p>
	</div>)
	
}


function ProfessionalHelp()
{
	
	return (
		<div className="ProfessionalHelp">
			<h2>Professional Help Resources</h2>
			<p>Crisis Hotline: 988</p>
			
			<FindTherapist link="https://www.mentalhealth.com/#:~:text=MentalHealth.com%3A%20Mental%20Health%20Information%20%2B%20Find%20a%20Therapist&text=Publishing%20Dept" />
			<MedicationResources link="https://www.drugs.com/#:~:text=Drugs.com%20is%20the%20most,source%20of%20drug%20information%20online" />
			<OtherResources link="https://www.helpguide.org"/>
		</div>
	);
}


function ProfessionalHelpPage()
{

	return (
		<>
			<MainScreen>
				<ProfessionalHelp />
			</MainScreen>
		</>
	);
}

export default ProfessionalHelpPage
