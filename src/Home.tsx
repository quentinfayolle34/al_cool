import { Box, TextField, Typography, IconButton, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'

function Home() {
  const [players, setPlayers] = useState<string[]>([])
  const [name, setName] = useState('')

  const handleAddPlayer = (e: React.KeyboardEvent) => {
    if (
      e.key === 'Enter' &&
      name.trim() !== '' &&
      name.trim().length <= 15
    ) {
      setPlayers([...players, name.trim()])
      setName('')
    }
  }

  const handleRemovePlayer = (indexToRemove: number) => {
    setPlayers(players.filter((_, index) => index !== indexToRemove))
  }

  return (
    <Box
      sx={{
        backgroundColor: '#F0E68C',
        width: '100vw',
        height: '100vh',
        p: 4,
        boxSizing: 'border-box',
      }}
    >
      {/* Titre */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Typography sx={{ color: 'black', fontSize: 32, fontWeight: 800 }}>
          Nouvelle Game
        </Typography>
      </Box>

      {/* Input */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        
        <input
          type="text"
          maxLength={15} 
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleAddPlayer}
          style={{
            border: '2px solid black',
            borderRadius: '8px',
            backgroundColor: '#FFFACD',
            padding: '8px 12px',
            fontSize: '16px',
            outline: 'none',
            width: '250px',
          }}
        />

      </Box>

      <Box
            sx={{
              margin: '0 auto',
              width: '60%',
              height: '50%',
              backgroundColor: '#FFFACD',
              borderRadius: 2,
              border: '2px solid black', 
              p: 2,
              display: 'grid',
              gap: 2,
              alignContent: 'start',
              overflowY: 'auto',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
            }}
          >


        {players.map((player, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              backgroundColor: '#F0E68C',
              borderRadius: 1,
              p: 2,
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            <IconButton
              size="small"
              onClick={() => handleRemovePlayer(index)}
              sx={{
                color:'black',
                position: 'absolute',
                top: 10,
                right: 4,
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ color: 'black', fontSize: 16, fontWeight: 600 }}>
              {player}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center',marginTop:'5px'}}>
        <Button sx={{width:'60%'}} variant="contained"  disabled={(players.length < 3)} >
          Lancer une Game 
        </Button>
      </Box>
      
    </Box>
  )
}

export default Home
