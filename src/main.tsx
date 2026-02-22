import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@styles/fonts.css'
import '@styles/global.css'
import '@styles/components.css'
import '@styles/theme-toggle.css'
import '@styles/skeleton.css'
import '@styles/interactive.css'
import '@styles/accessibility.css'
import '@styles/performance.css'
import '@styles/pwa.css'
import App from './App.tsx'
import { initializeGA4 } from '@utils/ga4'

// Initialize GA4 on app load
initializeGA4()

// eslint-disable-next-line react-refresh/only-export-components
function Main() {
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>
)
