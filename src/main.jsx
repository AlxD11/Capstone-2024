import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Footer from './Footer.jsx'
import NavBar from './NavBar.jsx'
import HomeScreen from './HomeScreen.jsx'

/** This is effectively the main() function. This is how the plain HTML code gets our React code. */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavBar />
    <HomeScreen/>
    <Footer />
  </StrictMode>,
)
