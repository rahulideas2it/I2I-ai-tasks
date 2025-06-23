import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotesList from './pages/NotesList'
import NoteEditor from './pages/NoteEditor'
import ProtectedRoute from './components/ProtectedRoute'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5',
    },
    background: {
      default: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <NotesList />
                </ProtectedRoute>
              } />
              <Route path="/notes/new" element={
                <ProtectedRoute>
                  <NoteEditor />
                </ProtectedRoute>
              } />
              <Route path="/notes/:id" element={
                <ProtectedRoute>
                  <NoteEditor />
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </AuthProvider>
      </Box>
    </ThemeProvider>
  )
}

export default App