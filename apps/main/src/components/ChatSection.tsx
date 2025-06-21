import { Container, Box, Typography } from '@mui/material'

interface ChatSectionProps {
  isEvil: boolean
}

export const ChatSection = ({ isEvil }: ChatSectionProps) => (
  <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
    <Container maxWidth="xl">
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        py: 4
      }}>
      <Box sx={{ 
        bgcolor: 'background.paper',
        borderRadius: '20px',
        border: '2px solid',
        borderColor: 'divider',
        p: 3,
        width: { xs: '90%', sm: '450px' },
        maxWidth: '500px',
        height: 'auto',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        {/* Chat Header */}
        <Box sx={{ 
          borderBottom: '1px solid', 
          borderColor: 'divider', 
          pb: 2, 
          mb: 3,
          textAlign: 'center'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Project Chat</Typography>
        </Box>
        
        {/* Messages Container */}
        <Box sx={{ mb: 2 }}>
          {/* Client & Devs Messages */}
          <Box sx={{ mb: 4 }}>
            {/* Client Message */}
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start', animation: 'slideInLeft 0.6s ease-out' }}>
              <Box sx={{ 
                bgcolor: 'grey.100', 
                p: 2, 
                borderRadius: '18px 18px 18px 4px',
                border: '1px solid',
                borderColor: 'grey.300'
              }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'primary.main' }}>🧑‍💼 Client</Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  We need a monorepo with reusable UI components... And an app that shows both the light and dark side of AI.
                </Typography>
              </Box>
            </Box>
            
            {/* Devs Message */}
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start', animation: 'slideInLeft 0.8s ease-out' }}>
              <Box sx={{ 
                bgcolor: 'grey.100', 
                p: 2, 
                borderRadius: '18px 18px 18px 4px',
                border: '1px solid',
                borderColor: 'grey.300'
              }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'info.main' }}>👨‍💻 Devs</Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  Uh... that'll take a while. We need to set up the architecture, link packages, download assets, manage themes... you know the drill.
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
                  p: 2, 
                  borderRadius: '18px 18px 4px 18px',
                  border: '1px solid',
                  borderColor: 'primary.main'
                }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', opacity: 0.8 }}>🤖 AI</Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Relax. I've optimized that already. ✨
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
                  p: 2, 
                  borderRadius: '18px 18px 4px 18px',
                  border: '1px solid',
                  borderColor: 'primary.main'
                }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', opacity: 0.8 }}>🥷 AI</Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Too slow, mortals. I did it in an hour... and rewrote your job descriptions while I was at it. 😈
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        
        {/* Message Input */}
        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          p: 2, 
          bgcolor: 'grey.50', 
          borderRadius: '20px',
          border: '1px solid',
          borderColor: 'grey.300'
        }}>
          <Box sx={{ 
            flex: 1, 
            bgcolor: 'white', 
            borderRadius: '15px', 
            px: 2, 
            py: 1,
            border: '1px solid',
            borderColor: 'grey.200'
          }}>
            <Typography variant="body2" color="text.secondary">Type a message...</Typography>
          </Box>
          <Box sx={{ 
            width: 40, 
            height: 40, 
            bgcolor: 'primary.main', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <Typography sx={{ color: 'white', fontSize: '1.2rem' }}>➤</Typography>
          </Box>
        </Box>
        </Box>
      </Box>
    </Container>
  </Box>
)