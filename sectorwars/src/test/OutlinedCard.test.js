import { render } from '@testing-library/react';
import OutlinedCard from '../components/OutlinedCard';


describe('test OutlinedCard components', ()=> {
    const component = render(<OutlinedCard/>);

    test('render OutlinedCard component', ()=> {
        expect(component);
    });
}); 