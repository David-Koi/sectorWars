import React, {useEffect, useState} from "react";
import axios from "axios";
import { StyledButton } from "./StyledButton";


import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export const ListCharacter = () => {

    const [actualPageData, setActualPageData] = useState([]);

    const characterCaller = () =>{
        axios
            .get("https://swapi.dev/api/people/")
            .then((res)=>{
                if(res.status === 200){
                    console.log(res)
                    setActualPageData(res?.data?.results);
                };
            })
            .catch((err)=>{
                console.log(err)
            })
    };

    useEffect(()=>{
        characterCaller();
    },[]);

    useEffect(()=>{
        console.log(actualPageData);
    },[actualPageData]);
    return(
        <Grid container>
            <Grid item md={12} style={{height:'90vh'}}>
                <Grid item md={12} style={{color:'white'}}>
                    <StyledButton buttonTitle={'Prev...'}/>
                    <StyledButton buttonTitle={'Next...'}/>
                </Grid>
            </Grid>
        </Grid>
    );
};