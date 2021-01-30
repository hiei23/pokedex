import React from 'react'
import PokemonCard from './PokemonCard'
import usePokemons from '../hooks/usePokemons'

const PokemonList = () => {
  const { pokemons } = usePokemons()

  return (
    <>
      { pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          imageURL={pokemon.sprites.front_default}
          name={pokemon.name}
          abilities={pokemon.abilities}
          stats={pokemon.stats}
        />
      ))}
    </>

  )
}

export default PokemonList
