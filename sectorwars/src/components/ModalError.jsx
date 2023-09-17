import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import loadingGif from '../assets/images/loadingGif.gif';
import Grid from '@mui/material/Grid';
import "../assets/fonts/StarJediRounded.ttf";
import './fontStyle.css';  

export default function ModalError({
    errorModal, 
    closeError,
    errorMessage,
}) {

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={errorModal}
        onClose={closeError}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        style={{color:'#FFE81F'}}
      >
        <Fade in={errorModal}>
            <Box 
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'auto',
                    border:'5px solid #FFE81F', 
                    borderRadius:'20px',
                    boxShadow: 24,
                    p: 4,   
                    bgcolor: 'rgb(0, 0, 0, 0.9)',
                }}
            >
                <Typography variant="h5" color="red" component="div" style={{fontFamily:'star', fontSize:'30px'}}>
                    {errorMessage}
                </Typography>
            </Box>
        </Fade>
      </Modal>
    </div>
  );
}