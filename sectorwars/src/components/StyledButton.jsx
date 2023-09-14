import React from "react";
import Button from '@mui/material/Button';

export const StyledButton = ({buttonTitle, onClickfunction}) => {
    return(
        <Button 
            style={{
                width:'5%',
                border:'1px solid white',
                background:'transparent', 
                color:'white', position:'relative', 
                bottom:'20px', right:'10px'
            }}
            onClick={onClickfunction}
        >{buttonTitle.toLowerCase()}</Button>
    );
}