import React, {useEffect, useState} from "react";
import axios from "axios";
import { StyledButton } from "./StyledButton";


import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export const ListCharacter = () => {

    let characterData = [];
    let actualPage = 1;
    const [actualData, setActualData] = useState({});
    const [loading, setLoading] = useState(false)


    const nextPage = (actualData)=>{
        setLoading(true);
        actualPage = actualPage + 1;
        if(actualData?.next !== null && characterData[actualPage - 1] === undefined){
            characterCaller(actualData?.data?.next);
        }else{
            setActualData(characterData[actualPage - 1]);
            setLoading(false);
        };
    };

    const prevPage = (actualData) => {
        setLoading(true);
        actualPage = actualPage - 1;
        if(actualData?.previous !== null && characterData[actualPage - 1] === undefined){
            characterCaller(actualData?.data?.previous);
        }else{
            setLoading(false);
            setActualData(characterData[actualPage - 1]);
        };

    };

        const characterCaller = (url) =>{   
            console.log(url)
            axios
            .get(url)
            .then((res)=>{
                console.log(res)
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
            console.log(actualPage)
            if(actualPage === 1){
                characterCaller("https://swapi.dev/api/people/")
            }
        },[actualPage]);

        useEffect(()=>{
            console.log(actualData)
        },[actualData]);

    return(
        <Grid container>
            <Grid item md={12} style={{height:'90vh'}}>
                <Grid item md={12} style={{height:'99%'}}>

                </Grid>
                <Grid item md={12} 
                    style={{
                        color:'white', display:'flex', 
                        justifyContent:'space-between', 
                        margin:'45px'
                    }}
                >
                    <StyledButton available={actualData?.data?.previous !== null && loading === false ? false : true} buttonTitle={'Prev...'} onClickfunction={function(){prevPage(actualData)}}/>
                    <StyledButton available={actualData?.data?.next !== null && loading === false ? false : true} buttonTitle={'Next...'} onClickfunction={function(){nextPage(actualData)}}/>
                    
                </Grid>
            </Grid>
        </Grid>
    );
};