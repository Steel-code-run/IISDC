import React from 'react';
import {screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PopupPost from './PopupPost';

describe('<PopupPost />', () => {
  test('it should mount', () => {
    // render(<PopupPost />);
    
    const popupPost = screen.getByTestId('PopupPost');

    expect(popupPost).toBeInTheDocument();
  });
});