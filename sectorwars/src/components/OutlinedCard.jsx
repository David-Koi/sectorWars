import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TransitionsModal from './DetailsModal';

export default function OutlinedCard({character}) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
console.log('hola')
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box 
        sx={{ 
          minWidth: 275, maxHeight: 250,
          border:'1px solid #FFE81F', 
          margin:'50px', borderRadius:'20px',
          backgroundColor:'rgb(27, 38, 49, 0.7)',
        }}
      >
        <CardContent style={{padding:'5%', marginLeft:'10%'}}>
          {/*
          <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
            Word of the Day
          </Typography>
          */}
          <Typography variant="h5" color="#FFE81F" component="div" style={{textDecoration:'underline'}}>
            {character?.name}
          </Typography>
          <Typography sx={{ mb: 1.5, ml: 2, mt:2 }} color="#FFE81F">
            Birth year: {character?.birth_year}
          </Typography>
          <Typography sx={{ mb: 1.5, ml: 2 }}color="#FFE81F" variant="body2">
            {character?.gender}
            <br />
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