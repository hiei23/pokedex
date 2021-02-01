import { useState, useEffect } from 'react'
import axios from 'axios'
import { PokemonInfo } from '../types'

function usePokemons(url: string) {
  const [pokemon, setPokemon] = useState<PokemonInfo | null>(null)

  useEffect(() => {
    async function getPokemons() {
      const results = await axios.get<PokemonInfo>(url)
      setPokemon(results.data)
    }

    getPokemons()
  }, [])

  return { pokemon }
}

export default usePokemons
