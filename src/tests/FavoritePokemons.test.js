import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../util/renderWithRouter';
import App from '../App';

describe('Test Favorite Pokemons Page', () => {
  it('Test No Favorite Pokemon found', () => {
    render(<FavoritePokemons />);
    const notFountText = screen.getByText(/No favorite pokemon found/i);
    expect(notFountText).toBeInTheDocument();
  });

  it('Test Favorite Pokemons', async () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkMoreDetails).toBeInTheDocument();

    userEvent.click(linkMoreDetails);
    const testidPokemon = screen.getByTestId('pokemon-name');

    const pokemonFavoritado = screen.getByRole('checkbox');
    userEvent.click(pokemonFavoritado);

    const linkFavoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavoritePokemon);

    expect(testidPokemon.value).toBeInTheDocument();
  });
});
