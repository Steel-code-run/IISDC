import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PageCompetition from './PageCompetition';

describe('<PageCompetition />', () => {
  test('it should mount', () => {
    render(<PageCompetition />);
    
    const pageCompetition = screen.getByTestId('PageCompetition');

    expect(pageCompetition).toBeInTheDocument();
  });
});