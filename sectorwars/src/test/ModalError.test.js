import { render } from '@testing-library/react';
import { ModalError }  from '../components/ModalError';


describe('test ModalError components', ()=> {
    const component = render(<ModalError/>);

    test('render ModalError component', ()=> {
        expect(component);
    });
}); 