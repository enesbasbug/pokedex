import React from 'react'
import axios from 'axios'

const PokeList = ({ pokemon }) => {


  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8 mx-10'>
      {pokemon.map(poke => (
        <div key={poke.name} className='bg-white flex flex-col justify-center items-center p-10 m-5 capitalize rounded-full'>
          <h1 className='font-bold text-2xl'>{poke.name}</h1>
          <img src={poke.sprites.front_shiny} alt="Pict" />

          <h2 className='font-bold'>Base Experience: 
          <span className='text-orange-500 '> {poke.base_experience}</span>
          </h2>

          <h2 className='font-bold'>Type: <span className=' text-red-500'> {poke.types[0].type.name}</span></h2>

          <div className='flex flex-col md:flex-row '> 
          <span className='font-bold'>Abilities: </span> 
            {
              poke.abilities.map((abil, index) => (
                <React.Fragment key={index}>
                  <h2 className=' text-green-500'>
                    {abil.ability.name}  
                  </h2>
                  {index < poke.abilities.length - 1 && <span className='text-bold'>,  </span>}
                </React.Fragment>
              ))
            }
          </div>

          <h3 className='font-semibold'>Weight: {poke.weight}</h3>
        </div>
      ))}
    </div>
  );
};


export default PokeList