import { Container, Box, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface MarketingSectionProps {
  isEvil: boolean
}

function ModeButton({ isEvil }: { isEvil: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastAnimation, setLastAnimation] = useState('')
  
  const evilTexts = ['🗑️ Replaced', '⏳ Outdated', '🕳️ Forgotten', '📤 Pushed-out', '🤖 Automated']
  const goodTexts = ['⚡ Boosted', '🪄 Assisted', '🔍 Focused', '🧠 Smarter', '🛠️ Unblocked']
  
  const texts = isEvil ? evilTexts : goodTexts
  
  const handleClick = () => {
    setCurrentIndex((prev) => (prev + 1) % texts.length)
    
    // Trigger robot animations based on mode
    const animations = isEvil ? ['No', 'Running', 'Dance'] : ['ThumbsUp', 'Wave', 'Yes', 'Death']
    const availableAnimations = animations.filter(anim => anim !== lastAnimation)
    const randomAnimation = availableAnimations[Math.floor(Math.random() * availableAnimations.length)]
    
    setLastAnimation(randomAnimation)
    // Add small delay to ensure robot is loaded
    setTimeout(() => {
      if ((window as any).triggerRobotAnimation) {
        (window as any).triggerRobotAnimation(randomAnimation)
      }
    }, 100)
  }
  
  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: { xs: 'center', lg: 'flex-start' },
      mt: { xs: 2, md: 0 }
    }}>
      <Box
        onClick={handleClick}
        sx={{
          px: { xs: 3, sm: 4, md: 5 },
          py: { xs: 1.5, sm: 2, md: 2.5 },
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: { xs: '16px', sm: '18px', md: '20px' },
          fontWeight: 700,
          bgcolor: isEvil ? 'rgba(229,57,53,0.12)' : 'rgba(30,136,229,0.12)',
          border: `3px solid ${isEvil ? 'rgba(229,57,53,0.3)' : 'rgba(30,136,229,0.3)'}`,
          color: isEvil ? '#e53935' : '#1e88e5',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          minWidth: { xs: '160px', sm: '180px', md: '200px' },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: isEvil ? 
              'linear-gradient(90deg, transparent, rgba(229,57,53,0.1), transparent)' : 
              'linear-gradient(90deg, transparent, rgba(30,136,229,0.1), transparent)',
            transition: 'left 0.6s ease'
          },
          '&:hover': {
            bgcolor: isEvil ? 'rgba(229,57,53,0.2)' : 'rgba(30,136,229,0.2)',
            transform: 'translateY(-2px) scale(1.02)',
            boxShadow: `0 8px 25px ${isEvil ? 'rgba(229,57,53,0.3)' : 'rgba(30,136,229,0.3)'}`,
            '&::before': {
              left: '100%'
            }
          },
          '&:active': {
            transform: 'translateY(0px) scale(0.98)'
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {texts[currentIndex]}
        </Box>
      </Box>
    </Box>
  )
}

