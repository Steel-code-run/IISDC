import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PageInternships from './PageInternships';

describe('<PageInternships />', () => {
  test('it should mount', () => {
    render(<PageInternships />);
    
    const pageInternships = screen.getByTestId('PageInternships');

    expect(pageInternships).toBeInTheDocument();
  });
});