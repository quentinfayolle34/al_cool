import { Box, Button } from '@mui/material'
import { useState } from 'react'

function DiceCube() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [number, setNumber] = useState(1)

  const rollCube = () => {
    // Numéro aléatoire entre 1 et 6
    const newNumber = Math.floor(Math.random() * 6) + 1
    setNumber(newNumber)

    // Calcul de rotations pour que la face tirée soit en avant
    let x = 0
    let y = 0

    switch (newNumber) {
      case 1: // face avant
        x = 0
        y = 0
        break
      case 2: // face bas
        x = -90
        y = 0
        break
      case 3: // face droite
        x = 0
        y = 90
        break
      case 4: // face gauche
        x = 0
        y = -90
        break
      case 5: // face haut
        x = 90
        y = 0
        break
      case 6: // face arrière
        x = 0
        y = 180
        break
      default:
        break
    }

    // Ajout de quelques tours aléatoires pour l’effet “lancer”
    x += 360 * Math.floor(Math.random() * 2 + 1)
    y += 360 * Math.floor(Math.random() * 2 + 1)

    setRotation({ x, y })
  }

  const cubeSize = 200
  const borderRadius = 16 // coins arrondis

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#F0E68C',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ perspective: 800 }}>
        <Box
          sx={{
            width: cubeSize,
            height: cubeSize,
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 1s',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          {/* Face avant */}
          <Box
            sx={{
              position: 'absolute',
              width: cubeSize,
              height: cubeSize,
              backgroundColor: 'white',
              border: '2px solid black',
              borderRadius: borderRadius,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '5rem',
              fontWeight: '700',
              backfaceVisibility: 'hidden',
              transform: `rotateY(0deg) translateZ(${cubeSize / 2}px)`,
            }}
          >
            1
          </Box>

          {/* Face arrière */}
          <Box
            sx={{
              position: 'absolute',
              width: cubeSize,
              height: cubeSize,
              backgroundColor: 'white',
              border: '2px solid black',
              borderRadius: borderRadius,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '5rem',
              fontWeight: '700',
              backfaceVisibility: 'hidden',
              transform: `rotateY(180deg) translateZ(${cubeSize / 2}px)`,
            }}
          >
            6
          </Box>

          {/* Face droite */}
          <Box
            sx={{
              position: 'absolute',
              width: cubeSize,
              height: cubeSize,
              backgroundColor: 'white',
              border: '2px solid black',
              borderRadius: borderRadius,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '5rem',
              fontWeight: '700',
              backfaceVisibility: 'hidden',
              transform: `rotateY(90deg) translateZ(${cubeSize / 2}px)`,
            }}
          >
            3
          </Box>

          {/* Face gauche */}
          <Box
            sx={{
              position: 'absolute',
              width: cubeSize,
              height: cubeSize,
              backgroundColor: 'white',
              border: '2px solid black',
              borderRadius: borderRadius,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '5rem',
              fontWeight: '700',
              backfaceVisibility: 'hidden',
              transform: `rotateY(-90deg) translateZ(${cubeSize / 2}px)`,
            }}
          >
            4
          </Box>

          {/* Face haut */}
          <Box
            sx={{
              position: 'absolute',
              width: cubeSize,
              height: cubeSize,
              backgroundColor: 'white',
              border: '2px solid black',
              borderRadius: borderRadius,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '5rem',
              fontWeight: '700',
              backfaceVisibility: 'hidden',
              transform: `rotateX(90deg) translateZ(${cubeSize / 2}px)`,
            }}
          >
            5
          </Box>

          {/* Face bas */}
          <Box
            sx={{
              position: 'absolute',
              width: cubeSize,
              height: cubeSize,
              backgroundColor: 'white',
              border: '2px solid black',
              borderRadius: borderRadius,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '5rem',
              fontWeight: '700',
              backfaceVisibility: 'hidden',
              transform: `rotateX(-90deg) translateZ(${cubeSize / 2}px)`,
            }}
          >
            2
          </Box>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={rollCube}
      >
        Lancer le cube
      </Button>

      <Box sx={{ mt: 2, fontSize: '2rem', fontWeight: '700' }}>
        Numéro : {number}
      </Box>
    </Box>
  )
}

export default DiceCube
