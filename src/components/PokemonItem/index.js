import { useState, useEffect } from 'react';
import './index.css';

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
};

const PokemonItem = ({ details }) => {
  const { name, url } = details;

  const [pokemonItem, setPokemonItem] = useState({
    status: apiStatus.initial,
    data: null,
    errorMsg: null,
  });

  // Debugging log to ensure url is valid
  useEffect(() => {
    if (!url) {
      console.error("No URL provided for fetching Pokémon details.");
      setPokemonItem({ status: apiStatus.failure, data: null, errorMsg: "No URL provided" });
      return; // Stop if there's no URL
    }

    const fetchPokemonDetails = async () => {
      console.log(`Fetching Pokémon details from: ${url}`); // Log to confirm the URL

      try {
        setPokemonItem({ status: apiStatus.inProgress, data: null, errorMsg: null });
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          console.log("Fetched data:", data); // Log fetched data for debugging
          setPokemonItem({ status: apiStatus.success, data, errorMsg: null });
        } else {
          console.error("Failed to fetch data:", response.statusText); // Log failure status
          setPokemonItem({ status: apiStatus.failure, data: null, errorMsg: response.statusText });
        }
      } catch (error) {
        console.error("Error occurred during fetch:", error.message); // Log error
        setPokemonItem({ status: apiStatus.failure, data: null, errorMsg: error.message });
      }
    };

    fetchPokemonDetails();
  }, [url]); // Re-run if `url` changes

  const renderContent = () => {
    switch (pokemonItem.status) {
      case apiStatus.inProgress:
        return <p className="loading">Loading...</p>;

      case apiStatus.failure:
        return <p className="loading">Failed to load Pokémon details. {pokemonItem.errorMsg}</p>;

      case apiStatus.success: {
        const { id, sprites, types } = pokemonItem.data;

        return (
          <div className="pokemon-card">
            <div className="pokemon-image">
              {sprites?.front_default && (
                <img src={sprites.front_default} alt={name} />
              )}
            </div>
            <div className="pokemon-details">
              <p className="pokemon-name">{name} (ID: {id})</p>
              <div className="pokemon-types">
                {types.map((type) => (
                  <p key={type.type.name}>{type.type.name}</p>
                ))}
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return <li>{renderContent()}</li>;
};

export default PokemonItem;
