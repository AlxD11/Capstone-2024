import '../styles/GlobalStyles.css';
import MainScreen from './MainScreen.jsx';
import { Link, useNavigate } from 'react-router-dom';

function Func({ link })
{
	<div>
		<p> link is <a href={link}>here</a>. (link)</p>
	</div>
}
function Developers()
{
	
	return (
		<div className="Developers">
			<h2>Resources</h2>
			<p>Put all your cool stuff here</p>
			
			<Func link="https://duckduckgo.com/?t=ffab&q=BroCode+React+cards+tutorial+-noai&iax=videos&ia=videos&iai=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DyYiwxYqQ9vg" />
		</div>
	);
}

// These last two things are what this file "returns."


function DevelopersPage(){
	/* Important: React components MUST return only one element.
	Either wrap everything in a <div>, or use blank tags like this does. */
	return (
		<>
			<MainScreen>
				<Developers />
			</MainScreen>
		</>
	);
}

export default DevelopersPage
