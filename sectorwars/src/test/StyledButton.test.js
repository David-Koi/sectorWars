import { render } from '@testing-library/react';
import { StyledButton } from '../components/StyledButton';


describe('test StyledButton components', ()=> {
    const component = render(<StyledButton/>);

    test('render StyledButton component', ()=> {
        expect(component);
    });
}); 