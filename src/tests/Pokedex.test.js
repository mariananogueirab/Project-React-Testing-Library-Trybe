import React from 'react';
import { screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import App from '../App';
import renderWithRouter from '../util/renderWithRouter';

describe('Test Pokedex', () => {
  it('Test heading h2', () => {
    renderWithRouter(<App />);
    const pokedexTitle = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pokedexTitle).toBeInTheDocument();
  });

  it('Test next Pokemon', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();
  });

  it('Test filter buttons', () => {
    renderWithRouter(<App />);

    const pokemonTypes = (
      ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon']
    );
    pokemonTypes.forEach((type) => {
      const typeButton = screen.getByRole('button', {
        name: type,
      });
      expect(typeButton).toBeInTheDocument();
    });
  });

  it('Test button All', () => {
    renderWithRouter(<App />);
    const allTypesButton = screen.getByRole('button', {
      name: 'All',
    });
    expect(allTypesButton).toBeInTheDocument();
  });
});
