import '../styles/GlobalStyles.css';
import MainScreen from './MainScreen.jsx';

function Developers() {
    return (
        <div className="Developers">
            <h2>Meet the Developers</h2>
            <p>
                This website was developed by a group of students from the University of North Texas (UNT) as part of our Senior Capstone Project. Below are the developers who contributed to this project:
            </p>

            <div className="developer-section">
                <h3>🧑‍💻 Developers</h3>
                <ul>
                    <li><strong>Alex Dierks:</strong> <a href="mailto:alexdierks@my.unt.edu">alexdierks@my.unt.edu</a></li>
					<li><strong>Rohan James:</strong> <a href="mailto:rohanjames@my.unt.edu">rohanjames@my.unt.edu</a></li>
					<li><strong>Vishnu Kumar:</strong> <a href="mailto:vishnuvarshankrishnakumar@my.unt.edu">vishnuvarshankrishnakumar@my.unt.edu</a></li>
                    <li><strong>Salma Omary:</strong> <a href="mailto:salmaomary@my.unt.edu">salmaomary@my.unt.edu</a></li>
					<li><strong>Deakon Watson:</strong> <a href="mailto:deakonwatson@my.unt.edu">deakonwatson@my.unt.edu</a></li>
                </ul>
            </div>
        </div>
    );
}

function DevelopersPage() {
    return (
        <>
            <MainScreen>
                <Developers />
            </MainScreen>
        </>
    );
}

export default DevelopersPage;
