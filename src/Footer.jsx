import appLogo from '/vite.svg'
import './GlobalStyles.css'

function Footer()
{
	return(
		<div className="Footer">
			<div className="Footer-icons">
				<div>
					<a href="https://vite.dev" target="_blank">
						<img src={appLogo} alt="App logo" />
					</a>
				</div>
				<div>
					<a href="https://vite.dev" target="_blank">
						<img src={appLogo} alt="" />
					</a>
					<a href="https://vite.dev" target="_blank">
						<img src={appLogo} alt="" />
					</a>
					<a href="https://vite.dev" target="_blank">
						<img src={appLogo} alt="" />
					</a>
					<a href="https://vite.dev" target="_blank">
						<img src={appLogo} alt="" />
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