import { Container, AppBar, Toolbar, Box, createTheme, ThemeProvider } from '@mui/material'
import { useState, useEffect } from 'react'
import { AILogo } from './components/AILogo'
import { HomePage } from './pages/HomePage'
import { MoodSwitch } from './components/ui/MoodSwitch'

function App(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(true)
  const [displayText, setDisplayText] = useState('')
  const [isEvil, setIsEvil] = useState(false)
  const fullText = isEvil ? "Your Overqualified Replacement" : "Your Friendly Neighborhood AI"
  
  const theme = createTheme({
    palette: {
      mode: isEvil ? 'dark' : 'light',
      primary: {
        main: isEvil ? '#d32f2f' : '#1976d2',
      },
    },
  })
  
  const toggleMood = () => {
    setIsEvil(!isEvil)
  }
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    setDisplayText('')
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)
    
    return () => clearInterval(timer)
  }, [isEvil])
  


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Sticky Navbar */}
        {isScrolled && (
          <AppBar 
            position="fixed" 
            sx={{ 
              bgcolor: isEvil ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderBottom: 1,
              borderColor: 'divider',
              boxShadow: 'none'
            }}
          >
            <Container maxWidth="xl">
              <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                  <AILogo isEvil={isEvil} primaryColor={theme.palette.primary.main} />
                </Box>
                <MoodSwitch checked={isEvil} onChange={toggleMood} />
              </Toolbar>
            </Container>
          </AppBar>
        )}
        
        {/* Main Navbar */}
        <Container maxWidth="xl">
          <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', py: 1 }}>
            <Toolbar sx={{ px: 0 }}>
              <Box sx={{ flexGrow: 1 }}>
                <AILogo isEvil={isEvil} primaryColor={theme.palette.primary.main} />
              </Box>
              <MoodSwitch checked={isEvil} onChange={toggleMood} />
            </Toolbar>
          </AppBar>
        </Container>
        
        <HomePage 
          isEvil={isEvil} 
          displayText={displayText} 
          primaryColor={theme.palette.primary.main}
        />
        
        <style>
          {`
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
            
            @keyframes float0 {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(180deg); }
            }
            @keyframes float1 {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-15px) rotate(-180deg); }
            }
            @keyframes float2 {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-25px) rotate(90deg); }
            }
            @keyframes float3 {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-18px) rotate(-90deg); }
            }
            @keyframes float4 {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-22px) rotate(270deg); }
            }
            @keyframes float5 {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-16px) rotate(-270deg); }
            }
            @keyframes float6 {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-24px) rotate(45deg); }
            }
            @keyframes float7 {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-19px) rotate(-45deg); }
            }
            
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-10px); }
              60% { transform: translateY(-5px); }
            }
            
            @keyframes slideInLeft {
              0% { transform: translateX(-100px); opacity: 0; }
              100% { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideInRight {
              0% { transform: translateX(100px); opacity: 0; }
              100% { transform: translateX(0); opacity: 1; }
            }
          `}
        </style>
      </Box>
    </ThemeProvider>
  )
}

export default App