import { useState, useEffect } from 'react';
import PokemonItem from '../PokemonItem';
import './index.css';

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
};

const Pokemon = () => {
  const [pokemon, setPokemon] = useState({
    status: apiStatus.initial,
    pokemonList: [],
    errorMsg: null,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      setPokemon({ status: apiStatus.inProgress, pokemonList: [], errorMsg: null });
      try {
        const url = 'https://pokeapi.co/api/v2/pokemon?limit=150';
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)

        if (response.ok) {
          console.log(data)
          setPokemon({ status: apiStatus.success, pokemonList: data.results, errorMsg: null });

          

          setTypes(['All', ...Array.from(pokemonList)]);
        } else {
          setPokemon({ status: apiStatus.failure, pokemonList: [], errorMsg: response.statusText });
        }
      } catch (error) {
        setPokemon({ status: apiStatus.failure, pokemonList: [], errorMsg: error.message });
      }
    };

    fetchPokemon();
  }, []);

  const { status, pokemonList, errorMsg } = pokemon;

  const filteredPokemonList = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      selectedType === 'All' || pokemon.types.some((t) => t.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  const renderContent = () => {
    switch (status) {
      case apiStatus.inProgress:
        return <p className="loading">Loading...</p>;
      case apiStatus.failure:
        return <p className="loading">Failed to load Pokémon details.</p>;
      case apiStatus.success:
        return (
          <div>
            <div className="filters">
              <input
                type="text"
                placeholder="Search Pokémon"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="type-filter"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <ul className="pokemon-list">
              {filteredPokemonList.map((item) => (
                <PokemonItem key={item.id} details={item} />
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default Pokemon;
