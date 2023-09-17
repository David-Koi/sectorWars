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

/**
 * @param {{open:boolean, handleClose:function, character:{}, openError:function, setErrorMessage:function}}
 * @param open stablish the state of the modal, close or open. 
 * @param character object with character data.
 * @param openError handler to open the errorModal.
 * @param setErrorMessage setter method to stablish the error message in errorModal.
 * @returns modal component from MUI material opened from the OutlinedCard component
 * with "More details" button.
 */
export default function DetailsModal({
    open, 
    handleClose,
    character,
    openError,
    setErrorMessage,
}){

    let urls = [];//array where i´ll put in the urls already used to not repeat.
    let today = new Date().getFullYear();//stablish the actual year to compare it with the date of the film.
    const [dataFilm, setDataFilm] = useState([]);//array with films as objects to .map later.

    /**
     * @param {{url:string}} url string with the url from the character.films array.
     * @description recieve each of the urls to call the API with it,
     * put the url in "urls" array to mark it as used, 
     * and set dataFilms with each of the answers to .map later. If the call is 
     * not succefuly, open the errorModal with a error message.
     */
    const takeFilm = async (url)=> {
        let aux = urls.filter((elm)=> elm === url);//check if the url has been already used.
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
                setErrorMessage(err.message)
                openError();
            })
        };
    };
    
    /**
     * @param {{date: string}} date string with each of the date the film was realease.
     * @returns the calculate between the actual year and the realease of the film.
     */
    const yearsCalculator =(date)=> {
        let aux = Number(date.slice(0,4));//has to extract the year from date.
        return today - aux;
    };

    /**
     * @description check if the character object comes as undefined to avoid errors
     * and take the dates of the films to show it, if comes undefined, 
     * open the errorModal.
     */
    useEffect(()=>{
        if(character !== undefined){
            character?.films?.forEach((url)=>
                takeFilm(url));
        }else{
            setErrorMessage('Character data not loaded')
            openError();
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
                    bgcolor:'black'
                }}
            >
                {/*this conditional makes the card wait to the end of the proccess */}
                {dataFilm !== undefined 
                    && dataFilm.length === character?.films?.length ?   
                    <>
                        <Typography variant="h5" color="#FFE81F" 
                            component="div" 
                            style={{
                                textDecoration:'underline', fontFamily:'star', 
                                fontSize:'30px'
                            }}
                        >
                            {character?.name?.toLowerCase()}
                        </Typography>
                        <Typography sx={{ mb: 1.5, ml: 2, mt: 2 }} color="#FFE81F">
                            Height: 
                                <small style={{color:'white'}}>
                                    {character?.height}
                                </small>
                        </Typography>
                        <Typography sx={{ mb: 1.5, ml: 2 }} color="#FFE81F">
                            Mass: 
                                <small style={{color:'white'}}>
                                    {character?.mass}
                                </small>
                        </Typography>
                        <Typography sx={{ mb: 1.5, ml: 2 }} color="#FFE81F">
                            Hair color: 
                                <small style={{color:'white'}}>
                                    {character?.hair_color}
                                </small>
                        </Typography>
                        <Typography sx={{ mb: 1.5, ml: 2 }} color="#FFE81F">
                            Skin color: 
                                <small style={{color:'white'}}>
                                    {character?.skin_color}
                                </small>
                        </Typography>
                        <Typography sx={{ mb: 1.5, ml: 2 }} color="#FFE81F">
                            Eye color: 
                                <small style={{color:'white'}}>
                                    {character?.eye_color}
                                </small>
                        </Typography>
                        <Typography sx={{ mb: 1.5, ml: 2, mt:2 }} color="#FFE81F">
                            Birth year: 
                                <small style={{color:'white'}}>
                                    {character?.birth_year}
                                </small>
                        </Typography>
                        <Typography sx={{ mb: 1.5, ml: 2 }} color="#FFE81F"º>
                            Gender: 
                                <small style={{color:'white'}}>
                                    {character?.gender}
                                </small>
                        </Typography>
                        <Typography sx={{ mb: 1.5, ml: 2 }} color="#FFE81F">
                            Appears in {character?.films?.length} movies.
                        </Typography>
                        {/* MAP of films list of the character*/}
                        {dataFilm.map((film)=>{
                            return(
                                <Typography sx={{ mb: 1.5, ml: 4 }} color="white">
                                    {film?.data?.title}, 
                                    {yearsCalculator(film?.data?.release_date)} years ago.
                                </Typography>
                            )
                        })}
                    </>
                :
                    /* LOADING GIF*/
                    <Grid item md={12} 
                        style={{
                            height:'100%', display:'flex', 
                            justifyContent:'center', alignItems:'center'
                        }}
                    >
                        <img id='loadingGif' 
                            style={{width:'200px', height:'200px'}} 
                            src={loadingGif}
                        />
                    </Grid>
                }
            </Box>
        </Fade>
      </Modal>
    </div>
  );
}