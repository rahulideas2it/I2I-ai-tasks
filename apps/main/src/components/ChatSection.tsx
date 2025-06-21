import { Container, Box, Typography, Tabs, Tab } from '@mui/material'
import { useState } from 'react'
import { RightContent } from './RightContent'
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
  
  return (
  <>
    {/* Hidden - Contents Section */}
    {false && <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="xl">
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: { xs: '32px', md: '80px' },
          py: { xs: 3, md: 6 },
          px: { xs: 2, md: 4 }
        }}>
          {/* Right Content First */}
          <RightContent isEvil={isEvil} />
          
          {/* Chat Section Right */}
          <Box sx={{ 
            bgcolor: 'background.paper',
            borderRadius: '20px',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            p: { xs: 3, sm: 4 },
            width: '100%',
            maxWidth: '450px',
            height: 'auto',
            maxHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            backdropFilter: 'blur(10px)'
          }}>
          {/* Messages Container */}
          <Box sx={{ mb: 1, flex: 1 }}>
          {/* Client & Devs Messages */}
          <Box sx={{ mb: 4 }}>
            {/* Client Message */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-start', animation: 'slideInLeft 0.6s ease-out' }}>
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
                  🧑‍💼 We need a monorepo with reusable UI components... And an app that shows both the light and dark side of AI.
                </Typography>
              </Box>
            </Box>
            
            {/* Devs Message */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-start', animation: 'slideInLeft 0.8s ease-out' }}>
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            {/* AI Message - Good Mode */}
            {!isEvil && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', animation: 'slideInRight 1s ease-out' }}>
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
            
            {/* AI Message - Evil Mode */}
            {isEvil && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', animation: 'slideInRight 1s ease-out' }}>
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
          </Box>
          </Box>
          </Box>
          
        </Box>
      </Container>
    </Box>}
    
    {/* New Content Section */}
    <ContentSection isEvil={isEvil} />
    
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