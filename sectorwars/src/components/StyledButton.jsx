import React, { useEffect } from "react";
import Button from '@mui/material/Button';

export const StyledButton = ({buttonTitle, onClickfunction, available}) => {

    return(
        <Button 
            style={{
                width:'5%',
                border:'1px solid #FFE81F',
                background:'transparent', 
                color:'#FFE81F', position:'relative', 
                bottom:'20px', right:'10px',
                opacity: available ? 0.2 : 1
            }}
            disabled={available}
            onClick={onClickfunction}
        >{buttonTitle}</Button>
    );
}