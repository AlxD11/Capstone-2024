/* Imports the global style sheet that has CSS rules for basically every HTML element.
The path says to go to the parent folder (..), then go to styles/GlobalStyles.css.

Side Notes About Style Sheets:

You can import as many style sheets as you want this way. That said, I'd reccommend making your own separate style sheet
since I'm planning to break apart GlobalStyles.css. (I'm also more than happy to write the styling rules
for you since this part is kinda uuhhhHHhHHGgGggGGGGGGGG GG G GG GG G-)

Importing the style sheet like this means we don't need to import
it in the HTML (like <link rel="stylesheet" type="text/css" href="./styles.css" media="screen, print">).*/
import '../styles/GlobalStyles.css';


/* Imports the generic "container screen" that will display your page. The container screen automatically
includes the top navigation bar and the bottom footer. Your page content is displayed between them.

Notes:

The method to my naming madness here is that "screens" contain "pages," with "pages" contianing most
of the actual content.

The Settings page have a different container screen, which is why they look different from like, the home page.*/
import MainScreen from './MainScreen.jsx';

/* Imports the magic React thingy that lets us link to other pages within the application.
You may not need this, but it's here just in case.

Important: If you need to use this, you'll need to make sure that the page you're linking to
already has a URL and is listed in the App.jsx routing table thingy. If it isn't there,
you'll need to add it. I can help you with this - it's easy but kinda confusing the first time you do it.

Notes:
This is for INTERNAL links. It's NOT the same as an <a href="link-to-external-url"> ... I think. */
import { Link, useNavigate } from 'react-router-dom';


/* You can make mini-components to help break up the work and organize your page.
Basicaly, any components you make in this file are "private" unless exported (see the line at the end of this file).

This also demos how to "pass parameters" (formally known as "properites") to a component. */
function INeedMoarCoffee({ link })
{
	<div>
		<p>You might want to look into a tutorial for React "card" components to get started. You can find some <a href={link}>here</a>. (I linked one by BroCode)</p>
	</div>
}

/* Each function that returns HTML like this is a React component.
I tend to build the component so that most of the HTML goes in a function like this,
and then the whole, finalized component just includes this stuff and then reutnr severything wrapped in the main screen. */
function ProfessionalHelp()
{
	/* CSS Note:
	I've been giving my components a CSS class name that matches their component name.
	That way, in the CSS, I can reference them more easily.
	
	For this setup, you could use .ProfessionalHelp to select just this block of code.
	
	Note that unlike normal HTML, it's "className" and not "class".*/
	
	return (
		<div className="ProfessionalHelp">
			<h2>Professional Help Resources</h2>
			<p>Put all your cool stuff here</p>
			
			<INeedMoarCoffee link="https://duckduckgo.com/?t=ffab&q=BroCode+React+cards+tutorial+-noai&iax=videos&ia=videos&iai=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DyYiwxYqQ9vg" />
		</div>
	);
}

// These last two things are what this file "returns."

/* Returns your page neatly displayed inside the container for the generic / main screens.
This is where the header and footer get added.

I tend to use this structure so it's one less HTML element to have to indent for. */
function ProfessionalHelpPage()
{
	/* Important: React components MUST return only one element.
	Either wrap everything in a <div>, or use blank tags like this does. */
	return (
		<>
			<MainScreen>
				<ProfessionalHelp />
			</MainScreen>
		</>
	);
}

/* I'm not 100% sure what this does, but it's extremely important.
I think it tells whoever includes this file that they can use the ProfessionalHelpPage component.
Is basically the "return" statement for this whole file. */
export default ProfessionalHelpPage
