import React from 'react';
import {screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardPost from './CardPost';

describe('<CardPost />', () => {
  test('it should mount', () => {
    // render(<CardPost />);
    
    const cardPost = screen.getByTestId('CardPost');

    expect(cardPost).toBeInTheDocument();
  });
});