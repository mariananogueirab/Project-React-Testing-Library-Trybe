import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../util/renderWithRouter';
import pokemons from '../data';

describe('Test pokemon card', () => {
  const pikachu = pokemons[0];

  it('Test card infos', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(pikachu.name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(pikachu.type);

    const averageWeightPikachu = (
      `Average weight: ${
        pikachu.averageWeight.value} ${pikachu.averageWeight.measurementUnit}`
    );
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent(averageWeightPikachu);

    const imagePokemon = screen.getByRole('img', {
      alt: `${pikachu.name} sprite`,
      src: pikachu.image,
    });
    expect(imagePokemon).toBeInTheDocument();
  });

  it('Should have a details link', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
      href: `pokemons/${pikachu.id}`,
    });
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pikachu.id}`);
  });

  it('Should have a star icon in Favorite Pokemon', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(detailsLink);
    const pokemonFavoritado = screen.getByRole('checkbox');
    userEvent.click(pokemonFavoritado);

    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
