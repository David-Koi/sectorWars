import React, {useEffect, useState} from "react";
import axios from "axios";
import { StyledButton } from "./StyledButton";
import OutlinedCard from "./OutlinedCard";
import Grid from '@mui/material/Grid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import loadingGif from '../assets/images/loadingGif.gif';
import "../assets/fonts/StarJediRounded.ttf";
import '../css/fontStyle.css'; 

/**
 * @param {{openError:function, setErrorMessage: function, errorModal:boolean}} 
 * @param openError handler to open the errorModal.
 * @param  setErrorMessage setter method to stablish the error message in errorModal.
 * @param errorModal boolean that open or close the errorModal.
 * @returns List of characters, displaying as Mui Material Cards component. It 
 * controls also the advance or recoil throw the list.
 */
export const ListCharacter = ({   
    openError,
    setErrorMessage,
    errorModal,
}) => {

    const [actualPage, setActualPage] = useState(1);// to control the number of character pages loaded
    const [actualData, setActualData] = useState({});//last character set loaded from API.
    const [loading, setLoading] = useState(true) //boolean to open or close the load gif.

    /**
     * @param {{actualData:[]}} 
     * @param actualData array with the list of characters as objects.
     * @description active the loading gif, check if the url to the next set is empty, advance the page number
     * and send the url to the @characterCaller
     */
    const nextPage = (actualData)=>{
        setLoading(true);
        if(actualData?.next !== null){
            setActualPage(actualPage + 1);
            characterCaller(actualData?.data?.next);
        };
    };

     /**
     * @param {{actualData:[]}} 
     * @param actualData array with the list of characters as objects.
     * @description active the loading gif, check if the url to the next set is empty, advance the page number
     * and send the url to the @characterCaller
     */
    const prevPage = (actualData) => {
        setLoading(true);
        if(actualData?.previous !== null){
            setActualPage(actualPage - 1);
            characterCaller(actualData?.data?.previous);
        };

    };

    /**
     * @description go to the first page of set. restablish the number of the page
     * to 1 and active the loading gif.
     */
    const mainPage = () => {
        setLoading(true);
        setActualPage(1);
    };

    /**
     * 
     * @param {{url:string}} 
     * @param url url as string to consult the API.
     * @description recieve the URL and call to the API with it. Set actualData
     * with the answer and turn of the loading gif if the call was succefuly, 
     * and if it´s not, open the errorModal with the message from the answer. 
     */
    const characterCaller = (url) =>{   
        axios
        .get(url)
        .then((res)=>{
            if(res?.status === 200){
                setActualData(res);
                setLoading(false)
            };
        })
        .catch((err)=>{
            setLoading(false);
            openError();
            setErrorMessage(err.message);
        })
    };

    /**
     * @description launch the first query when the component is loaded,
     * or the @mainPage function is used.
     */
    useEffect(()=>{
        if(actualPage === 1){
            characterCaller("https://swapi.dev/api/people/")
        }
    },[actualPage]);

    return(
        <Grid container style={{flexDirection:'column'}}>
            <Grid item md={12} style={{minHeight:'90vh'}}>
                <h1 
                    style={{
                        fontFamily:'star', color:'#FFE81F', 
                        textAlign:'center'
                    }}
                >STAR WARS CHARACTERS</h1>

                {/* CONTAINER WITH THE LIST*/}
                <Grid item md={12} 
                    style={{
                        height:'85%', display:'flex',
                        flexWrap:'wrap', marginTop:'2%', 
                        justifyContent:'center',
                    }}
                >
                    {/*maper of cards */}
                    {!loading ?
                        actualData?.data?.results?.map((character)=>{
                            return(
                                <OutlinedCard 
                                    character={character}
                                    openError={openError}
                                    setErrorMessage={setErrorMessage}
                                    errorModal={errorModal} 
                                />
                            )
                        })
                    :
                        //LOADING GIF
                        <Grid item md={12} 
                            style={{
                                minHeight:'65vh', display:'flex', 
                                justifyContent:'center', 
                                alignItems:'center'
                            }}
                        >
                            <img id='loadingGif' 
                                style={{width:'250px', height:'250px', opacity:'0.5'}} 
                                src={loadingGif}
                            />
                        </Grid>
                    }
                </Grid>
            </Grid>

            {/*BUTTONS container */}
            <Grid item md={12} 
                style={{
                    display:'flex', 
                    justifyContent:'space-between', 
                    margin:'50px'
                }}
            >
                {/* PREVIOUS BUTTON*/}
                <StyledButton 
                    available={
                        actualData?.data?.previous !== null 
                            && loading === false ? false : true
                    } 
                    buttonTitle={<ArrowBackIosIcon/>} 
                    onClickfunction={function(){prevPage(actualData)}}
                />
                {/* MAIN BUTTON*/}
                <StyledButton 
                    available={actualPage === 1 
                        || loading === true ? true : false
                    } 
                    buttonTitle={'Main'} 
                    onClickfunction={function(){mainPage(actualData)}}
                />
                {/*NEXT BUTTON*/}
                <StyledButton 
                    available={
                        actualData?.data?.next !== null 
                            && loading === false ? false : true
                        } 
                    buttonTitle={<ArrowForwardIosOutlinedIcon/>} 
                    onClickfunction={function(){nextPage(actualData)}}
                />
            </Grid>
        </Grid>
    );

};

