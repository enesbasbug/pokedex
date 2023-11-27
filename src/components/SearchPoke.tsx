import React, { useState } from 'react'
import axios from 'axios'

interface SearchPokeProps {
    GoNextPage: () => void
    GoPrevPage: () => void
}

const SearchPoke: React.FC<SearchPokeProps> = ({ GoNextPage, GoPrevPage }) => {
    const [searchPoke, setSearchPoke] = useState("")
    const [selectedPoke, setSelectedPoke] = useState(false)
    const [pokemon, setPokemon] = useState({
        name: "",
        img: "",
        species: "",
        hp: "",
        attack: "",
        defence: "",
       
    })

    const searchPokemon = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${searchPoke}`).then((response) => {
            setPokemon({
                name: searchPoke,
                img: response.data.sprites.front_default,
                species: response.data.species.name,
                hp: response.data.stats[0].base_stat,
                attack: response.data.stats[1].base_stat,
                defence: response.data.stats[2].base_stat,
            })
            setSelectedPoke(true)
            setSearchPoke("")
            
        })
    }

    const handleNextPage = () => {
        GoNextPage();
        setSelectedPoke(false);
    }
    
    const handlePrevPage = () => {
        GoPrevPage();
        setSelectedPoke(false);
    }

    
  return (
    <div className='flex flex-col justify-center items-center'>
        <div className='w-screen min-w-screen bg-gradient-to-r from-indigo-100 via-red-100 to-yellow-100 p-14 flex justify-center space-x-10'>
            <div className='flex space-x-5'>
                <input 
                    type="text" 
                    className='p-5' 
                    value={searchPoke}
                    onChange={(event) => {setSearchPoke(event.target.value.toLowerCase())}}    
                    
                />
                <button className='p-3 rounded-lg bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-red-200 via-red-300 to-yellow-200 text-gray-600 font-extrabold' onClick={searchPokemon}  >Search</button>
            </div>
            <div className='flex space-x-3'>
                <button className='p-3 rounded-lg bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-red-200 via-red-300 to-yellow-200 text-gray-600 font-extrabold'
                onClick={handleNextPage}>Next Page</button>
                <button className='p-3 rounded-lg bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-red-200 via-red-300 to-yellow-200 text-gray-600 font-extrabold'
                onClick={handlePrevPage}>Previous Page</button>
            </div>
        </div>
        <div className='w-1/3'>
            {!selectedPoke ? null : (
            <div className='bg-white flex flex-col justify-center items-center p-10 m-5 capitalize rounded-full '>
                <p className='font-bold'>Name: {pokemon.name}</p>
                <img src={pokemon.img} alt={pokemon.name} />
                <p className='font-semibold italic'>Species: {pokemon.species}</p>
                <p className='text-green-600'>HP: {pokemon.hp}</p>
                <p className='text-red-600'>Attack: {pokemon.attack}</p>
                <p className='text-blue-600'>Defence: {pokemon.defence}</p>
            </div>
        )}
        </div>
    </div>
  )
}

export default SearchPoke