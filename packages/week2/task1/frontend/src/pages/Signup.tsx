import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { 
  Container, 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  CircularProgress
} from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../services/api'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { user, login } = useAuth()

  if (user) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await authAPI.signup(email, password)
      login(response.data.token, { id: response.data.user.id.toString(), email: response.data.user.email })
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper 
        elevation={0}
        sx={{
          p: 4,
          borderRadius: '16px',
          backgroundColor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 3, 
            textAlign: 'center',
            fontWeight: '600',
            color: '#1e88e5',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}
        >
          Create Account
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            sx={{ mb: 3 }}
          />

          <Button 
            type="submit" 
            fullWidth 
            variant="contained"
            disabled={loading}
            sx={{ 
              py: 1.5,
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '1rem'
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Create Account'}
          </Button>

          <Typography 
            sx={{ 
              mt: 3, 
              textAlign: 'center',
              color: 'text.secondary'
            }}
          >
            Already have an account?{' '}
            <Link 
              to="/login" 
              style={{ 
                color: '#1e88e5', 
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default Signup