import React, {useEffect, useState} from "react";
import { StyledButton } from "./StyledButton"; 
import { ListCharacter } from "./ListCharacter";
import { ModalError } from "./ModalError";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import  video from "../assets/video/intro.mp4";
import VolumeMuteTwoToneIcon from '@mui/icons-material/VolumeMuteTwoTone';
import VolumeOffTwoToneIcon from '@mui/icons-material/VolumeOffTwoTone';
import "../css/MainScreen.css";

/**
 * @returns Main component, it calls other components and control the errors.
 */
export const MainScreen = () => {

    /**
     * @description constants to control the intro video
     */
    const [videoMute, setVideoMute] = useState(true); //video sound available or not.
    const [videoEnd, setVideoEnd] = useState(false); //video ended.
    let nodeRef = videoEnd ? true: false;
    /**
     * @description constants to control the errorModal and its message.
     */
    const [errorModal, setErrorModal] = useState(false); //open or close errorModal.
    const [errorMessage, setErrorMessage] = useState('err'); //message to display in errorModal.
    const closeError = () => setErrorModal(false); //errorModal handler
    const openError = () => setErrorModal(true); //errorModal handler

    /**
     * @param video video file for intro
     * @description control if video file is correctly loaded, if not, 
     * it directly load the ListCharacter component.
     */
    useEffect(()=>{
        if(!video){
            setVideoEnd(true);
        }
    },[video]);

    return(
        <>
            <Box>
                <Grid container 
                    style={{
                        backgroundColor:'black',
                    }}
                >   
                    {/*VIDEO */}
                    {!videoEnd ?
                        <Grid item md={12}
                            style={{
                                height:'100vh', background:'black',
                            }}
                        >
                            <Grid item md={12} 
                                style={{
                                    display:'flex', 
                                    justifyContent:'center'
                                }}
                            >
                                <video 
                                    id="myVideo" 
                                    style={{
                                        width:'80%',
                                    }}  
                                    muted={videoMute}
                                    autoPlay
                                    onEnded={()=>setVideoEnd(true)}
                                    controls
                                >
                                    <source src={video} type="video/mp4" />
                                </video>
                            </Grid>
                            {/*MUTE BUTTON */}
                            <Grid item md={12} 
                                style={{
                                    display:'flex', justifyContent:'right'
                                }
                            }>
                                <StyledButton 
                                    aria-label="unmuteButton"
                                    buttonTitle={
                                        videoMute ? 
                                            <VolumeOffTwoToneIcon/> 
                                        : 
                                            <VolumeMuteTwoToneIcon/>
                                    } 
                                    onClickfunction={
                                        function(){setVideoMute(!videoMute)}
                                    }
                                />
                            </Grid>
                        </Grid>
                        
                    :
                       
                        <Grid item md={12}
                            className="inAnimation"
                        >
                            <ListCharacter
                                errorModal={errorModal} 
                                openError={openError}
                                setErrorMessage={setErrorMessage}  
                            />   
                        </Grid>
                    }
                </Grid>
            </Box>

            {errorModal &&
                <ModalError 
                    errorModal={errorModal} 
                    closeError={closeError} 
                    errorMessage={errorMessage}
                />        
            }
        </>
    );
};