import React from 'react'
import PokemonCard from './PokemonCard'
import usePokemons from '../hooks/pokemons'

const PokemonList = () => {
  const { pokemons } = usePokemons()

  return (
    <>
      { pokemons.map((pokemon) => (
        <PokemonCard
          id={pokemon.id}
          imageURL={pokemon.sprites.front_default}
          name={pokemon.name}
          abilities={pokemon.abilities}
        />
      ))}
    </>

  )
}

export default PokemonList
