import React from 'react';
import {screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DropdownTags from './DropdownTags';

describe('<DropdownTags />', () => {
  test('it should mount', () => {
    // render(<DropdownTags />);
    
    const dropdownTags = screen.getByTestId('DropdownTags');

    expect(dropdownTags).toBeInTheDocument();
  });
});