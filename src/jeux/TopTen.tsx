import { Box, Button, Typography, Paper } from '@mui/material'
import { useState } from 'react'
import top10Image from '../assets/image.jpg'

import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type Player = {
  player: string
  number: number
}

function SortableItem({ player }: { player: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: player })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        mb: 1.5,
        height: 56,
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'grab',
        borderRadius: 2,
        '&:active': {
          cursor: 'grabbing',
          opacity: 0.85,}
      }}
    >
      <Typography fontSize="1.4rem" fontWeight={600}>
        {player}
      </Typography>
    </Paper>
  )
}

export default function TopTen() {
  const [players, setPlayers] = useState<Player[]>([
    { player: 'Quentin', number: 0 },
    { player: 'Jeanne', number: 0 },
    { player: 'Louis', number: 0 },
  ])

  const [count, setCount] = useState(0)
  const [number, setNumber] = useState<number | null>(null)
  const [flipped, setFlipped] = useState(false)
  const [showResult, setShowResult] = useState(false)

  // 🔥 LISTE DES NUMÉROS DISPONIBLES
  const [availableNumbers, setAvailableNumbers] = useState<number[]>(
    Array.from({ length: 10 }, (_, i) => i + 1)
  )

  const question =
    'Vous arrivez sur Mars : 1 = mission utile, 10 = mission inutile'

  const flipCard = () => {
    if (availableNumbers.length === 0) return

    const randomIndex = Math.floor(
      Math.random() * availableNumbers.length
    )

    const pickedNumber = availableNumbers[randomIndex]

    setFlipped(true)
    setNumber(pickedNumber)

    // attribuer le numéro au joueur courant
    setPlayers(prev =>
      prev.map((p, index) =>
        index === count ? { ...p, number: pickedNumber } : p
      )
    )

    // retirer le numéro utilisé
    setAvailableNumbers(prev =>
      prev.filter((_, i) => i !== randomIndex)
    )


    setTimeout(() => {setFlipped(false),   setCount(prev => prev + 1) }, 1000)
    

  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setPlayers(items => {
      const oldIndex = items.findIndex(p => p.player === active.id)
      const newIndex = items.findIndex(p => p.player === over.id)

      const newArray = [...items]
      const [moved] = newArray.splice(oldIndex, 1)
      newArray.splice(newIndex, 0, moved)

      return newArray
    })
  }

  return (
    <Box
      sx={{
        backgroundColor: '#F0E68C',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {players.length > count ? (
        <>
          {/* CARD */}
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
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              </Box>

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
                  fontSize: '6rem',
                  fontWeight: 700,
                  borderRadius: 2,
                }}
              >
                {number}
              </Box>
            </Box>
          </Box>

          <Button
            variant="contained"
            sx={{ mt: 4, backgroundColor: 'black' }}
            onClick={flipCard}
            disabled={flipped}
          >
            Numéro pour {players[count].player}
          </Button>
        </>
      ) : (
        <>
          <Typography fontSize={28} fontWeight={600} textAlign="center" mb={3}>
            {question}
          </Typography>

          <Box
            sx={{
              width: 300,
              border: '2px solid black',
              borderRadius: 2,
              p: 2,
              backgroundColor: '#222',
            }}
          >
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={players.map(p => p.player)}
                strategy={verticalListSortingStrategy}
              >
                {players.map(p => (
                  <SortableItem key={p.player} player={p.player} />
                ))}
              </SortableContext>
            </DndContext>
          </Box>

          <Button
            variant="contained"
            sx={{ mt: 3, backgroundColor: 'black' }}
            onClick={() => setShowResult(true)}
          >
            Voir le classement
          </Button>

          {showResult && (
            <Box
              sx={{
                mt: 4,
                width: 300,
                p: 2,
                borderRadius: 2,
                backgroundColor: '#000',
                color: 'white',
              }}
            >
              <Typography
                fontSize="1.5rem"
                fontWeight={600}
                textAlign="center"
                mb={2}
              >
                Classement final
              </Typography>

              {players.map((p, index) => (
                <Box
                  key={p.player}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <span>
                    {index + 1}. {p.player}
                  </span>
                  <span>{p.number}</span>
                </Box>
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  )
}
