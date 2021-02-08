import { useState, useEffect } from 'react'
import axios from 'axios'
import { PaginatedPokemonList } from '../types'

interface UsePokemonsProps {
  offset: number
  limit: number
}

interface UsePokemonsValues {
  paginatedList: PaginatedPokemonList
  loading: boolean
  isError: boolean
}

function usePokemons({ offset, limit }: UsePokemonsProps): UsePokemonsValues {
  const [loading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [paginatedList, setPaginatedList] = useState<PaginatedPokemonList>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })

  function getPokemonID(url: string) {
    // URL 'https://pokeapi.co/api/v2/pokemon/{id}/'
    const regex = /.+\/pokemon\/\d+\/$/
    if (url.match(regex)) {
      const tokens = url.split('/')
      const pokemonIdIndex = 6
      return tokens[pokemonIdIndex]
    }
    return null
  }

  useEffect(() => {
    async function getPaginatedPokemonList() {
      try {
        setLoading(true)
        const { data } = await axios.get<PaginatedPokemonList>(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        )
        setLoading(false)

        setPaginatedList({
          count: data.count,
          next: data.next,
          previous: data.previous,
          results: data.results.map((item) => ({
            id: getPokemonID(item.url),
            name: item.name,
            url: item.url,
          })),
        })
      } catch (e) {
        setError(true)
      }
    }
    getPaginatedPokemonList()
  }, [offset, limit])

  return { paginatedList, loading, isError }
}

export default usePokemons
