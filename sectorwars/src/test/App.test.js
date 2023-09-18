import { render, screen, findRenderedDOMComponentWithTag } from '@testing-library/react';
import App from '../App';

test('render App component', () => {
  render(<App />);
  const component = render(<App/>);
  expect(component);
});
