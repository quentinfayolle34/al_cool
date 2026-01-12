import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography, type DialogProps } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import Dice from './Dice'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

function DiceGame() {
  const [rollId, setRollId] = useState(0)

  const rollDices = () => {
    setRollId(prev => prev + 1) // 🔑 déclenche les deux dés
  }

const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#FEE685',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      onClick={rollDices}
    >
    <Box sx={{display:'flex'}}>
      <Typography fontSize={45} fontWeight={700} >
        Treeman
      </Typography>
      <IconButton
        sx={{
          position: 'absolute',
          right: 5,
          color:'black'
        }}
        onClick={(e) => {
          e.stopPropagation()
          handleClickOpen('paper')()
          // ouvrir modal info ici
        }}
      >
        <InfoOutlinedIcon fontSize="large" />
      </IconButton>

    </Box>
      
      {/* Dés côte à côte */}
      <Box sx={{ display: 'flex', gap: 10, marginTop:'10rem' }}>
        <Dice rollTrigger={rollId} />
        <Dice rollTrigger={rollId} />
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">🎲 Le jeu du Treeman</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
          sx={{color:'black'}}
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
           Le jeu se joue avec 2 dés et se déroule en 2 phases.<br/><br/>

           <Typography fontSize={22}> 🔎 Phase 1 : Trouver le Treeman</Typography>

            Les joueurs jouent chacun leur tour.
            Si un 3 apparaît sur un dé OU si la somme des dés fait 3, alors :<br/>

            Ce joueur devient le Treeman.

            Tous les autres joueurs boivent pour l’accueillir.

            👉 Une fois le Treeman désigné, on passe à la phase 2.

            <Typography fontSize={22}>🌳 Phase 2 : Le jeu du Treeman</Typography>
            Déroulement des tours
            <Typography sx={{marginLeft:'20px'}}>
             <li>Le Treeman commence.</li> 

              <li>Tant que le Treeman boit, il relance les dés.</li>

              <li>Dès qu’il ne boit pas, le tour passe au joueur suivant (dans le sens du jeu).</li>

              <li>Un joueur continue de jouer tant qu’il fait boire le Treeman.</li>

              <li>S’il ne le fait pas boire, le tour passe au suivant.</li>
            
            </Typography>
              <Typography fontSize={22}>🎯 Combinaisons de dés</Typography>

              Règles générales
              <Typography sx={{marginLeft:'20px'}}>
                <li>Un 3 OU somme = 3 → Le Treeman boit</li>

                <li>Somme = 10 → Tout le monde boit</li>

                <li>Somme = 7 → Le joueur à gauche boit</li>

                <li>Somme = 11 → Le joueur à droite boit</li>

                <li>Somme = 5 → Le dernier à toucher son nez boit</li>

                <li>Somme = 6 ou 9 → 🙏 Le joueur s’excuse et boit</li>
              </Typography>

              <br/>Doubles et actions spéciales
              <Typography sx={{marginLeft:'20px'}}>
                <li>Un double (n’importe lequel) → <br/>
                👉 Le joueur qui a lancé les dés fait boire le nombre de gorgées qu’il veut à qui il veut.</li>

                <li>Double 3 → 🥴 Le Treeman boit cul sec</li>
              </Typography>

              <br/>Gestes à retenir (réflexes)

              <Typography sx={{marginLeft:'20px'}}>
              <li>1 et 6 → ☝️ Pointer 1 doigt</li>

              <li>2 et 6 → ✌️ Pointer 2 doigts</li>

              <li>3 et 6 → 👉 Faire un point</li>
              </Typography>
              <i>(Le dernier à faire le bon geste boit)</i>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default DiceGame
