import { Box, Typography } from '@mui/material'

interface AILogoProps {
  isEvil: boolean
  primaryColor: string
}

export const AILogo = ({ isEvil, primaryColor }: AILogoProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Typography 
      variant="h4" 
      component="div" 
      sx={{ 
        fontWeight: 'bold', 
        color: primaryColor,
        fontFamily: 'monospace',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}
    >
      {isEvil ? '🥷HIJACK' : '🤖PILOT'}
    </Typography>
  </Box>
)