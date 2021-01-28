import React, { FunctionComponent } from 'react'
import PokemonCard from './PokemonCard'
import usePokemons from '../hooks/pokemons'

const PokemonList = () => {
  const { pokemons } = usePokemons()

  return (
    pokemons.map(pokemon => {
      return (
        <PokemonCard
          id={pokemon.id}
          imageURL={pokemon.sprites.front_default}
          name={pokemon.name}
        />
      )
    })

  )
}

export default PokemonList
