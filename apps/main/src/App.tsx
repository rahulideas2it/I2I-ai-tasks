import { Container, AppBar, Toolbar, Box, createTheme, ThemeProvider } from '@mui/material'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AILogo } from './components/AILogo'
import { HomePage } from './pages/HomePage'
import { TaskPage } from './pages/TaskPage'
import { DemoPage } from './pages/DemoPage'
import { MoodSwitch } from './components/ui/MoodSwitch'

function App(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [isEvil, setIsEvil] = useState(false)
  const fullText = isEvil ? "Your Overqualified Replacement" : "Your Friendly Neighborhood AI"
  
  const theme = useMemo(() => createTheme({
    palette: {
      mode: isEvil ? 'dark' : 'light',
      primary: {
        main: isEvil ? '#d32f2f' : '#1976d2',
      },
    },
  }), [isEvil])
  
  const toggleMood = useCallback(() => {
    setIsEvil(!isEvil)
  }, [isEvil])
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    }
    
    // Scroll on initial load
    scrollToHash()
    
    // Listen for hash changes
    window.addEventListener('hashchange', scrollToHash)
    return () => window.removeEventListener('hashchange', scrollToHash)
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
  }, [fullText])
  


  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <Routes>
            <Route path="/task/*" element={null} />
            <Route path="/*" element={
              <>
                {/* Sticky Navbar */}
                {isScrolled && (
                  <AppBar 
                    position="fixed" 
                    sx={{ 
                      bgcolor: isEvil ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      borderBottom: `2px solid ${isEvil ? 'rgba(229,57,53,0.2)' : 'rgba(30,136,229,0.15)'}`,
                      boxShadow: isEvil ? 
                        '0 4px 20px rgba(229,57,53,0.1)' : 
                        '0 4px 20px rgba(30,136,229,0.1)',
                      zIndex: 1100
                    }}
                  >
                    <Container maxWidth="xl">
                      <Toolbar sx={{ py: { xs: 0.5, sm: 1 } }}>
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
                  <AppBar position="static" elevation={0} sx={{ 
                    bgcolor: 'transparent', 
                    py: { xs: 1, sm: 1.5, md: 2 }
                  }}>
                    <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <AILogo isEvil={isEvil} primaryColor={theme.palette.primary.main} />
                      </Box>
                      <MoodSwitch checked={isEvil} onChange={toggleMood} />
                    </Toolbar>
                  </AppBar>
                </Container>
              </>
            } />
          </Routes>
          
          <Routes>
            <Route path="/" element={
              <HomePage 
                isEvil={isEvil} 
                displayText={displayText} 
                primaryColor={theme.palette.primary.main}
              />
            } />
            <Route path="/task/:taskId" element={<TaskPage isEvil={isEvil} />} />
            <Route path="/demo/:demoId" element={<DemoPage />} />
          </Routes>
        
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
      </Router>
    </ThemeProvider>
  )
}

export default App