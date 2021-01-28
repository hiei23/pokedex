import { useState, useEffect } from 'react'
import axios from 'axios'
import { PokemonInfo } from '../types'
import { kantoStarterPokemons } from '../data/pokemonData'

function usePokemons() {
  const [pokemons, setPokemons] = useState<PokemonInfo[]>([])

  useEffect(() => {
    async function getPokemons() {
      const urls = kantoStarterPokemons.pokemonNames.map(
        (pokemonName) => `https://pokeapi.co/api/v2/pokemon/{pokemonName}`
      )
      const results = await Promise.all([
        axios.get<PokemonInfo>(`https://pokeapi.co/api/v2/pokemon/1`),
      ])
      setPokemons(results.map((result) => result.data))
    }
    getPokemons()
  }, [])

  return { pokemons }
}

export default usePokemons
