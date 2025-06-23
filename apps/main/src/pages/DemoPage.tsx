import { useParams } from 'react-router-dom'
import { Container, Typography, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export const DemoPage = () => {
  const { demoId } = useParams<{ demoId: string }>()

  const demoContent: Record<string, { title: string; description: string; iframe?: string }> = {
    'notes-app': {
      title: '📝 Notes App Demo',
      description: 'Full-stack notes application with React frontend and Express backend.',
      iframe: 'https://notes-frontend-demo.vercel.app'
    },
    'legacy-modern': {
      title: '🏗️ Legacy vs Modern Demo', 
      description: 'Comparison between legacy and modern Express applications.',
      iframe: 'https://legacy-modern-demo.vercel.app'
    },
    'shopping-cart': {
      title: '🛒 Shopping Cart Demo',
      description: 'TDD shopping cart with 100% test coverage.',
      iframe: 'https://shopping-cart-demo.vercel.app'
    },
    'performance-fixes': {
      title: '⚡ Performance Fixes Demo',
      description: 'React performance optimization showcase.',
      iframe: 'https://performance-fixes-demo.vercel.app'
    }
  }

  const demo = demoContent[demoId || '']

  if (!demo) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4">Demo not found</Typography>
        <Link to="/">
          <Button sx={{ mt: 2 }}>← Back to Home</Button>
        </Link>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button sx={{ mb: 3 }}>← Back to Home</Button>
      </Link>
      
      <Typography variant="h3" sx={{ mb: 2 }}>{demo.title}</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>{demo.description}</Typography>
      
      <Box sx={{ 
        width: '100%', 
        height: '80vh', 
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <Typography variant="h6" sx={{ p: 2, textAlign: 'center' }}>
          Demo will be available once individual packages are deployed
        </Typography>
      </Box>
    </Container>
  )
}