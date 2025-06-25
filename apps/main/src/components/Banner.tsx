import { Container, Box, Typography } from '@mui/material'
import { Button } from './ui/Button'
import { motion } from 'framer-motion'

interface BannerProps {
  isEvil: boolean
  displayText: string
  primaryColor: string
}

export const Banner = ({ isEvil, displayText, primaryColor }: BannerProps) => (
  <Box id="home" sx={{ 
    height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' }, 
    minHeight: { xs: '600px', sm: '700px', md: '800px' }, 
    display: 'flex', 
    alignItems: 'center',
    background: isEvil ? 
      'linear-gradient(135deg, rgba(229,57,53,0.03) 0%, rgba(183,28,28,0.05) 100%)' : 
      'linear-gradient(135deg, rgba(30,136,229,0.03) 0%, rgba(13,71,161,0.05) 100%)',
    position: 'relative',
    overflow: 'hidden'
  }}>
    {/* Floating Emojis Background - Full Section Coverage */}
    {Array.from({ length: 12 }, (_, i) => {
      const goodEmojis = ['😊', '😂', '💃', '🎉', '✨', '🌈', '😍', '🥳', '🚀', '💡', '🎯', '⭐', '🌟', '💫', '🎨', '🎪', '🎆', '🎈']
      const evilEmojis = ['😈', '💀', '🩸', '🔥', '⚡', '🗡️', '🧿', '👿', '🌪️', '💥', '🌋', '⚔️', '🖤', '💣', '🌑', '🕷️', '🔮', '⚰️']
      const emojis = isEvil ? evilEmojis : goodEmojis
      const emoji = emojis[i % emojis.length]
      
      // Better distributed patterns for visual appeal
      const patterns = [
        // Top corners
        { left: '10%', top: '15%' },
        { left: '85%', top: '12%' },
        // Mid left and right
        { left: '5%', top: '45%' },
        { left: '90%', top: '40%' },
        // Lower corners
        { left: '15%', top: '75%' },
        { left: '80%', top: '80%' },
        // Center scattered
        { left: '25%', top: '25%' },
        { left: '70%', top: '30%' },
        { left: '35%', top: '65%' },
        { left: '60%', top: '70%' },
        // Additional balance
        { left: '45%', top: '20%' },
        { left: '55%', top: '85%' }
      ]
      
      const position = patterns[i]
      
      return (
        <motion.div
          key={i}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 3 + (i % 3) * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1
          }}
          whileHover={{ scale: 1.2, rotate: 0 }}
          style={{
            position: 'absolute',
            left: position.left,
            top: position.top,
            fontSize: '1.5rem',
            background: isEvil 
              ? `radial-gradient(circle, rgba(229,57,53,0.1) 0%, transparent 75%)`
              : `radial-gradient(circle, rgba(30,136,229,0.1) 0%, transparent 75%)`,
            borderRadius: i % 2 === 0 ? '50%' : '12px',
            padding: '10px',
            border: `1px solid ${isEvil ? 'rgba(229,57,53,0.2)' : 'rgba(30,136,229,0.2)'}`,
            backdropFilter: 'blur(8px)',
            opacity: 0.4,
            zIndex: i % 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          {emoji}
        </motion.div>
      )
    })}
    
    <Container maxWidth="xl" sx={{ 
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: { xs: 2, sm: 3, md: 4 }
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        textAlign: 'center',
        position: 'relative'
      }}>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            position: 'relative', 
            zIndex: 10, 
            padding: '2rem',
            maxWidth: '100%',
            width: '100%'
          }}>
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              color: 'text.primary',
              fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '4.5rem' },
              mb: { xs: 2, sm: 3, md: 4 },
              lineHeight: { xs: 1.2, md: 1.1 },
              letterSpacing: '-0.02em',
              textAlign: 'center'
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
            variant="h4" 
            color="text.secondary"
            sx={{ 
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
              maxWidth: { xs: '100%', sm: '80%', md: '600px' },
              mx: 'auto',
              mb: { xs: 4, sm: 5, md: 6 },
              lineHeight: { xs: 1.4, md: 1.5 },
              fontWeight: 400,
              textAlign: 'center'
            }}
          >
            {isEvil 
              ? "Relax... I'll take it from here (and maybe your job too)." 
              : "Helping you code, write, and thrive — no world domination today."
            }
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                sx={{
                  px: { xs: 3, sm: 4, md: 5 },
                  py: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  fontWeight: 600,
                  borderRadius: '50px',
                  textTransform: 'none',
                  boxShadow: isEvil ? 
                    '0 8px 25px rgba(229,57,53,0.3)' : 
                    '0 8px 25px rgba(30,136,229,0.3)'
                }}
              >
                {isEvil ? 'Dare to see the other side' : 'Explore the helpful side'}
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    </Container>
  </Box>
)