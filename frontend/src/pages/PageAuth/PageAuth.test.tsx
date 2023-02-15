import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PageAuth from './PageAuth';

describe('<PageAuth />', () => {
  test('it should mount', () => {
    render(<PageAuth />);
    
    const pageAuth = screen.getByTestId('PageAuth');

    expect(pageAuth).toBeInTheDocument();
  });
});