import React, { useEffect } from "react";
import Button from '@mui/material/Button';

export const StyledButton = ({buttonTitle, onClickfunction, available}) => {

    useEffect(()=>{
        console.log(buttonTitle);
        buttonTitle = buttonTitle.toLowerCase();
    },[buttonTitle]);

    return(
        <Button 
            style={{
                width:'5%',
                border:'1px solid white',
                background:'transparent', 
                color:'white', position:'relative', 
                bottom:'20px', right:'10px'
            }}
            disabled={available}
            onClick={onClickfunction}
        >{buttonTitle}</Button>
    );
}