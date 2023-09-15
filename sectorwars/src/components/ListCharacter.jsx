import React, {useEffect, useState} from "react";
import axios from "axios";
import { StyledButton } from "./StyledButton";
import Grid from '@mui/material/Grid';
import OutlinedCard from "./OutlinedCard";

export const ListCharacter = () => {

    let characterData = [];
    let actualPage = 1;
    const [actualData, setActualData] = useState({});
    const [loading, setLoading] = useState(false)

    const nextPage = (actualData)=>{
        setLoading(true);
        actualPage = actualPage + 1;
        if(actualData?.next !== null 
            && characterData[actualPage - 1] === undefined)
        {
            characterCaller(actualData?.data?.next);
        }else{
            setActualData(characterData[actualPage - 1]);
            setLoading(false);
        };
    };

    const prevPage = (actualData) => {
        setLoading(true);
        actualPage = actualPage - 1;
        if(actualData?.previous !== null 
            && characterData[actualPage - 1] === undefined)
        {
            characterCaller(actualData?.data?.previous);
        }else{
            setActualData(characterData[actualPage - 1]);
            setLoading(false);
        };

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
                        flexWrap:'wrap', marginTop:'5%'
                    }}
                >
                    {!loading ?
                        actualData?.data?.results?.map((character)=>{
                            return(
                                // <Grid md={3}>
                                    <OutlinedCard character={character}/>
                                // </Grid>
                            )
                        })
                    :
                        <h1 style={{color:'white'}}> loading</h1>
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
                        buttonTitle={'Prev...'} 
                        onClickfunction={function(){prevPage(actualData)}}
                    />
                    <StyledButton 
                        available={
                            actualData?.data?.next !== null 
                                && loading === false ? false : true
                            } 
                        buttonTitle={'Next...'} 
                        onClickfunction={function(){nextPage(actualData)}}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};