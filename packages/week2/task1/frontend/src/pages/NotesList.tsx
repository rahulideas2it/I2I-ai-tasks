import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Alert,
  CircularProgress,
  Fab
} from '@mui/material'
// Removed @mui/icons-material to fix build issues
import Header from '../components/Header'
import { notesAPI, Note } from '../services/api'

const NotesList = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const response = await notesAPI.getAll()
      setNotes(response.data.data)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch notes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return

    try {
      await notesAPI.delete(id)
      setNotes(notes.filter(note => note.id !== id))
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete note')
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {notes.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h4" sx={{ mb: 2, color: '#1e88e5', fontWeight: '600' }}>
              No notes yet
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              Create your first note to get started!
            </Typography>
            <Button 
              component={Link} 
              to="/notes/new" 
              variant="contained"
              size="large"
              sx={{ borderRadius: '8px', px: 4 }}
            >
              Create Note
            </Button>
          </Box>
        ) : (
          <>
            <Typography variant="h4" sx={{ mb: 4, color: '#1e88e5', fontWeight: '600' }}>
              My Notes
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
              {notes.map(note => (
                  <Card sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)'
                    }
                  }}>
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: '600' }}>
                        {note.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        {note.content.substring(0, 150)}...
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Updated: {new Date(note.updated_at).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button 
                        component={Link} 
                        to={`/notes/${note.id}`}
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button 
                        onClick={() => handleDelete(note.id)}
                        color="error"
                        size="small"
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
              ))}
            </Box>
          </>
        )}
        
        <Fab 
          component={Link}
          to="/notes/new"
          color="primary"
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
        >
          +
        </Fab>
      </Container>
    </>
  )
}

export default NotesList