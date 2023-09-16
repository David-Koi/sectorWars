import React, {useEffect, useState} from "react";
import axios from "axios";
import { StyledButton } from "./StyledButton";
import Grid from '@mui/material/Grid';
import OutlinedCard from "./OutlinedCard";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import loadingGif from '../assets/images/loadingGif.gif';

export const ListCharacter = () => {

    const [actualPage, setActualPage] = useState(1);
    const [actualData, setActualData] = useState({});
    const [loading, setLoading] = useState(true)

    const nextPage = (actualData)=>{
        setLoading(true);
        if(actualData?.next !== null){
            setActualPage(actualPage + 1);
            characterCaller(actualData?.data?.next);
        };
    };

    const prevPage = (actualData) => {
        setLoading(true);
        if(actualData?.previous !== null){
            setActualPage(actualPage - 1);
            characterCaller(actualData?.data?.previous);
        };

    };

    const mainPage = () => {
        setLoading(true);
        setActualPage(1);
    };

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
            setLoading(false)
            console.log(err)
        })
    };

    useEffect(()=>{
        if(actualPage === 1){
            characterCaller("https://swapi.dev/api/people/")
        }
    },[actualPage]);

    return(
        <Grid container>
            <Grid item md={12} style={{height:'90vh'}}>
                <Grid item md={12} 
                    style={{
                        height:'85%', display:'flex',
                        flexWrap:'wrap', marginTop:'5%', display:'flex', justifyContent:'center',
                    }}
                >
                    {!loading ?
                        actualData?.data?.results?.map((character)=>{
                            return(
                                <OutlinedCard character={character}/>
                            )
                        })
                    :
                        <Grid item md={12} style={{height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <img id='loadingGif' style={{width:'200px', height:'200px'}} src={loadingGif}/>
                        </Grid>
                    }
                </Grid>
                <Grid item md={12} 
                    style={{
                        color:'white', display:'flex', 
                        justifyContent:'space-between', 
                        margin:'50px'
                    }}
                >
                    <StyledButton 
                        available={
                            actualData?.data?.previous !== null 
                                && loading === false ? false : true
                        } 
                        buttonTitle={<ArrowBackIosIcon/>} 
                        onClickfunction={function(){prevPage(actualData)}}
                    />
                    <StyledButton 
                        available={actualPage === 1 
                            || loading === true ? true : false
                        } 
                        buttonTitle={'Main'} 
                        onClickfunction={function(){mainPage(actualData)}}
                    />
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
        </Grid>
    );
};