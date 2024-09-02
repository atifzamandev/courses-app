import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme/theme'
import ContactInfo from './pages/ContactInfo'
import { SelectedCourseProvider } from './contexts/SelectedCourseContext'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SelectedCourseProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact-info' element={<ContactInfo />} />
        </Routes>
      </SelectedCourseProvider>
    </ThemeProvider>
  )
}

export default App
