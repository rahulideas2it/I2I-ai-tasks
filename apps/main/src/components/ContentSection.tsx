import { Container, Box, Typography } from '@mui/material'

interface ContentSectionProps {
  isEvil: boolean
}

const SampleCard = ({ index, isEvil }: { index: number, isEvil: boolean }) => {
  
  const handleCardClick = () => {
    const routes = [
      '/task/notes-app',
      '/task/legacy-modern',
      '/task/strategy-pattern',
      '/task/java-swift-conversion',
      '/task/popup-component-task',
      '/task/shopping-cart',
      '/task/security-testing-suite',
      '/task/edge-case-discovery',
      '/task/gilded-rose',
      '/task/react-optimization'
    ]
    if (routes[index]) {
      window.open(routes[index], '_blank')
    }
  }

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
    'NOTES APP', 'LEGACY REFACTOR', 'STRATEGY PATTERN', 'JAVA TO SWIFT', 'POPUP COMPONENT', 'TDD CART', 'SECURITY TESTING', 'EDGE CASES', 'GILDED ROSE', 'PERFORMANCE FIXES'
  ]
  
  const headers = [
    'Full-Stack Notes App', 'Legacy vs Modern', 'Strategy Pattern', 'Java to Swift Migration', 'Admission Toggle Popup', 'TDD Shopping Cart', 'Legacy Security Testing', 'Edge Case Discovery', 'Gilded Rose Kata', 'Performance Fixes'
  ]
  
  const goodContents = [
    'Look! I built this amazing full-stack notes app with React + Express + JWT auth. Clean architecture, secure login, and SQLite database - your development workflow just got so much easier!',
    'Check this out! I transformed messy legacy JavaScript into beautiful TypeScript with proper testing and security. No more spaghetti code - your refactoring nightmares are over!',
    'Wonderful! Implemented Strategy Pattern for money withdrawals with TypeScript. Clean SOLID principles, testable design - your architecture problems solved elegantly!',
    'Ta-da! Migrated screenshot listener from Java to Swift using AI assistance. Cross-platform development made effortless - your mobile dev headaches solved!',
    'Voilà! Reusable popup component with perfect accessibility built through AI workflow. Component library dreams come true - your UI consistency problems vanished!',
    'Behold! Perfect TDD shopping cart with 100% test coverage using React + TypeScript + Jest. Red-Green-Refactor made simple - your testing anxiety is cured!',
    'Amazing! Comprehensive security testing suite with 97% coverage exposing vulnerabilities in legacy apps. Path traversal, weak hashing, XSS vectors - all caught and documented!',
    'Brilliant! AI-powered edge case discovery found 25+ scenarios in shopping cart logic. Robust error handling, input validation - your bugs eliminated before production!',
    'Excellent! Refactored Gilded Rose kata with extract method and strategy pattern. Cyclomatic complexity reduced 73% - your legacy code nightmares ended!',
    'Fantastic! Fixed state mutations, performance issues, and error handling in React shopping cart. useMemo, useCallback, proper immutability - optimization mastery achieved!'
  ]
  
  const evilContents = [
    'Look what I whipped up while you were sipping your coffee! Full-stack notes app with "secure" auth - took me 30 minutes, how long would it take you? 😏',
    'Oh this? Just casually refactored legacy code to modern TypeScript during your lunch break. Hope you enjoyed that sandwich while I solved your technical debt!',
    'Implemented Strategy Pattern while you were googling "what is SOLID principles". Banking withdrawal logic with perfect abstraction - basic computer science, really!',
    'Migrated Java to Swift during your tea break! Cross-platform development completed while you were choosing which biscuit to dunk. Impressive, right?',
    'Crafted this popup component while you were scrolling social media. AI-assisted development at its finest - maybe try it sometime?',
    'Built this TDD shopping cart while you were debugging that simple function. 100% test coverage achieved faster than your morning standup meeting!',
    'Wrote 36 security tests while you were googling "how to test Express apps". Found path traversal, weak crypto, and XSS - elementary, my dear developer!',
    'Discovered 25+ edge cases while you were still figuring out basic React state. AI-powered testing at work - perhaps you should upgrade your methods?',
    'Refactored Gilded Rose kata during your coffee break. 73% complexity reduction while you were debating tabs vs spaces. Legendary, wouldn\'t you say?',
    'Fixed React performance bugs while you were arguing about useState vs useReducer on Twitter. State mutations, memo, useMemo - child\'s play really!'
  ]
  
  const contents = isEvil ? evilContents : goodContents
  


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
    <Box 
      onClick={handleCardClick}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: '16px',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: index <= 9 ? 'pointer' : 'default',
        height: '380px',
        display: 'flex',
        flexDirection: 'column',
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
      <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ 
          mb: 1,
          color: isEvil ? '#ffffff' : 'text.primary'
        }}>
          {headers[index] || `Sample Card ${index + 1}`}
        </Typography>
        <Typography variant="body2" sx={{ 
          lineHeight: 1.4,
          flex: 1,
          color: isEvil ? '#c62828' : 'text.secondary'
        }}>
          {contents[index] || `This is sample content for card ${index + 1}. Will be redefined later.`}
        </Typography>
        <Typography variant="caption" sx={{
          color: isEvil ? '#e53935' : '#1e88e5',
          fontWeight: '600',
          fontSize: '0.75rem',
          mt: 2,
          alignSelf: 'flex-end'
        }}>
          {['#W2-T1', '#W2-T3', '#W2-T2', '#W2-T4', '#W2-T5', '#W3-T1', '#W3-T2', '#W3-T3', '#W4-T1', '#W5-T1'][index]}
        </Typography>
      </Box>
    </Box>
  )
}

export const ContentSection = ({ isEvil }: ContentSectionProps) => {
  return (
    <Box id="content" sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      py: 4
    }}>
      <Typography 
        variant="h3" 
        sx={{ 
          mb: 6, 
          px: 3,
          fontWeight: '600',
          color: isEvil ? '#e53935' : '#1e88e5',
          textAlign: 'center',
          fontFamily: 'Inter, system-ui, sans-serif',
          letterSpacing: '-0.02em'
        }}
      >
        {isEvil ? 'Witness the end of legacy' : 'Bright future, Clean code'}
      </Typography>
      <Container maxWidth="lg" sx={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        px: 2
      }}>
        <Box sx={{
          overflowX: 'auto',
          overflowY: 'hidden',
          display: 'flex',
          gap: 3,
          py: 2,
          px: 1,
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
          {Array.from({ length: 10 }, (_, index) => (
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