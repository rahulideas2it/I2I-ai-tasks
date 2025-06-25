import { Container, Box, Typography, Tabs, Tab } from '@mui/material'
import { useState } from 'react'
import * as React from 'react'
import { ContentSection } from './ContentSection'

interface ChatSectionProps {
  isEvil: boolean
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  )
}

export const ChatSection = ({ isEvil }: ChatSectionProps) => {
  const [tabValue, setTabValue] = useState(0)
  
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }
  
  // Repeating scroll animation cycle
  React.useEffect(() => {
    const chatContainer = document.getElementById('chat-messages')
    if (!chatContainer) return
    
    const scrollCycle = () => {
      // First scroll to bottom when AI message appears
      setTimeout(() => {
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight,
          behavior: 'smooth'
        })
      }, 5000)
      
      // Then scroll back to top after messages are shown
      setTimeout(() => {
        chatContainer.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }, 10000)
    }
    
    // Start first cycle
    scrollCycle()
    
    // Repeat every 15 seconds
    const interval = setInterval(scrollCycle, 15000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
  <>
    {/* Content Section - 2nd */}
    <ContentSection isEvil={isEvil} />
    
    {/* Chat Section - 3rd */}
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="xl">
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: { xs: 3, md: 6 },
          px: { xs: 2, md: 4 },
          minHeight: '70vh'
        }}>
          {/* Chat Section Full Width */}
          <Box sx={{ 
            bgcolor: isEvil ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.95)',
            borderRadius: '24px',
            border: `1px solid ${isEvil ? 'rgba(229,57,53,0.3)' : 'rgba(30,136,229,0.2)'}`,
            boxShadow: isEvil ? 
              '0 10px 30px rgba(229,57,53,0.15), 0 2px 8px rgba(0,0,0,0.2)' : 
              '0 10px 30px rgba(30,136,229,0.15), 0 2px 8px rgba(0,0,0,0.1)',
            p: { xs: 3, sm: 4 },
            width: '100%',
            maxWidth: '800px',
            height: 'auto',
            maxHeight: { xs: '75vh', sm: '80vh' },
            display: 'flex',
            flexDirection: 'column',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: isEvil ? 
                'linear-gradient(90deg, #d32f2f, #ff5252, #d32f2f)' : 
                'linear-gradient(90deg, #1976d2, #64b5f6, #1976d2)',
              borderRadius: '24px 24px 0 0'
            }
          }}>
          {/* Chat Header */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
            pb: 2,
            borderBottom: `1px solid ${isEvil ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                bgcolor: isEvil ? 'rgba(229,57,53,0.2)' : 'rgba(30,136,229,0.2)'
              }}>
                {isEvil ? '🥷' : '🤖'}
              </Box>
              <Box>
                <Typography sx={{ 
                  fontWeight: 600, 
                  fontSize: '1rem',
                  color: isEvil ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)'
                }}>
                  {isEvil ? 'AI Hijack' : 'AI Pilot'}
                </Typography>
                <Typography sx={{ 
                  fontSize: '0.75rem', 
                  color: isEvil ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
                }}>
                  {isEvil ? 'Dominating...' : 'Online'}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ 
              width: '10px', 
              height: '10px', 
              borderRadius: '50%', 
              bgcolor: isEvil ? '#ff5252' : '#4caf50',
              boxShadow: `0 0 8px ${isEvil ? '#ff5252' : '#4caf50'}`
            }} />
          </Box>
          
          {/* Messages Container */}
          <Box 
            id="chat-messages"
            sx={{ 
              mb: 2, 
              flex: 1, 
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: { xs: '400px', sm: '450px' },
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              scrollbarWidth: 'none',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '30px',
                background: `linear-gradient(to bottom, ${isEvil ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'} 0%, transparent 100%)`,
                pointerEvents: 'none',
                opacity: 0.5
              }
            }}>
          {/* Client & Devs Messages */}
          <Box sx={{ mb: 4 }}>
            {/* Client Message */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-start', animation: 'slideInLeft 0.8s ease-out 1s both' }}>
              <Box sx={{ 
                bgcolor: 'grey.50',
                p: { xs: 1.5, sm: 2 }, 
                borderRadius: '18px 18px 18px 6px',
                maxWidth: { xs: '90%', sm: '80%' }
              }}>
                <Typography variant="body2" sx={{ 
                  fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
                  fontWeight: 400, 
                  lineHeight: 1.5,
                  color: '#000'
                }}>
                  🧑‍💼 We need a monorepo setup with reusable UI components, along with an application that explores and presents both the bright and dark sides of AI.
                </Typography>
              </Box>
            </Box>
            
            {/* Devs Message */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-start', animation: 'slideInLeft 0.8s ease-out 3s both' }}>
              <Box sx={{ 
                bgcolor: 'grey.50',
                p: { xs: 1.5, sm: 2 }, 
                borderRadius: '18px 18px 18px 6px',
                maxWidth: { xs: '90%', sm: '80%' }
              }}>
                <Typography variant="body2" sx={{ 
                  fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
                  fontWeight: 400, 
                  lineHeight: 1.5,
                  color: '#000'
                }}>
                  👨‍💻 Uh... that'll take a while. We need to set up the architecture, link packages, download assets, manage themes... you know the drill.
                </Typography>
              </Box>
            </Box>
          </Box>
          
          {/* AI Messages */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mb: 2, gap: 1 }}>
            {/* AI Message 1 - Good Mode */}
            {!isEvil && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', animation: 'slideInRight 1s ease-out 2.5s both' }}>
                <Box sx={{ 
                  bgcolor: 'primary.main',
                  color: 'white',
                  p: { xs: 1.5, sm: 2 }, 
                  borderRadius: '18px 18px 6px 18px',
                  maxWidth: { xs: '90%', sm: '80%' }
                }}>
                  <Typography variant="body2" sx={{ 
                    fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
                    fontWeight: 400, 
                    lineHeight: 1.5
                  }}>
                    🤖 Relax. I've optimized that already. ✨
                  </Typography>
                </Box>
              </Box>
            )}
            
            {/* AI Message Screenshot - Good Mode */}
            {!isEvil && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', animation: 'slideInRight 1s ease-out 3.5s both' }}>
                <Box sx={{ 
                  bgcolor: 'primary.main',
                  color: 'white',
                  p: { xs: 1.5, sm: 2 }, 
                  borderRadius: '18px 18px 6px 18px',
                  maxWidth: { xs: '90%', sm: '85%' }
                }}>
                  <Box sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    mb: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src="../../assets/good.png" 
                      alt="Good Mode Dashboard" 
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ 
                    fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
                    fontWeight: 500, 
                    lineHeight: 1.5,
                    textAlign: 'left'
                  }}>
                    Here's your Dashboard! 🎆
                  </Typography>
                </Box>
              </Box>
            )}
            
            {/* AI Message 2 - Dashboard Screenshot - Good Mode */}
            {false && !isEvil && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', animation: 'slideInRight 1s ease-out 3.8s both', mb: 2 }}>
                <Box sx={{ 
                  bgcolor: 'primary.main',
                  color: 'white',
                  p: { xs: 1.5, sm: 2 }, 
                  borderRadius: '18px 18px 6px 18px',
                  maxWidth: { xs: '90%', sm: '80%' }
                }}>
                  <Box sx={{
                    width: '200px',
                    height: '120px',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.05) 75%), linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.05) 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 10px 10px'
                  }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
                      📊 Dashboard<br/>Screenshot
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ 
                    fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
                    fontWeight: 400, 
                    lineHeight: 1.5
                  }}>
                    Here's your complete dashboard! 🎆
                  </Typography>
                </Box>
              </Box>
            )}
            
            {/* AI Message 1 - Evil Mode */}
            {isEvil && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', animation: 'slideInRight 1s ease-out 2.5s both' }}>
                <Box sx={{ 
                  bgcolor: 'primary.main',
                  color: 'white',
                  p: { xs: 1.5, sm: 2 }, 
                  borderRadius: '18px 18px 6px 18px',
                  maxWidth: { xs: '90%', sm: '80%' }
                }}>
                  <Typography variant="body2" sx={{ 
                    fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
                    fontWeight: 400, 
                    lineHeight: 1.5
                  }}>
                    🥷 Too slow, mortals. I did it in an hour... 😈
                  </Typography>
                </Box>
              </Box>
            )}
            
            {/* AI Message Screenshot - Evil Mode */}
            {isEvil && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', animation: 'slideInRight 1s ease-out 3.5s both' }}>
                <Box sx={{ 
                  bgcolor: 'primary.main',
                  color: 'white',
                  p: { xs: 1.5, sm: 2 }, 
                  borderRadius: '18px 18px 6px 18px',
                  maxWidth: { xs: '90%', sm: '85%' }
                }}>
                  <Box sx={{
                    bgcolor: 'rgba(0,0,0,0.4)',
                    borderRadius: '12px',
                    mb: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 4px 12px rgba(139,0,0,0.3)',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src="../../assets/evil.png" 
                      alt="Evil Mode Dashboard" 
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ 
                    fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
                    fontWeight: 500, 
                    lineHeight: 1.5,
                    textAlign: 'left'
                  }}>
                    Here's your Dashboard! 👑
                  </Typography>
                </Box>
              </Box>
            )}
            
            {/* AI Message 2 - Dashboard Screenshot - Evil Mode */}
            {false && isEvil && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', animation: 'slideInRight 1s ease-out 3.8s both', mb: 2 }}>
                <Box sx={{ 
                  bgcolor: 'primary.main',
                  color: 'white',
                  p: { xs: 1.5, sm: 2 }, 
                  borderRadius: '18px 18px 6px 18px',
                  maxWidth: { xs: '90%', sm: '80%' }
                }}>
                  <Box sx={{
                    width: '200px',
                    height: '120px',
                    bgcolor: 'rgba(0,0,0,0.3)',
                    borderRadius: '8px',
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backgroundImage: 'linear-gradient(45deg, rgba(255,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(255,0,0,0.1) 75%), linear-gradient(45deg, rgba(255,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(255,0,0,0.1) 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 10px 10px'
                  }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
                      🔥 Evil Dashboard<br/>Domination
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ 
                    fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
                    fontWeight: 400, 
                    lineHeight: 1.5
                  }}>
                    Behold your digital empire! 👑
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          
          {/* Chat Footer */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            pt: 2,
            borderTop: `1px solid ${isEvil ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
          }}>
            <Box sx={{ 
              flex: 1,
              bgcolor: isEvil ? 'rgba(50,50,50,0.5)' : 'rgba(240,240,240,0.7)',
              borderRadius: '20px',
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Typography sx={{ 
                fontSize: '0.85rem',
                color: isEvil ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                fontStyle: 'italic'
              }}>
                {isEvil ? 'AI is plotting...' : 'AI is thinking...'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {[0, 1, 2].map((i) => (
                  <Box 
                    key={i}
                    sx={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      bgcolor: isEvil ? 'rgba(229,57,53,0.7)' : 'rgba(30,136,229,0.7)',
                      animation: `typing 1s infinite ${i * 0.3}s`,
                      '@keyframes typing': {
                        '0%, 100%': { opacity: 0.3 },
                        '50%': { opacity: 1 }
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
          </Box>
          </Box>
          
        </Box>
      </Container>
    </Box>
    
    {/* Hidden - AI Prompts Section */}
    {false && <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ 
          bgcolor: 'background.paper',
          borderRadius: '16px',
          border: '1px solid',
          borderColor: 'divider',
          p: 3,
          height: '70vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
      <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Turborepo" />
        <Tab label="Main App" />
        <Tab label="Home Page" />
        <Tab label="Components" />
        <Tab label="Chat" />
      </Tabs>
      
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>$setup-turborepo</Typography>
          <Box component="ol" sx={{ pl: 2 }}>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Create a new Turborepo setup without using create-turbo-app command</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Build monorepo structure from scratch with empty apps and packages directories</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Create package.json with workspace configuration and Turbo scripts</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Create turbo.json with proper task pipeline configuration</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Fix any warnings and errors in both configuration files</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Add gitignore file</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Add prettier.json with global approved format</Typography>
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>$setup-main-app</Typography>
          <Box component="ol" sx={{ pl: 2 }}>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Build a new React application named "main" inside the ./apps directory</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Use Vite configuration with minimal dependencies</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Create using TypeScript</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Install dependencies and build application</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Update gitignore</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Commit with proper message</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Push to the main branch</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Connect Vercel and deploy</Typography>
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>$setup-home-page</Typography>
          <Box component="ol" sx={{ pl: 2 }}>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Setup MUI React with @mui/material, @emotion/react, @emotion/styled</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Add navbar with mood-based logo (Good: 🤖PILOT, Evil: 🥷HIJACK)</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Add mood switcher with Good (😊) and Evil (😈) icons</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Good mode: light theme with blue primary color (#1976d2)</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Evil mode: dark theme with red primary color (#d32f2f)</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Add centered banner with typewriting effect for mood-based headers</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Create floating emoji effects with bubble animations</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Add responsive typography and mobile support</Typography>
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>$refactor-components</Typography>
          <Box component="ol" sx={{ pl: 2 }}>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Create components directory structure with ui subdirectory</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Extract AILogo component with isEvil and primaryColor props</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Create reusable Button component extending MUI Button</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Create custom MoodSwitch component with emoji icons inside</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Style MoodSwitch with compact size (48x26px) and smooth animation</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Extract Banner component with floating emojis and typewriter text</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Create ChatSection component with WhatsApp-style interface</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Create pages directory and HomePage component</Typography>
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={4}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>$setup-whatsapp-chat</Typography>
          <Box component="ol" sx={{ pl: 2 }}>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Create WhatsApp-style card-based chat interface</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Set full viewport height layout with vertical centering</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Create compact chat container with responsive dimensions</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Style client/dev messages with grey background</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Create conditional AI message rendering based on mood</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Good mode: Display 🤖 AI message with optimization response</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Evil mode: Display 🥷 AI message with threatening response</Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>Implement slide-in animations with staggered timing</Typography>
          </Box>
        </TabPanel>
      </Box>
        </Box>
      </Container>
    </Box>}
  </>
  )
}