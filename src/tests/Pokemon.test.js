import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../util/renderWithRouter';
import pokemons from '../data';

describe('Test pokemon card', () => {
  it('Test card infos', () => {
    renderWithRouter(<App />);
    const pikaxu = pokemons[0];
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(pikaxu.name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(pikaxu.type);

    const averageWeightPikaxu = (
      `Average weight: ${
        pikaxu.averageWeight.value} ${pikaxu.averageWeight.measurementUnit}`
    );
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent(averageWeightPikaxu);

    const imagePokemon = screen.getByRole('img', {
      alt: `${pikaxu.name} sprite`,
      src: pikaxu.image,
    });
    expect(imagePokemon).toBeInTheDocument();
  });

  it('Should have a details link', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    expect(detailsLink).toBeInTheDocument();

    const pikaxu = pokemons[0];

    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pikaxu.id}`);
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
  });
});
