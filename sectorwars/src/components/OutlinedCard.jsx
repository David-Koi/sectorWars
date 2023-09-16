import React, {useState} from 'react';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TransitionsModal from './DetailsModal';

export default function OutlinedCard({character}) {

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleOpen = () => {
    setOpen(true);
  };


  return (
    <>
      <Box 
        sx={{ 
          minWidth: 275, maxHeight: 250,
          border:'3px solid #FFE81F', 
          margin:'20px', borderRadius:'20px',
          backgroundColor:'rgb(0, 0, 0, 0.7)',
        }}
      >
        <CardContent style={{padding:'5%', marginLeft:'10%'}}>
          <Typography variant="h5" color="#FFE81F" component="div" style={{textDecoration:'underline'}}>
            {character?.name}
          </Typography>
          <Typography sx={{ mb: 1.5, ml: 2, mt:2 }} color="#FFE81F">
            Birth year: <small style={{color:'white'}}>{character?.birth_year}</small>
          </Typography>
          <Typography sx={{ mb: 1.5, ml: 2 }}color="#FFE81F">
            Gender: <small style={{color:'white'}}>{character?.gender}</small>
          </Typography>
          <Typography sx={{ mb: 1.5, ml: 2, mt:2 }} color="#FFE81F">
            Appears in {character?.films?.length} movies.
          </Typography>
        </CardContent>
        <CardActions style={{marginLeft:'10%'}}>
          <Button onClick={handleOpen} size="small" style={{color:'white', }}>More details.</Button>
        </CardActions>    
      </Box>
        
      {open &&
        <TransitionsModal 
          open={open} setOpen={setOpen} 
          handleOpen={handleOpen} handleClose={handleClose}
          character={character}
        />
      }

    </>
  );
}