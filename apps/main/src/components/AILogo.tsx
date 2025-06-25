import { Box, Typography } from '@mui/material'

interface AILogoProps {
  isEvil: boolean
  primaryColor: string
}

export const AILogo = ({ isEvil, primaryColor }: AILogoProps) => {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if ((window as any).triggerRobotJump) {
      (window as any).triggerRobotJump()
    }
  }
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography 
        variant="h4" 
        component="div" 
        onClick={handleLogoClick}
        sx={{ 
          fontWeight: 'bold', 
          color: primaryColor,
          fontFamily: 'monospace',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            opacity: 0.8
          },
          '&:active': {
            transform: 'scale(0.95)'
          }
        }}
      >
        {isEvil ? '🥷HIJACK' : '🤖PILOT'}
      </Typography>
    </Box>
  )
}