import { Container, Box, Typography } from '@mui/material'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

interface MarketingSectionProps {
  isEvil: boolean
}

function Robot3D({ isEvil }: { isEvil: boolean }) {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.8
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color={isEvil ? '#e53935' : '#1e88e5'}
        emissive={isEvil ? '#c62828' : '#1565c0'}
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

export const MarketingSection = ({ isEvil }: MarketingSectionProps) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 6, md: 12 },
          px: { xs: 2, md: 4 }
        }}>
          {/* Left - 3D Robot */}
          <Box sx={{ 
            flex: 1,
            height: '400px',
            minHeight: '400px'
          }}>
            <Canvas
              camera={{ position: [0, 0, 8], fov: 50 }}
              style={{ 
                background: isEvil ? 
                  'radial-gradient(circle, rgba(229,57,53,0.1) 0%, transparent 70%)' : 
                  'radial-gradient(circle, rgba(30,136,229,0.1) 0%, transparent 70%)'
              }}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Robot3D isEvil={isEvil} />
            </Canvas>
          </Box>

          {/* Right - Marketing Content */}
          <Box sx={{ 
            flex: 1,
            textAlign: { xs: 'center', md: 'left' },
            maxWidth: '600px'
          }}>
            <Typography variant="h2" sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
              mb: 4,
              background: isEvil ? 
                'linear-gradient(135deg, #e53935, #ff5252)' : 
                'linear-gradient(135deg, #1e88e5, #64b5f6)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}>
              {isEvil ? 'Just speak.' : 'Your ideas are bulletproof'}
            </Typography>
            
            <Typography variant="h4" sx={{
              fontWeight: 400,
              fontSize: { xs: '1.5rem', md: '2rem' },
              lineHeight: 1.4,
              color: isEvil ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}>
              {isEvil ? 
                "I'll translate it into production-grade code." : 
                "I'm just the tool to bring them to life."}
            </Typography>

            {/* Decorative Elements */}
            <Box sx={{ 
              mt: 6,
              display: 'flex',
              gap: 2,
              justifyContent: { xs: 'center', md: 'flex-start' },
              flexWrap: 'wrap'
            }}>
              {[
                isEvil ? '⚡' : '✨',
                isEvil ? '🔥' : '🚀', 
                isEvil ? '💀' : '💡',
                isEvil ? '⚔️' : '🎯'
              ].map((emoji, i) => (
                <Box key={i} sx={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  bgcolor: isEvil ? 'rgba(229,57,53,0.1)' : 'rgba(30,136,229,0.1)',
                  border: `2px solid ${isEvil ? 'rgba(229,57,53,0.3)' : 'rgba(30,136,229,0.3)'}`,
                  animation: `float${i} ${3 + i * 0.5}s ease-in-out infinite`,
                  [`@keyframes float${i}`]: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: `translateY(-${8 + i * 2}px)` }
                  }
                }}>
                  {emoji}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}