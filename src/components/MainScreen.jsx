import Footer from './Footer.jsx'
import NavBar from './NavBar.jsx'

/** Displays a typical user-facing page and includes the top navigation bar and standard footer.
 * 
 * @param {Object} param0 
 * @param {React.JSX} param0.children 	The component to render in the main window.
 */
function MainScreen({ children })
{
	return(
		<>
			<NavBar />
				<div className="MainScreen-content">
					{children}
				</div>
			<Footer />
		</>
	);
}

export default MainScreen;