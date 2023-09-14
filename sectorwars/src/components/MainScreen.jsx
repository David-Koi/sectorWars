import React, {useEffect, useState} from "react";
import axios from "axios";
import { StyledButton } from "./StyledButton";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import  video from "../assets/video/intro.mp4";
import backgroundImg from "../assets/images/backgroundImg.jpg";
import { ListCharacter } from "./ListCharacter";
import "./MainScreen.css";

export const MainScreen = () => {

    const mainCaller = () =>{
        axios
            .get("https://swapi.dev/api/")
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
                                controls //=> a eliminar cuando se acabe el desarrollo
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                            </Grid>
                        <Grid md={12} 
                            style={{
                                display:'flex', justifyContent:'right'
                            }
                        }>
                            <StyledButton 
                                id="unmuteButton"
                                buttonTitle={`Mute ${videoMute ? 'on' : 'off'}`} 
                                onClickfunction={function(){setVideoMute(!videoMute)}}
                            />
                        </Grid>
                    </Grid>
                       
                :
                                
                    <Grid item md={12}
                    className="mainScreen"
                        style={{
                            height:'100vh',
                            backgroundImage: `url(${backgroundImg})`,
                        }}
                    >
                        <ListCharacter/>   
                    </Grid>
                }
            </Grid>
        </Box>
    );
};