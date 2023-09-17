import React from "react";
import Button from '@mui/material/Button';

/**
 * @param {{buttonTitle:string, onClickfunction:Function, available:boolean}}
 * @param  buttonTitle string with the button´s text or the icon to show.
 * @param  onClickfunction function of the button as callBack.
 * @param  available boolean that stablish if the button are available or not.
 * @returns button component from MUI material with the style of the page for all components.
 */
export const StyledButton = ({
    buttonTitle, 
    onClickfunction, 
    available
}) => {

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