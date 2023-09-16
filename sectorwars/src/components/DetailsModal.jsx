import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import loadingGif from '../assets/images/loadingGif.gif';
import Grid from '@mui/material/Grid';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  border:'1px solid #FFE81F', 
  borderRadius:'20px',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({
    open, 
    handleClose,
    character,
}) {

    let urls = [];
    let today = new Date().getFullYear();
    const [dataFilm, setDataFilm] = useState([]);

    const takeFilm = async (url)=> {
        let aux = urls.filter((elm)=> elm === url);
        if(aux.length === 0){
            urls.push(url);
            await axios
            .get(url)
            .then((res)=>{
                if(res?.status === 200){
                    setDataFilm((prev)=>[...prev, res]);            
                };
            })
            .catch((err)=>{
                console.log(err)
            })
        };
    };
    
    const yearsCalculator =(date)=> {
        let aux = Number(date.slice(0,4));
        return today - aux;
    };

    useEffect(()=>{
        if(character !== undefined){
            character?.films?.forEach((url)=>
                takeFilm(url));
        }
    },[character]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        style={{color:'#FFE81F'}}
      >
        <Fade in={open}>
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
                    bgcolor: dataFilm !== undefined && dataFilm.length === character?.films?.length ? 'rgb(0, 0, 0, 0.9)' : 'black'
                }}
            >
                {dataFilm !== undefined && dataFilm.length === character?.films?.length ?   
                    <>
                        <Typography variant="h5" color="#FFE81F" component="div" style={{textDecoration:'underline'}}>
                            {character?.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5, ml: 2, mt: 2 }} color="#FFE81F">
                            Height: <small style={{color:'white'}}>{character?.height}</small>
                        </Typography>
                        <Typography sx={{ mb: 1.5, ml: 2 }} color="#FFE81F">
                            Mass: <small style={{color:'white'}}>{character?.mass}</small>
                        </Typography>
                        <Typography sx={{ mb: 1.5, ml: 2 }} color="#FFE81F">
                            Hair color: <small style={{color:'white'}}>{character?.hair_color}</small>
                        </Typography>
                        <Typography sx={{ mb: 1.5, ml: 2 }} color="#FFE81F">
                            Skin color: <small style={{color:'white'}}>{character?.skin_color}</small>
                        </Typography>
                        <Typography sx={{ mb: 1.5, ml: 2 }} color="#FFE81F">
                            Eye color: <small style={{color:'white'}}>{character?.eye_color}</small>
                        </Typography>
                        <Typography sx={{ mb: 1.5, ml: 2, mt:2 }} color="#FFE81F">
                            Birth year: <small style={{color:'white'}}>{character?.birth_year}</small>
                        </Typography>
                        <Typography sx={{ mb: 1.5, ml: 2 }} color="#FFE81F"º>
                            Gender: <small style={{color:'white'}}>{character?.gender}</small>
                        </Typography>
                        <Typography sx={{ mb: 1.5, ml: 2 }} color="#FFE81F">
                            Appears in {character?.films?.length} movies.
                        </Typography>
                        {dataFilm.map((film)=>{
                            return(
                                <Typography sx={{ mb: 1.5, ml: 4 }} color="white">
                                    {film?.data?.title}, {yearsCalculator(film?.data?.release_date)} years ago.
                                </Typography>
                            )
                        })}
                    </>
                :
                    <Grid item md={12} style={{height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <img id='loadingGif' style={{width:'200px', height:'200px'}} src={loadingGif}/>
                    </Grid>
                }
            </Box>
        </Fade>
      </Modal>
    </div>
  );
}