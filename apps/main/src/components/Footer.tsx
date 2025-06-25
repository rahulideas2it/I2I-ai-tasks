import { Container, Box, Typography, IconButton } from '@mui/material'
import { motion } from 'framer-motion'

interface FooterProps {
  isEvil: boolean
}

export const Footer = ({ isEvil }: FooterProps) => {
  return (
    <Box sx={{
      background: isEvil ? 
        'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(229,57,53,0.1) 100%)' : 
        'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(30,136,229,0.1) 100%)',
      py: { xs: 4, sm: 6 },
      borderTop: `1px solid ${isEvil ? 'rgba(229,57,53,0.2)' : 'rgba(30,136,229,0.2)'}`
    }}>
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 3, sm: 4 }
          }}>
            {/* Creator Info */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              order: { xs: 1, sm: 0 }
            }}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box sx={{
                  width: { xs: 50, sm: 60 },
                  height: { xs: 50, sm: 60 },
                  borderRadius: '50%',
                  overflow: 'hidden',

                  boxShadow: `0 4px 12px ${isEvil ? 'rgba(229,57,53,0.3)' : 'rgba(30,136,229,0.3)'}`
                }}>
                  <img 
                    src="/rahul.jpg"
                    alt="Rahul Raj Nataraj - Frontend Developer"
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              </motion.div>
              <Box>
                <Typography sx={{
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  color: isEvil ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)'
                }}>
                  Created by Rahul
                </Typography>
                <Typography sx={{
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                  color: isEvil ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'
                }}>
                  Frontend Developer
                </Typography>
              </Box>
            </Box>

            {/* Links */}
            <Box sx={{
              display: 'flex',
              gap: { xs: 2, sm: 3 },
              order: { xs: 0, sm: 1 }
            }}>
              {[
                { label: 'GitHub', url: 'https://github.com/rahulideas2it/I2I-ai-tasks', icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                ) },
                { label: 'LinkedIn', url: 'https://in.linkedin.com/in/rahulrajnataraj', icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ) },
                { label: 'Portfolio', url: 'https://rahul162raj.github.io/', icon: '🌐' }
              ].map((link) => (
                <motion.div
                  key={link.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconButton
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${link.label}`}
                    sx={{
                      bgcolor: isEvil ? 'rgba(229,57,53,0.1)' : 'rgba(30,136,229,0.1)',
                      border: `1px solid ${isEvil ? 'rgba(229,57,53,0.3)' : 'rgba(30,136,229,0.3)'}`,
                      color: isEvil ? '#e53935' : '#1e88e5',
                      fontSize: { xs: '1.2rem', sm: '1.4rem' },
                      width: { xs: 40, sm: 44 },
                      height: { xs: 40, sm: 44 },
                      '&:hover': {
                        bgcolor: isEvil ? 'rgba(229,57,53,0.2)' : 'rgba(30,136,229,0.2)',
                        boxShadow: `0 4px 12px ${isEvil ? 'rgba(229,57,53,0.3)' : 'rgba(30,136,229,0.3)'}`
                      }
                    }}
                  >
                    {link.icon}
                  </IconButton>
                </motion.div>
              ))}
            </Box>
          </Box>

          {/* Copyright */}
          <Box sx={{
            textAlign: 'center',
            mt: { xs: 3, sm: 4 },
            pt: { xs: 2, sm: 3 },
            borderTop: `1px solid ${isEvil ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
          }}>
            <Typography sx={{
              fontSize: { xs: '0.75rem', sm: '0.8rem' },
              color: isEvil ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
            }}>
              @ 2025 AI Tasks Dashboard. Built with AI
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}