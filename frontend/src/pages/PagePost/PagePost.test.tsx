import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PagePost from './PagePost';

describe('<PagePost />', () => {
  test('it should mount', () => {
    render(<PagePost />);
    
    const pagePost = screen.getByTestId('PagePost');

    expect(pagePost).toBeInTheDocument();
  });
});