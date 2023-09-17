import { findByTestId, fireEvent, render, screen } from '@testing-library/react';
import { MainScreen } from './MainScreen';
import { StyledButton } from './StyledButton';

describe('render MainScreen component', () => {
    const component = render(<MainScreen/>);
    test('Render MainScreen', ()=>{
        render(<MainScreen />);
        expect(component);
    });

    test('MainScreen has a video', ()=>{
        const video = component.container.querySelector('video');
        expect(video)
    });

    test('Render StyledButton', ()=>{
       const buttonRender =  render(<StyledButton />);
        expect(buttonRender);
    });
  
  
});
