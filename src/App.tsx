import { useEffect, useState } from "react";
import axios from 'axios';
import PokeList from "./components/PokeList";
import SearchPoke from "./components/SearchPoke";

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();

  const getPokeNames = () => {
    axios.get(currentPage).then(res => {
      setNextPage(res.data.next);
      setPrevPage(res.data.previous);
      getPokemonDetails(res.data.results);
    });
  };

  const getPokemonDetails = async (results) => {
    const pokemonDetails = [];

    for (const item of results) {
      const response = await axios.get(item.url);
      pokemonDetails.push(response.data);
    }

    setPokemon(pokemonDetails);
  };

  const GoNextPage = () => {
    setCurrentPage(nextPage)
  }

  const GoPrevPage = () => {
    setCurrentPage(prevPage)
  }

  useEffect(() => {
    getPokeNames();
  }, [currentPage]);

  return (
    <>
      <div className='w-screen min-h-screen bg-gradient-to-r from-indigo-100 via-red-100 to-yellow-100'>
        <SearchPoke GoNextPage={GoNextPage} GoPrevPage={GoPrevPage}/>
        <PokeList pokemon={pokemon} />
      </div>
    </>
  );
};

export default App;
