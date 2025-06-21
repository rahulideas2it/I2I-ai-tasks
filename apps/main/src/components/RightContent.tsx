import { Box } from '@mui/material'
import { useState } from 'react'

interface RightContentProps {
  isEvil: boolean
}

export const RightContent = ({ isEvil }: RightContentProps) => {
  const [shapeState, setShapeState] = useState(0) // 0: circle, 1: rectangle
  
  const handleClick = () => {
    setShapeState((prev) => (prev + 1) % 2)
  }
  
  return (
  <Box sx={{ 
    bgcolor: 'transparent',
    width: '100%',
    maxWidth: '450px',
    height: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  }}>
    <Box sx={{ 
      position: 'relative', 
      width: { xs: '280px', md: '320px' }, 
      height: { xs: '280px', md: '320px' },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>

      
      {/* Radial Gradient Background Effects */}
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '150px',
        height: '150px',
        borderRadius: shapeState === 0 ? '50%' : '20%',
        background: isEvil 
          ? 'radial-gradient(circle, rgba(211,47,47,0.15) 0%, rgba(139,0,0,0.08) 40%, transparent 70%)'
          : 'radial-gradient(circle, rgba(25,118,210,0.15) 0%, rgba(0,123,255,0.08) 40%, transparent 70%)',
        border: `1px solid ${isEvil ? 'rgba(211,47,47,0.3)' : 'rgba(25,118,210,0.3)'}`,
        animation: 'pulse-bg 4s ease-in-out infinite',
        transition: 'all 0.5s ease',
        zIndex: 0,
        '@keyframes pulse-bg': {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.6 },
          '50%': { transform: 'translate(-50%, -50%) scale(1.2)', opacity: 1 }
        }
      }} />
      
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '250px',
        height: '250px',
        borderRadius: shapeState === 0 ? '50%' : '20%',
        background: isEvil 
          ? 'radial-gradient(circle, transparent 60%, rgba(211,47,47,0.1) 70%, rgba(139,0,0,0.05) 85%, transparent 100%)'
          : 'radial-gradient(circle, transparent 60%, rgba(25,118,210,0.1) 70%, rgba(0,123,255,0.05) 85%, transparent 100%)',
        border: `1px dashed ${isEvil ? 'rgba(211,47,47,0.2)' : 'rgba(25,118,210,0.2)'}`,
        animation: 'pulse-outer 6s ease-in-out infinite reverse',
        transition: 'all 0.5s ease',
        zIndex: 0,
        '@keyframes pulse-outer': {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.4 },
          '50%': { transform: 'translate(-50%, -50%) scale(1.1)', opacity: 0.8 }
        }
      }} />
      
      {/* Center Robot Emoji with Click */}
      <Box 
        onClick={handleClick}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '2rem',
          zIndex: 3,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          animation: 'float 3s ease-in-out infinite',
          '&:hover': {
            transform: 'translate(-50%, -50%) scale(1.2)',
            filter: isEvil 
              ? 'drop-shadow(0 0 15px rgba(211,47,47,0.8))'
              : 'drop-shadow(0 0 15px rgba(25,118,210,0.8))',
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translate(-50%, -50%) translateY(0px)' },
            '50%': { transform: 'translate(-50%, -50%) translateY(-5px)' }
          }
        }}
      >
        {isEvil ? '🥷' : '🤖'}
      </Box>
      

    </Box>
  </Box>
  )
}