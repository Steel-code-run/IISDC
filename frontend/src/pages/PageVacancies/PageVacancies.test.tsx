import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PageVacancies from './PageVacancies';

describe('<PageVacancies />', () => {
  test('it should mount', () => {
    render(<PageVacancies />);
    
    const pageVacancies = screen.getByTestId('PageVacancies');

    expect(pageVacancies).toBeInTheDocument();
  });
});