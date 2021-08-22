import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Test if About Page have informations about Pokedex', () => {
  it('Test heading h2', () => {
    render(<About />);
    const aboutPokedexTitle = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(aboutPokedexTitle).toBeInTheDocument();
  });

  it('Test paragraphs', () => {
    render(<About />);
    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Test image', () => {
    render(<About />);
    const imagePokedex = screen.getByRole('img', {
      src: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    });
    expect(imagePokedex).toBeInTheDocument();
  });
});
