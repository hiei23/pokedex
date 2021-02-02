import { useState, useEffect } from 'react'
import axios from 'axios'
import { PaginatedPokemonList } from '../types'

interface UsePokemonsProps {
  offset: number
  limit: number
}

interface UsePokemonsValues {
  paginatedList: PaginatedPokemonList
}

function usePokemons({ offset, limit }: UsePokemonsProps): UsePokemonsValues {
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
        const { data } = await axios.get<PaginatedPokemonList>(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        )

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
        throw new Error(e)
      }
    }
    getPaginatedPokemonList()
  }, [offset, limit])

  return { paginatedList }
}

export default usePokemons
