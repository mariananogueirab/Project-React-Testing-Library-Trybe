import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Test Not Found component', () => {
  it('Test heading h2', () => {
    render(<NotFound />);
    const notFoundTitle = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundTitle).toBeInTheDocument();
  });

  it('Test image', () => {
    render(<NotFound />);
    const imageNotFound = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(imageNotFound).toBeInTheDocument();
    expect(imageNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
