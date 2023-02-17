import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AuthForm from './AuthForm';

describe('<AuthForm />', () => {
  test('it should mount', () => {
    render(<AuthForm />);
    
    const authForm = screen.getByTestId('AuthForm');

    expect(authForm).toBeInTheDocument();
  });
});