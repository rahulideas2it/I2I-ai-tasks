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
    maxWidth: '500px',
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    order: { xs: 2, md: 1 },
    overflow: 'hidden'
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
      
      {/* Medium Circle - Top Left (Behind) */}
      <Box sx={{
        position: 'absolute',
        top: '10%',
        left: '8%',
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        bgcolor: isEvil ? 'rgba(229,57,53,0.25)' : 'rgba(30,136,229,0.25)',
        animation: 'float1 3.5s ease-in-out infinite',
        zIndex: 0,
        opacity: 1
      }} />
      
      {/* Medium Triangle - Top Right (Behind) */}
      <Box sx={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '0',
        height: '0',
        borderLeft: '20px solid transparent',
        borderRight: '20px solid transparent',
        borderBottom: `35px solid ${isEvil ? 'rgba(229,57,53,0.3)' : 'rgba(30,136,229,0.3)'}`,
        animation: 'float2 4s ease-in-out infinite',
        zIndex: 0,
        opacity: 0.9
      }} />
      
      {/* Large Square - Bottom Left (Behind) */}
      <Box sx={{
        position: 'absolute',
        bottom: '15%',
        left: '5%',
        width: '60px',
        height: '60px',
        transform: 'rotate(45deg)',
        bgcolor: isEvil ? 'rgba(229,57,53,0.2)' : 'rgba(30,136,229,0.2)',
        borderRadius: '8px',
        animation: 'float3 3.2s ease-in-out infinite',
        zIndex: 0,
        opacity: 0.75
      }} />
      
      {/* Medium Diamond - Bottom Right (Behind) */}
      <Box sx={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '30px',
        height: '30px',
        transform: 'rotate(45deg)',
        bgcolor: isEvil ? 'rgba(229,57,53,0.25)' : 'rgba(30,136,229,0.25)',
        borderRadius: '5px',
        animation: 'float4 2.8s ease-in-out infinite',
        zIndex: 0,
        opacity: 1
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
          zIndex: 10,
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
      
      {/* Add keyframes for all animations */}
      <style>
        {`
          @keyframes float1 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          @keyframes float2 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          @keyframes float3 {
            0%, 100% { transform: rotate(45deg) translateY(0px); }
            50% { transform: rotate(45deg) translateY(-10px); }
          }
          @keyframes float4 {
            0%, 100% { transform: rotate(45deg) translateY(0px); }
            50% { transform: rotate(45deg) translateY(-6px); }
          }
        `}
      </style>
      

    </Box>
  </Box>
  )
}