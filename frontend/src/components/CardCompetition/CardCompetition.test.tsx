import React from 'react';
import {screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardCompetition from './CardCompetition';

describe('<CardCompetition />', () => {
  test('it should mount', () => {
    // render(<CardCompetition />);
    
    const cardCompetition = screen.getByTestId('CardCompetition');

    expect(cardCompetition).toBeInTheDocument();
  });
});