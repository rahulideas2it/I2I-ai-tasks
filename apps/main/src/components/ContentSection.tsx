import { Container, Box, Typography } from '@mui/material'

interface ContentSectionProps {
  isEvil: boolean
}

const SampleCard = ({ index, isEvil }: { index: number, isEvil: boolean }) => {

  const gradients = isEvil ? [
    'linear-gradient(135deg, #e53935 0%, #c62828 100%)',
    'linear-gradient(135deg, #e53935 20%, #c62828 80%)',
    'linear-gradient(135deg, #e53935 30%, #c62828 70%)',
    'linear-gradient(135deg, #e53935 40%, #c62828 60%)',
    'linear-gradient(135deg, #e53935 50%, #c62828 50%)',
    'linear-gradient(135deg, #e53935 60%, #c62828 40%)',
    'linear-gradient(135deg, #e53935 70%, #c62828 30%)',
    'linear-gradient(135deg, #e53935 80%, #c62828 20%)'  
  ] : [
    'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)',
    'linear-gradient(135deg, #1e88e5 20%, #1565c0 80%)',
    'linear-gradient(135deg, #1e88e5 30%, #1565c0 70%)',
    'linear-gradient(135deg, #1e88e5 40%, #1565c0 60%)',
    'linear-gradient(135deg, #1e88e5 50%, #1565c0 50%)',
    'linear-gradient(135deg, #1e88e5 60%, #1565c0 40%)',
    'linear-gradient(135deg, #1e88e5 70%, #1565c0 30%)',
    'linear-gradient(135deg, #1e88e5 80%, #1565c0 20%)'  
  ]

  const titles = [
    'CARD 1', 'CARD 2', 'CARD 3', 'CARD 4', 'CARD 5', 'CARD 6', 'CARD 7', 'CARD 8'
  ]
  


  const shapes = ['circle', 'square', 'triangle', 'diamond']
  
  const getShapeStyle = (shapeType: string, size: number) => {
    const baseStyle = {
      position: 'absolute' as const,
      bgcolor: 'rgba(255,255,255,0.3)'
    }
    
    switch(shapeType) {
      case 'square':
        return { ...baseStyle, width: `${size}px`, height: `${size}px` }
      case 'triangle':
        return { 
          ...baseStyle, 
          width: 0, 
          height: 0,
          bgcolor: 'transparent',
          borderLeft: `${size/2}px solid transparent`,
          borderRight: `${size/2}px solid transparent`,
          borderBottom: `${size}px solid rgba(255,255,255,0.3)`
        }
      case 'diamond':
        return { 
          ...baseStyle, 
          width: `${size}px`, 
          height: `${size}px`, 
          transform: 'rotate(45deg)',
          borderRadius: '2px'
        }
      default:
        return { ...baseStyle, width: `${size}px`, height: `${size}px`, borderRadius: '50%' }
    }
  }

  return (
    <Box sx={{
      bgcolor: 'background.paper',
      borderRadius: '16px',
      border: '1px solid',
      borderColor: 'divider',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
      }
    }}>
      <Box sx={{
        width: '100%',
        height: '160px',
        background: gradients[2] || gradients[0],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Motion graphic elements */}
        <Box sx={{
          ...getShapeStyle(shapes[0], 12),
          top: '10px',
          right: '15px',
          animation: 'float1 3s ease-in-out infinite',
          '@keyframes float1': {
            '0%, 100%': { transform: shapes[0] === 'diamond' ? 'rotate(45deg) translateY(0px)' : 'translateY(0px)' },
            '50%': { transform: shapes[0] === 'diamond' ? 'rotate(45deg) translateY(-8px)' : 'translateY(-8px)' }
          }
        }} />
        <Box sx={{
          ...getShapeStyle(shapes[1], 10),
          bottom: '15px',
          left: '20px',
          animation: 'float2 4s ease-in-out infinite',
          '@keyframes float2': {
            '0%, 100%': { transform: shapes[1] === 'diamond' ? 'rotate(45deg) translateY(0px)' : 'translateY(0px)' },
            '50%': { transform: shapes[1] === 'diamond' ? 'rotate(45deg) translateY(-6px)' : 'translateY(-6px)' }
          }
        }} />
        <Box sx={{
          ...getShapeStyle(shapes[2], 8),
          top: '20px',
          left: '10px',
          animation: 'float3 2.5s ease-in-out infinite',
          '@keyframes float3': {
            '0%, 100%': { transform: shapes[2] === 'diamond' ? 'rotate(45deg) translateY(0px)' : 'translateY(0px)' },
            '50%': { transform: shapes[2] === 'diamond' ? 'rotate(45deg) translateY(-4px)' : 'translateY(-4px)' }
          }
        }} />
        
        <Box sx={{
          bgcolor: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '6px',
          px: 2,
          py: 1,
          backdropFilter: 'blur(10px)'
        }}>
          <Typography variant="body2" sx={{ 
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.75rem',
            letterSpacing: '0.5px',

          }}>
            {titles[index] || `CARD ${index + 1}`}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Sample Card {index + 1}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4 }}>
          This is sample content for card {index + 1}. Will be redefined later.
        </Typography>
      </Box>
    </Box>
  )
}

export const ContentSection = ({ isEvil }: ContentSectionProps) => {
  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      overflow: 'hidden' 
    }}>
      <Container maxWidth="lg" sx={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Box sx={{
          overflowX: 'auto',
          overflowY: 'hidden',
          display: 'flex',
          gap: 4,
          pb: 2,
          width: '100%',
          scrollSnapType: 'x mandatory',
          '&::-webkit-scrollbar': {
            height: '8px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0,0,0,0.1)',
            borderRadius: '4px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: isEvil ? 'rgba(211,47,47,0.5)' : 'rgba(25,118,210,0.5)',
            borderRadius: '4px'
          }
        }}>
          {Array.from({ length: 9 }, (_, index) => (
            <Box key={index} sx={{ 
              width: '260px', 
              maxWidth: '260px', 
              flexShrink: 0,
              scrollSnapAlign: 'start'
            }}>
              <SampleCard index={index} isEvil={isEvil} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}