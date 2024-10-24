import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ExampleApp from './ExampleApp.jsx'

/** This is effectively the main() function. This is how the plain HTML code gets our React code. */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExampleApp />
  </StrictMode>,
)
