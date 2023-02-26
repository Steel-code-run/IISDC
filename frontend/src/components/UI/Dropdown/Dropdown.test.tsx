import React from 'react';
import {screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dropdown from './Dropdown';

describe('<Dropdown />', () => {
  test('it should mount', () => {
    // render(<Dropdown />);
    
    const dropdown = screen.getByTestId('Dropdown');

    expect(dropdown).toBeInTheDocument();
  });
});