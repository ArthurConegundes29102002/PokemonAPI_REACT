import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Pokemon {
  name: string;
  image: string;
}

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPokemons = async (limit: number) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
      const data = response.data.results;

      const pokemonData: Pokemon[] = await Promise.all(
        data.map(async (pokemon: any) => {
          const result = await axios.get(pokemon.url);
          const { name, sprites } = result.data;
          return { name, image: sprites.front_default };
        })
      );

      setPokemons(pokemonData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching Pokémons:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchPokemons(20);
  }, []);

  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    const { scrollTop, clientHeight, scrollHeight } = target;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      setIsLoading(true);
      fetchPokemons(pokemons.length + 20);
    }
  };

  useEffect(() => {
    const pokemonListElement = document.getElementById('pokemon-list');
    if (pokemonListElement) {
      pokemonListElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (pokemonListElement) {
        pokemonListElement.removeEventListener('scroll', handleScroll);
      }
    };
  });

  return (
    <div className="pokemon-list" id="pokemon-list">
      <div className="pokemon-grid">
        {pokemons.map((pokemon) => (
          <div key={pokemon.name} className="pokemon">
            <img src={pokemon.image} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default PokemonList;
