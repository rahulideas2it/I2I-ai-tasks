import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert
} from '@mui/material'
// Removed @mui/icons-material to fix build issues
import Header from '../components/Header'
import { notesAPI } from '../services/api'

const NoteEditor = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const isEditing = Boolean(id)

  useEffect(() => {
    if (isEditing) {
      fetchNote()
    }
  }, [id])

  const fetchNote = async () => {
    if (!id) return
    
    setLoading(true)
    try {
      const response = await notesAPI.getById(id)
      setTitle(response.data.data.title)
      setContent(response.data.data.content)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch note')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (isEditing && id) {
        await notesAPI.update(id, title, content)
        setSuccess('Note updated successfully!')
      } else {
        await notesAPI.create(title, content)
        setSuccess('Note created successfully!')
        setTimeout(() => navigate('/'), 1500)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save note')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ py: 4 }}>
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
              color: '#1e88e5',
              fontWeight: '600',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}
          >
            {isEditing ? 'Edit Note' : 'Create New Note'}
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Content"
              multiline
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                type="submit" 
                variant="contained"
                disabled={loading}
                sx={{ 
                  borderRadius: '8px',
                  fontWeight: '600',
                  px: 3
                }}
              >
                {loading ? 'Saving...' : (isEditing ? 'Update Note' : 'Create Note')}
              </Button>
              <Button 
                variant="outlined"
                onClick={() => navigate('/')}
                sx={{ 
                  borderRadius: '8px',
                  fontWeight: '600',
                  px: 3
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default NoteEditor