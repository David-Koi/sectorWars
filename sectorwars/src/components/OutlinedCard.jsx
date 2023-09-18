import React, {useEffect, useState} from 'react';
import { DetailsModal } from './DetailsModal';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../assets/fonts/StarJediRounded.ttf";
import '../css/fontStyle.css';  

/**
 * 
 * @param {{character:{}, openError:function, setErrorMessage:function, errorModal:boolean}}
 * @param character object with character data.
 * @param openError handler to open the errorModal.
 * @param setErrorMessage setter method to stablish the error message in errorModal.
 * @param errorModal boolean that open or close the errorModal.
 * @returns Card component from MUI material with the charater details.
 */
export default function OutlinedCard({
  character,
  openError,
  setErrorMessage,
  errorModal,
}) {

  /** 
   * @description constants and methods to controle the the DetailsModal  
  */
  const [open, setOpen] = useState(false);//boolean to open or close it.
  const handleClose = () => setOpen(false);//function to close it.
  const handleOpen = () => setOpen(true);//function to open it.

  /**
   * @description to close the DetailsModal if the errorModal is opened.
   */
  useEffect(()=>{
    errorModal && handleClose();
  },[errorModal]);


  return (
    <>
      <Box 
        sx={{ 
          minWidth: 275,maxWidth: 275, maxHeight: 250, minHeight:250,
          border:'6px solid #FFE81F', 
          margin:'20px', borderRadius:'20px',
          backgroundColor:'rgb(0, 0, 0, 0.7)', 
        }}
      >
        {character !== undefined ? 
          <>
            <CardContent style={{padding:'5%', marginLeft:'10%'}} >
              <Typography color="#FFE81F" component="div" 
              style={{
                textDecoration:'underline', 
                fontFamily:"star", 
                fontSize:'18px'
              }}
            >
                {character?.name.toLowerCase()}
              </Typography>
              <Typography sx={{ mb: 1.5, ml: 2, mt:2 }} color="#FFE81F">
                Birth year: 
                  <small style={{color:'white'}}>
                    {character?.birth_year}
                  </small>
              </Typography>
              <Typography sx={{ mb: 1.5, ml: 2 }}color="#FFE81F">
                Gender: 
                  <small style={{color:'white'}}>
                    {character?.gender}
                  </small>
              </Typography>
              <Typography sx={{ mb: 1.5, ml: 2, mt:2 }} color="#FFE81F">
                Appears in {character?.films?.length} movies.
              </Typography>
            </CardContent>
            {/*BUTTON TO OPEN DetailsModal*/}
            <CardActions style={{marginLeft:'10%'}}>
              <Button onClick={handleOpen} 
                size="small" 
                style={{color:'white', }}
                >More details.</Button>
            </CardActions>    
          </>

        :
          /* IF THE CHARACTER OBJECT COMES AS UNDEFINED*/
          <CardContent style={{padding:'5%'}} >
            <Typography color="red" component="div" 
              style={{
                fontFamily:"star", fontSize:'18px', 
                textAlign:'center', height:200, 
                display:'flex', alignItems:'center'
              }}
            >
              Character data not loaded
            </Typography>
          </CardContent>
        }
      </Box>
        
      {open && 
        <DetailsModal 
          open={open} setOpen={setOpen} 
          handleOpen={handleOpen} handleClose={handleClose}
          character={character}
          openError={openError}
          setErrorMessage={setErrorMessage}
          errorModal={errorModal}
        />
      }
    </>
  );
}