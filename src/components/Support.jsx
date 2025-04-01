import '../styles/GlobalStyles.css';
import MainScreen from './MainScreen.jsx';

function Support() {
    return (
        <div className="Support">
            <h2>Contact & Support</h2>
            <p>
                If you or someone you know needs support, please don’t hesitate to reach out. Below are various ways you can connect with mental health professionals, crisis helplines, and community support groups.
            </p>

            <div className="contact-section">
                <h3>📞 Emergency & Crisis Support</h3>
                <p><strong>National Suicide Prevention Lifeline:</strong> 988 (24/7, Free & Confidential)</p>
                <p><strong>Crisis Text Line:</strong> Text <em>"HELLO"</em> to 741741</p>
                <p><strong>Substance Abuse Helpline:</strong> 1-800-662-HELP (4357)</p>
            </div>

            <div className="contact-section">
                <h3>📬 Reach Out to Us</h3>
                <p><strong>Email:</strong> <a href="mailto:support@yourwebsite.com">support@yourwebsite.com</a></p> {/*placeholder email for rn*/}
                <p><strong>Phone:</strong> <span className="phone-number">+1 (234) 567-890</span></p> {/*placeholder number for rn*/}
            </div>

           

            
        </div>
    );
}

function SupportPage() {
    return (
        <>
            <MainScreen>
                <Support />
            </MainScreen>
        </>
    );
}

export default SupportPage;
