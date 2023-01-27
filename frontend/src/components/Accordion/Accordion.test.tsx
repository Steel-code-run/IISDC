import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Accordion from './Accordion';

describe('<Accordion />', () => {
  test('it should mount', () => {
    render(<Accordion />);
    
    const accordion = screen.getByTestId('Accordion');

    expect(accordion).toBeInTheDocument();
  });
});