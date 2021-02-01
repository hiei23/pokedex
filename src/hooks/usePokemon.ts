import { useState, useEffect } from 'react'
import axios from 'axios'
import { PokemonInfo } from '../types'

function usePokemons(url: string): { pokemon: PokemonInfo | null } {
  const [pokemon, setPokemon] = useState<PokemonInfo | null>(null)

  useEffect(() => {
    async function getPokemons() {
      try {
        const results = await axios.get<PokemonInfo>(url)
        setPokemon(results.data)
      } catch (e) {
        throw new Error(e)
      }
    }

    getPokemons()
  }, [])

  return { pokemon }
}

export default usePokemons
