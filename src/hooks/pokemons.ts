import { useState, useEffect } from 'react'
import axios from 'axios'
import { PokemonInfo } from '../types'

function usePokemons() {
  const [pokemons, setPokemons] = useState<PokemonInfo[]>([])

  useEffect(() => {
    async function getPokemons() {
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
