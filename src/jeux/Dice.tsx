import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

type DiceProps = {
  rollTrigger: number
  size?: number
}

function Dice({ rollTrigger, size = 100 }: DiceProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const number = Math.floor(Math.random() * 6) + 1

    let x = 0
    let y = 0

    switch (number) {
      case 1: x = 0; y = 0; break
      case 2: x = -90; y = 0; break
      case 3: x = 0; y = 90; break
      case 4: x = 0; y = -90; break
      case 5: x = 90; y = 0; break
      case 6: x = 0; y = 180; break
    }

    x += 360 * (Math.floor(Math.random() * 2) + 1)
    y += 360 * (Math.floor(Math.random() * 2) + 1)

    setRotation({ x, y })
  }, [rollTrigger])

  const faceStyle = {
    position: 'absolute',
    width: size,
    height: size,
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '4rem',
    fontWeight: 700,
    backfaceVisibility: 'hidden',
  }

  return (
    <Box sx={{ perspective: 400 }}>
      <Box
        sx={{
          width: size,
          height: size,
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 1s cubic-bezier(.25,.8,.25,1)',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <Box sx={{ ...faceStyle, transform: `translateZ(${size / 2}px)` }}>
            <img
                src={'../../src/assets/Dice1.png'}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
        </Box>
        <Box sx={{ ...faceStyle, transform: `rotateY(180deg) translateZ(${size / 2}px)` }}>
            <img
                src={'../../src/assets/Dice6.png'}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
        </Box>
        <Box sx={{ ...faceStyle, transform: `rotateY(90deg) translateZ(${size / 2}px)` }}>
            <img
                src={'../../src/assets/Dice3.png'}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
        </Box>
        <Box sx={{ ...faceStyle, transform: `rotateY(-90deg) translateZ(${size / 2}px)` }}>
            <img
                src={'../../src/assets/Dice4.png'}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
        </Box>
        <Box sx={{ ...faceStyle, transform: `rotateX(90deg) translateZ(${size / 2}px)` }}>
            <img
                src={'../../src/assets/Dice5.png'}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
        </Box>
        <Box sx={{ ...faceStyle, transform: `rotateX(-90deg) translateZ(${size / 2}px)` }}>
            <img
                src={'../../src/assets/Dice2.png'}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
        </Box>
      </Box>
    </Box>
  )
}

export default Dice
