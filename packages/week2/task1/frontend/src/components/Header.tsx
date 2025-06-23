import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material'
import { Note, Add, Logout } from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.1)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ px: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Note sx={{ color: '#1e88e5', mr: 1 }} />
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#1e88e5',
                fontWeight: '600',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}
            >
              Notes App
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button 
              component={Link} 
              to="/"
              startIcon={<Note />}
              sx={{ color: 'text.primary' }}
            >
              My Notes
            </Button>
            <Button 
              component={Link} 
              to="/notes/new"
              variant="contained"
              startIcon={<Add />}
              sx={{ borderRadius: '8px' }}
            >
              New Note
            </Button>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                mx: 2
              }}
            >
              Welcome, {user?.email}
            </Typography>
            <Button 
              onClick={logout}
              startIcon={<Logout />}
              color="error"
              sx={{ borderRadius: '8px' }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header