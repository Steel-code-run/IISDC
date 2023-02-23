import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PageGrants from './PageGrants';

describe('<PageGrants />', () => {
  test('it should mount', () => {
    render(<PageGrants />);
    
    const pageGrants = screen.getByTestId('PageGrants');

    expect(pageGrants).toBeInTheDocument();
  });
});