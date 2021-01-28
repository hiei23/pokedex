import { useState, useEffect } from 'react'
import axios from 'axios'

interface PokemonAbility {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
}

interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

interface PokemonType {
  type: {
    name: string
    url: string
  }
}

interface PokemonInfo {
  abilities: PokemonAbility[]
  base_experience: number
  name: string
  id: number
  sprites: {
    front_default: string
  }
  stats: PokemonStat[]
  types: PokemonType[]
  weight: number
}

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
