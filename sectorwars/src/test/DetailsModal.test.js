import { render } from '@testing-library/react';
import { DetailsModal }  from '../components/DetailsModal';


describe('test DetailsModal components', ()=> {
    const component = render(<DetailsModal/>);

    test('render DetailsModal component', ()=> {
        expect(component);
    });
}); 