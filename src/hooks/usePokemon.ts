import { useState, useEffect } from 'react'
import axios from 'axios'
import { PokemonInfo } from '../types'

interface UsePokemonValues {
  pokemon: PokemonInfo | null
  loading: boolean
  isError: boolean
}

function usePokemons(url: string): UsePokemonValues {
  const [loading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [pokemon, setPokemon] = useState<PokemonInfo | null>(null)

  useEffect(() => {
    async function getPokemons() {
      try {
        setLoading(true)
        const results = await axios.get<PokemonInfo>(url)
        setLoading(false)
        setPokemon(results.data)
      } catch (e) {
        setError(true)
      }
    }

    getPokemons()
  }, [])

  return { pokemon, loading, isError }
}

export default usePokemons
