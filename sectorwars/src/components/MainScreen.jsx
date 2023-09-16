import React, {useState} from "react";
import { StyledButton } from "./StyledButton";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import  video from "../assets/video/intro.mp4";
import backgroundImg from "../assets/images/backgroundImg.jpg";
import { ListCharacter } from "./ListCharacter";
import VolumeMuteTwoToneIcon from '@mui/icons-material/VolumeMuteTwoTone';
import VolumeOffTwoToneIcon from '@mui/icons-material/VolumeOffTwoTone';
import "./MainScreen.css";

export const MainScreen = () => {

    const [videoMute, setVideoMute] = useState(true); 
    const [videoEnd, setVideoEnd] = useState(false); 
                  
    return(
        <Box>
            <Grid container 
                style={{
                    backgroundColor:'black',
                }}
            >
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
                            <StyledButton 
                                id="unmuteButton"
                                buttonTitle={videoMute ? <VolumeOffTwoToneIcon/> : <VolumeMuteTwoToneIcon/>} 
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
                            background:'black'
                        }}
                    >
                        <ListCharacter/>   
                    </Grid>
                }
            </Grid>
        </Box>
    );
};