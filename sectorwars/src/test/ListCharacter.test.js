import { render } from '@testing-library/react';
import { ListCharacter } from '../components/ListCharacter';

describe('test ListCharacter components', ()=> {
    const component = render(<ListCharacter/>);

    test('render ListCharacter component', ()=> {
        expect(component);
    });
}); 