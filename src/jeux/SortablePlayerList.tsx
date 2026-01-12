import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Box, Paper, Typography } from '@mui/material'

type Player = {
  player: string
  number: number
}

type Props = {
  players: Player[]
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
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
        padding: 2,
        marginBottom: 1,
        cursor: 'grab',
        backgroundColor: 'black',
        color:'white'
      }}
    >
      <Typography>{player}</Typography>
    </Paper>
  )
}

export default function SortablePlayerList({ players, setPlayers }: Props) {
  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setPlayers((items) => {
        const oldIndex = items.findIndex(p => p.player === active.id)
        const newIndex = items.findIndex(p => p.player === over.id)

        const newArray = [...items]
        const [moved] = newArray.splice(oldIndex, 1)
        newArray.splice(newIndex, 0, moved)

        return newArray
      })
    }
  }

  return (
    <Box sx={{ mt: 4, width: 300 , border:'2px solid black',p:2,borderRadius:2,color:'white'}}>
     <Typography sx={{color:'black'}}> 10</Typography>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
        <SortableContext 
          items={players.map(p => p.player)}
          strategy={verticalListSortingStrategy}
          
        >
          {players.map((p) => (
            <SortableItem  key={p.player} player={p.player} />
          ))}
        </SortableContext>
      </DndContext>
      <Typography sx={{color:'black'}}> 1</Typography>
    </Box>
  )
}
