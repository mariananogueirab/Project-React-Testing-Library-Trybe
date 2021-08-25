import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../util/renderWithRouter';
import pokemons from '../data';

describe('Test Pokedex', () => {
  it('Test heading h2', () => {
    renderWithRouter(<App />);
    const pokedexTitle = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pokedexTitle).toBeInTheDocument();
  });

  const POKEMON_NAME = 'pokemon-name';
  it('Test next Pokemon', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();
    const pokemonName = screen.getByTestId(POKEMON_NAME);

    pokemons.forEach((pokemon, index) => {
      if (index === pokemons.length - 1) {
        expect(pokemonName.textContent).toBe(pokemon.name);
        userEvent.click(nextButton);
        expect(pokemonName.textContent).toBe(pokemons[0].name);
      } else {
        expect(pokemonName.textContent).toBe(pokemon.name);
        userEvent.click(nextButton);
      }
    });
  });

  it('Test if only one Pokemon apears', () => {
    renderWithRouter(<App />);
    const namesPokemons = screen.queryAllByTestId(POKEMON_NAME);
    expect(namesPokemons).toHaveLength(1);
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

      const pokemonsWithSameType = pokemons
        .filter((pokemon) => pokemon.type === type);

      userEvent.click(typeButton);

      const nextButton = screen.getByRole('button', {
        name: /Próximo pokémon/i,
      });
      const pokemonName = screen.getByTestId(POKEMON_NAME);

      pokemonsWithSameType.forEach((pokemon, index) => {
        if (index === pokemons.length - 1) {
          expect(pokemonName.textContent).toBe(pokemon.name);
          userEvent.click(nextButton);
          expect(pokemonName.textContent).toBe(pokemons[0].name);
        } if (pokemonsWithSameType.length === 1) {
          expect(pokemonName.textContent).toBe(pokemon.name);
        } else {
          expect(pokemonName.textContent).toBe(pokemon.name);
          userEvent.click(nextButton);
        }
      });

      const buttonAll = screen.getByRole('button', {
        name: 'All',
      });
      expect(buttonAll).toBeInTheDocument();
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
