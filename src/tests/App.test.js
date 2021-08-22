import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../util/renderWithRouter';

describe('Test the nav bar', () => {
  it('Test the Home link', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Test the About link', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Test the Favorite pokemons link', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
