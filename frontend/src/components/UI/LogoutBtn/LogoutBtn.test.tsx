import React from 'react';
import {screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LogoutBtn from './LogoutBtn';

describe('<LogoutBtn />', () => {
  test('it should mount', () => {
    // render(<LogoutBtn />);
    
    const logoutBtn = screen.getByTestId('LogoutBtn');

    expect(logoutBtn).toBeInTheDocument();
  });
});