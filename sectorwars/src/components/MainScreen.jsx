import React, {useEffect, useState} from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import  video from "../assets/video/intro.mp4";
import backgroundImg from "../assets/images/backgroundImg.jpg";

export const MainScreen = () => {

    const mainCaller = () =>{
        axios
            .get("https://swapi.dev/api/people/")
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
    };

    useEffect(()=>{
        mainCaller();
    },[]);

    const [videoMute, setVideoMute] = useState(true); 
    const [videoEnd, setVideoEnd] = useState(false); 
                  
    return(
        <Box>
            <Grid container>
                {!videoEnd ?
                        
                    <Grid item md={12}
                        style={{
                            height:'100vh', background:'black',
                        }}
                    >
                        <Grid md={12} style={{display:'flex', justifyContent:'center'}}>
                            <video 
                                id="myVideo" 
                                style={{
                                    width:'80%',
                                }}  
                                muted={videoMute}
                                autoPlay
                                onEnded={()=>setVideoEnd(true)}
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                            </Grid>
                        <Grid md={12} 
                            style={{
                                display:'flex', justifyContent:'right'
                            }
                        }>
                            <Button id="unmuteButton" 
                                onClick={()=>setVideoMute(!videoMute)} 
                                style={{
                                    width:'5%',
                                    border:'1px solid white',
                                    background:'transparent', 
                                    color:'white', position:'relative', 
                                    bottom:'20px', right:'10px'
                                }}
                            >Mute {videoMute ? 'on' : 'off'}</Button>
                        </Grid>
                    </Grid>
                       
                :
                                
                    <Grid item md={12}
                        style={{
                            height:'100vh',
                            backgroundImage: `url(${backgroundImg})`,
                        }}
                    >
                        
                    </Grid>
                }
            </Grid>
        </Box>
    );
};