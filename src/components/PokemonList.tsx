import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PokemonCard from './PokemonCard'
import usePokemons from '../hooks/usePokemons'

const usePokemonListStyles = makeStyles({
  container: {
    paddingLeft: 10,
    paddingRight: 10
  },
});

const PokemonList = () => {
  const { pokemons } = usePokemons()
  const classes = usePokemonListStyles()
  return (
    <Paper className={classes.container}>
      { pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          imageURL={pokemon.sprites.front_default}
          name={pokemon.name}
          abilities={pokemon.abilities}
          stats={pokemon.stats}
          weight={pokemon.weight}
          types={pokemon.types}
        />
      ))}
    </Paper>

  )
}

export default PokemonList
