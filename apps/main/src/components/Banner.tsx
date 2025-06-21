import { Container, Box, Typography } from '@mui/material'
import { Button } from './ui/Button'

interface BannerProps {
  isEvil: boolean
  displayText: string
  primaryColor: string
}

export const Banner = ({ isEvil, displayText, primaryColor }: BannerProps) => (
  <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center' }}>
    <Container maxWidth="xl">
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
      {/* Floating Emojis */}
      {Array.from({ length: window.innerWidth < 768 ? 8 : 16 }, (_, i) => {
        const goodEmojis = ['😊', '😂', '💃', '🎉', '✨', '🌈', '😍', '🥳']
        const evilEmojis = ['😈', '💀', '🩸', '🔥', '⚡', '🗡️', '🧿', '👿']
        const emojis = isEvil ? evilEmojis : goodEmojis
        const emoji = emojis[i % emojis.length]
        
        return (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              fontSize: '2rem',
              animation: `float${i} ${3 + i * 0.5}s ease-in-out infinite`,
              left: `${5 + (i % 4) * 30}%`,
              top: `${5 + (i % 4) * 15 + Math.floor(i / 4) * 70}%`,
              background: isEvil 
                ? 'radial-gradient(circle, rgba(211,47,47,0.15) 0%, transparent 80%)'
                : 'radial-gradient(circle, rgba(25,118,210,0.15) 0%, transparent 80%)',
              borderRadius: '50%',
              padding: '12px',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${isEvil ? 'rgba(211,47,47,0.2)' : 'rgba(25,118,210,0.2)'}`,
              filter: (i % 3 === 1 && i < 6) ? 'blur(3px) opacity(0.15)' : i % 3 === 0 ? 'opacity(0.2)' : 'opacity(0.35)',
              zIndex: 1
            }}
          >
            {emoji}
          </Box>
        )
      })}
      <Box sx={{ position: 'relative', zIndex: 10, px: 8, py: 6 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontWeight: 600,
            color: 'text.primary',
            fontSize: { xs: '2.5rem', md: '4rem' },
            mb: 2
          }}
        >
          {isEvil ? (
            displayText.includes('Replacement') ? (
              <>
                Your Overqualified <span style={{ color: primaryColor }}>Replacement</span>
              </>
            ) : (
              displayText
            )
          ) : (
            displayText.includes('Neighborhood') ? (
              <>
                Your Friendly <span style={{ color: primaryColor }}>Neighborhood</span> AI
              </>
            ) : (
              displayText
            )
          )}
          <span style={{ 
            animation: 'blink 1s infinite',
            marginLeft: '4px',
            color: primaryColor
          }}>|</span>
        </Typography>
        
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ 
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            maxWidth: 600,
            mx: 'auto',
            mb: 4
          }}
        >
          {isEvil 
            ? "Relax... I'll take it from here (and maybe your job too)." 
            : "Helping you code, write, and thrive — no world domination today."
          }
        </Typography>
        
        <Button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          {isEvil ? 'Dare to see the other side' : 'Explore the helpful side'}
        </Button>
        </Box>
      </Box>
    </Container>
  </Box>
)