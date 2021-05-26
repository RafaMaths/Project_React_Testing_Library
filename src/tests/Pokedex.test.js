import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

import App from '../App';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um h2 com o texto Encountered pokémons.', async () => {
    renderWithRouter(<App />);

    const headingH2 = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(headingH2).toBeInTheDocument();
  });

  test('Testa se o botão tem o texto "Próximo pokémon"', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(buttonNext).toBeInTheDocument();
  });

  test('Testa próximos Pokémons mostrados, ao clicar sucessivamente no botão', () => {
    renderWithRouter(<App />);
    // (método o qual fiz com ForEach)
    // pokemons.forEach(({ name }) => {
    //   const textDetails = screen.getAllByText('More details');
    //   expect(textDetails.length).toBe(1);

    //   const getName = screen.getByText(name);
    //   expect(getName).toBeInTheDocument();

    //   const getButton = screen.getByText('Próximo pokémon');
    //   userEvent.click(getButton);
    // });
    // const getFirstPokemon = screen.getByText(pokemons[0].name);
    // expect(getFirstPokemon).toBeInTheDocument();

    // método abaixo sugerido pelo instrutor Eduardo Santos
    const firstCard = screen.getByRole('img', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(firstCard).toBeInTheDocument();

    const getButton = screen.getByText('Próximo pokémon');
    userEvent.click(getButton);

    const lastCard = screen.getByRole('img', 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png');
    expect(lastCard).toBeInTheDocument();
  });

  test('Testa se monstra o primeiro Pokémon ao clicar, se estiver no último', () => {
    renderWithRouter(<App />);

    const lastCard = screen.getByRole('img', 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png');
    expect(lastCard).toBeInTheDocument();

    const getButton = screen.getByText('Próximo pokémon');
    userEvent.click(getButton);

    const firstCard = screen.getByRole('img', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(firstCard).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const textDetails = screen.getAllByText('More details');
    expect(textDetails.length).toBe(1);
  });

  test('Testa se o botão tipo apresenta somente pelos pokémons daquele tipo.', () => {
    renderWithRouter(<App />);

    const typeButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(typeButton);

    const charmander = screen.getByRole('img', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
    expect(charmander).toBeInTheDocument();
  });

  test('Testa se o botão tipo apresenta somente pelos pokémons daquele tipo.', () => {
    renderWithRouter(<App />);

    const typeButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(typeButton);

    const allButtons = screen.getAllByTestId('pokemon-type-button');
    pokemons.forEach((type, index) => {
      expect(type.textContent).toBe(pokemons.type[index]);
    });

    // teste
  });
});