function ThreeJSRobot() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneInitialized = useRef(false)
  
  useEffect(() => {
    if (sceneInitialized.current) return
    if (!mountRef.current) return
    
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    
    renderer.setSize(400, 400)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)
    
    let model: THREE.Group | null = null
    let mixer: THREE.AnimationMixer | null = null
    let actions: { [key: string]: THREE.AnimationAction } = {}
    let activeAction: THREE.AnimationAction | null = null
    const clock = new THREE.Clock()
    

    
    // Load robot model
    const loader = new GLTFLoader()
    loader.load(
      'https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb',
      (gltf) => {
        model = gltf.scene
        model.scale.set(1.3, 1.3, 1.3)
        model.position.set(0, -1, 0)
        scene.add(model)
        
        // Setup animation mixer and actions
        mixer = new THREE.AnimationMixer(model)
        
        gltf.animations.forEach((clip) => {
          const action = mixer!.clipAction(clip)
          actions[clip.name] = action
          
          // Set loop mode for one-time actions
          if (['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'].includes(clip.name)) {
            action.clampWhenFinished = true
            action.loop = THREE.LoopOnce
          }
        })
        
        // Start with Idle animation
        activeAction = actions['Idle'] || actions[Object.keys(actions)[0]]
        if (activeAction) {
          activeAction.play()
        }
        
        // Apply shadows to robot
        if (model && 'traverse' in model) {
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true
              child.receiveShadow = true
            }
          })
        }
      },
      undefined,
      (error) => {
        console.error('Error loading robot model:', error)
        // Fallback to simple cube if model fails to load
        const geometry = new THREE.BoxGeometry(2, 2, 2)
        const material = new THREE.MeshStandardMaterial({
          color: 0x1e88e5,
          emissive: 0x1565c0,
          emissiveIntensity: 0.3
        })
        const fallbackModel = new THREE.Mesh(geometry, material)
        scene.add(fallbackModel)
      }
    )
    
    // Enhanced lighting setup
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3)
    hemiLight.position.set(0, 20, 0)
    scene.add(hemiLight)
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 3)
    dirLight.position.set(0, 20, 10)
    dirLight.castShadow = true
    dirLight.shadow.mapSize.width = 2048
    dirLight.shadow.mapSize.height = 2048
    scene.add(dirLight)
    
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    scene.add(ambientLight)
    
    // Enable shadows
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    
    camera.position.set(0, 2, 8)
    camera.lookAt(0, 1, 0)
    
    function animate() {
      requestAnimationFrame(animate)
      
      const delta = clock.getDelta()
      
      if (mixer) {
        mixer.update(delta)
      }
      
      // Robot stays stationary, only animations play
      
      renderer.render(scene, camera)
    }
    
    // Animation control functions
    const fadeToAction = (name: string, duration = 0.5) => {
      const newAction = actions[name]
      if (newAction && newAction !== activeAction) {
        if (activeAction) {
          activeAction.fadeOut(duration)
        }
        newAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration).play()
        activeAction = newAction
      }
    }
    
    // Global functions for external control
    (window as any).triggerRobotJump = () => {
      if (actions['Jump']) {
        fadeToAction('Jump')
        setTimeout(() => {
          fadeToAction('Idle')
        }, 2000)
      }
    }
    
    (window as any).triggerRobotAnimation = (animName: string) => {
      console.log('Triggering animation:', animName, 'Available actions:', Object.keys(actions))
      if (actions[animName]) {
        fadeToAction(animName)
      } else {
        console.warn('Animation not found:', animName)
      }
    }
    
    animate()
    sceneInitialized.current = true
    
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      sceneInitialized.current = false
    }
  }, [])
  
  return <div ref={mountRef} style={{ 
    width: '100%', 
    height: '100%', 
    maxWidth: '400px', 
    maxHeight: '400px',
    minWidth: '250px',
    minHeight: '250px'
  }} />
}

export const MarketingSection = ({ isEvil }: MarketingSectionProps) => {
  return (
    <Box id="features" sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      py: { xs: 4, md: 8 },
      background: isEvil ? 
        'linear-gradient(135deg, rgba(229,57,53,0.03) 0%, rgba(183,28,28,0.05) 100%)' : 
        'linear-gradient(135deg, rgba(30,136,229,0.03) 0%, rgba(13,71,161,0.05) 100%)'
    }}>
      <Container maxWidth="xl">
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: { xs: 4, md: 6, lg: 8 },
          px: { xs: 2, sm: 3, md: 4 }
        }}>
          {/* Left - 3D Robot */}
          <Box sx={{ 
            flex: { xs: 'none', lg: 1 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: '100%', lg: 'auto' },
            height: { xs: '300px', sm: '350px', md: '400px' },
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '250px', sm: '300px', md: '350px' },
              height: { xs: '250px', sm: '300px', md: '350px' },
              borderRadius: '50%',
              background: isEvil ? 
                'radial-gradient(circle, rgba(229,57,53,0.1) 0%, transparent 70%)' : 
                'radial-gradient(circle, rgba(30,136,229,0.1) 0%, transparent 70%)',
              zIndex: 0
            }
          }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <ThreeJSRobot />
            </Box>
          </Box>

          {/* Right - Marketing Content */}
          <Box sx={{ 
            flex: { xs: 'none', lg: 1 },
            textAlign: { xs: 'center', lg: 'left' },
            maxWidth: { xs: '100%', lg: '600px' },
            width: '100%',
            px: { xs: 1, sm: 2 }
          }}>
            <Typography variant="h1" sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
              lineHeight: { xs: 1.3, md: 1.2 },
              mb: { xs: 3, md: 4 },
              background: isEvil ? 
                'linear-gradient(135deg, #e53935, #ff5252, #f44336)' : 
                'linear-gradient(135deg, #1e88e5, #64b5f6, #2196f3)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Inter, system-ui, sans-serif',
              letterSpacing: '-0.02em'
            }}>
              {isEvil ? 'Just speak.' : 'Ideas are bulletproof'}
            </Typography>
            
            <Typography variant="h3" sx={{
              fontWeight: 500,
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem', lg: '2rem' },
              lineHeight: { xs: 1.5, md: 1.4 },
              color: isEvil ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.85)',
              fontFamily: 'Inter, system-ui, sans-serif',
              mb: { xs: 4, md: 5 },
              maxWidth: { xs: '100%', lg: '90%' }
            }}>
              {isEvil ? 
                "I'll translate it into production-grade code." : 
                "I'm just the tool to bring them to life."}
            </Typography>

            {/* Mode Button */}
            <ModeButton isEvil={isEvil} />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}