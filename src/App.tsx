import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@context/ThemeContext'
import ResumePage from '@sections/ResumePage'
import PWAPrompt from '@components/PWAPrompt'
import OfflineIndicator from '@components/OfflineIndicator'
import AdminApp from './admin/AdminApp'

const queryClient = new QueryClient()

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/"           element={<ResumePage />} />
              <Route path="/:sectionId" element={<ResumePage />} />
              <Route path="/admin"      element={<AdminApp />} />
              <Route path="*"           element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
          <PWAPrompt />
          <OfflineIndicator />
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App