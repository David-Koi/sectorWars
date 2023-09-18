import { findByTestId, fireEvent, render, screen } from '@testing-library/react';
import { MainScreen } from '../components/MainScreen';
import { StyledButton } from '../components/StyledButton';
import {video} from '../assets/video/intro.mp4' 

describe('test MainScreen component', () => {
    const component = render(<MainScreen/>);
    test('Render MainScreen', ()=>{
        render(<MainScreen />);
        expect(component);
    });

    test('MainScreen has a video', ()=>{
        const videoRender = render(video);
        expect(videoRender)
    });

    test('Render StyledButton', ()=>{
       const buttonRender =  render(<StyledButton />);
        expect(buttonRender);
    });
  
  
});
