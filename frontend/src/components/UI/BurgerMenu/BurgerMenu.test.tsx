import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BurgerMenu from './BurgerMenu';

describe('<BurgerMenu />', () => {
  test('it should mount', () => {
    render(<BurgerMenu />);
    
    const burgerMenu = screen.getByTestId('BurgerMenu');

    expect(burgerMenu).toBeInTheDocument();
  });
});