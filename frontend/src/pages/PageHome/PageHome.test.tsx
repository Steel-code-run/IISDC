import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PageHome from './PageHome';

describe('<PageHome />', () => {
  test('it should mount', () => {
    render(<PageHome />);
    
    const pageHome = screen.getByTestId('PageHome');

    expect(pageHome).toBeInTheDocument();
  });
});