import { Box, Button } from '@mui/material'
import { useState } from 'react'
import top10Image from '../assets/image.jpg' // <-- importe l'image

function TopTen() {
  const [number, setNumber] = useState<number>(10)
  const [flipped, setFlipped] = useState<boolean>(false)

  const flipCard = () => {
    const randomNum = Math.floor(Math.random() * 10) + 1
    setFlipped(true)

    setTimeout(() => {
      setNumber(randomNum)
    }, 300)

    setTimeout(() => {
      setFlipped(false)
    }, 600)
  }

  return (
    <Box
      sx={{
        backgroundColor: '#F0E68C',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ perspective: '1000px' }}>
        <Box
          sx={{
            width: 200,
            height: 300,
            borderRadius: 2,
            border: '2px solid black',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Face avant avec image */}
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
            }}
          >
            <img
              src={top10Image}
              alt="Top 10"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
          </Box>

          {/* Face arrière avec le numéro */}
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              backgroundColor: '#FFFACD',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '7rem',
              fontWeight: '700',
              borderRadius: 2,
              border: '2px solid black',
            }}
          >
            {number}
          </Box>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={flipCard}
      >
        Lancer le numéro
      </Button>
    </Box>
  )
}

export default TopTen
