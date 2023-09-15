import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { color } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'rgb(27, 38, 49, 0.9)',
  border:'1px solid #FFE81F', 
  borderRadius:'20px',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({
    open, 
    setOpen, 
    handleOpen, 
    handleClose,
    character,
}) {

    let films = [];
    const [loading, setLoading] = useState();
    const [data, setData] = useState([]);

    const takeFilm = async (url, position)=> {
        
        await axios
        .get(url)
        .then((res)=>{
            console.log(res)
            films.push(res);
            return res;
        })
        .catch((err)=>{
            console.log(err)
        })
    };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
            <Box sx={style}>
                {character !== undefined  ?
                    <>
                        <Typography variant="h5" color="#FFE81F" component="div" style={{textDecoration:'underline'}}>
                            {character?.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5, ml: 2 }} color="#FFE81F">
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
                        <Typography sx={{ mb: 1.5, ml: 2 }} color="#FFE81F" variant="body2">
                            Gender: <small style={{color:'white'}}>{character?.gender}</small>
                        </Typography>
                        <Typography sx={{ mb: 1.5, ml: 2 }} color="#FFE81F">
                            Appears in {character?.films?.length} movies.
                        </Typography>
                        {character?.films?.length > 0 ?

                            character?.films?.map((film, key)=>{
                                let data = takeFilm(film, key);
console.log(data)
                                return(
                                    <Typography sx={{ mb: 1.5, ml: 4 }} color="#FFE81F" variant="body2">
                                        <small style={{color:'white'}}>{data !== undefined ? data?.data?.title : 'Loading'} filmed in {data?.data?.release_date}</small>
                                    </Typography>
                                )
                            })
                        :
                            
                            <Typography sx={{ mb: 1.5, ml: 4 }} color="#FFE81F" variant="body2">
                                <small style={{color:'white'}}>No film data.</small>
                            </Typography>
                        }
                    </>
                :
                    <h1>Loading</h1>
                }
            </Box>
        </Fade>
      </Modal>
    </div>
  );
}