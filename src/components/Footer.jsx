import appLogo from '../assets/app_logo.png';
import vwmLogo from '../assets/logo_vwm.png';
import hlLogo from '../assets/logo_hl.png';
import ptLogo from '../assets/logo_pt.png';

import { Link, useNavigate } from 'react-router-dom';

import '../styles/GlobalStyles.css';

function Footer()
{
	return(
		<div className="Footer">
			<div className="Footer-icons">
				<div>
					<Link to ="/home">
						<img src={appLogo} className="logo" alt="App logo" />
					</Link>
				</div>
				<div>
					<a href="https://www.verywellmind.com/" target="_blank">
						<img src={vwmLogo} alt="" />
					</a>
					<a href="https://www.healthline.com/" target="_blank">
						<img src={hlLogo} alt="" />
					</a>
					<a href="https://psychologytoday.com/" target="_blank">
						<img src={ptLogo} alt="" />
					</a>
				</div>
			</div>

			<div className="Footer-resources">
				<p><b>Resources</b></p>
				<p><a href="">Professional Help</a></p>
				<p><a href="">Best Practices</a></p>
				<p><a href="">Support</a></p>
				<p><a href="">Developers</a></p>
			</div>
		</div>
	);
}

export default Footer