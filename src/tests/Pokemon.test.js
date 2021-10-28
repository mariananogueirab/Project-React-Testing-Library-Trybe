import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../util/renderWithRouter';
import pokemons from '../data';

describe('Test pokemon card', () => {
  const pokemon = pokemons[0];
  it('Test card infos', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(pokemon.name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(pokemon.type);

    const averageWeightpokemon = (
      `Average weight: ${
        pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`
    );
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent(averageWeightpokemon);

    const imagePokemon = screen.getByRole('img', {
      alt: `${pokemon.name} sprite`,
      src: pokemon.image,
    });
    expect(imagePokemon).toBeInTheDocument();
    expect(imagePokemon).toHaveAttribute('src', pokemon.image);
    expect(imagePokemon).toHaveAttribute('alt', `${pokemon.name} sprite`);
  });

  it('Should have a details link', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
      href: `pokemons/${pokemon.id}`,
    });
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemon.id}`);
  });

  it('Should have a star icon in Favorite Pokemon', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(detailsLink);
    const pokemonFavoritado = screen.getByRole('checkbox');
    userEvent.click(pokemonFavoritado);

    const favoriteIcon = screen.getByAltText(`${pokemon.name} is marked as favorite`);
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon)
      .toHaveAttribute('alt', `${pokemon.name} is marked as favorite`);
  });
});
