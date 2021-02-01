import React, { FunctionComponent } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import CardMedia from '@material-ui/core/CardMedia';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import PokemonStatsChart, { CHART_MIN_VALUE } from './PokemonStatsChart'
import PokemonDetails from './PokemonDetails'
import usePokemon from '../hooks/usePokemon'

interface PokemonCardProps {
  url: string
}

const useStyles = makeStyles((theme) => (
  createStyles({
    root: {
      maxHeight: 320,
      display: 'flex',
      boxShadow: 'unset',
    },
    media: {
      height: 320,
      width: 320,
      [theme.breakpoints.down('xs')]: {
        height: 180,
      },
      [theme.breakpoints.down('sm')]: {
        height: 200,
      },
      [theme.breakpoints.down('sm')]: {
        height: 235,
      },
    },
    graph: {
      maxHeight: 350,
      display: 'flex',
    },
  })
));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: FunctionComponent<TabPanelProps> = ({ children, value, index, }) => (
  <Paper
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
  >
    {value === index && (
      <Box p={3}>
        {children}
      </Box>
    )}
  </Paper>
);


const PokemonCard: FunctionComponent<PokemonCardProps> = ({ url }) => {
  const classes = useStyles()
  const { pokemon } = usePokemon(url)
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  }

  if (!pokemon) return null

  const pokemonAttributes = ['hp', 'attack', 'defense', 'speed', 'special-defense', 'special-attack']
  const mappedAbilities = pokemon.abilities.map(ability => ability.ability.name)
  const mappedTypes = pokemon.types.map(type => type.type.name)
  const chartTitle = `${pokemon.name} stats`
  const chartLabels = pokemonAttributes.map(attirbute => attirbute.split('-'))
  const chartValues = pokemonAttributes.map(label => {
    const pokemonStat = pokemon.stats.find(stat => stat.stat.name === label)
    return pokemonStat?.base_stat ?? CHART_MIN_VALUE
  })

  return (
    <>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Pokemon"
            id="simple-tab-0"
            aria-controls='simple-tabpanel-0'
          />
          <Tab label="Stats"
            id="simple-tab-1"
            aria-controls='simple-tabpanel-1'
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container xs={12}>
          <Grid item xs={5}>
            <Card className={classes.root}>
              <CardMedia
                className={classes.media}
                image={pokemon.sprites.front_default}
                title={pokemon.name}
              />
            </Card>
          </Grid>
          <Grid item xs={7}>
            <PokemonDetails
              id={pokemon.id}
              name={pokemon.name}
              weight={pokemon.weight}
              abilities={mappedAbilities}
              types={mappedTypes}
            />
          </Grid>

        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>

        <PokemonStatsChart
          title={chartTitle}
          labels={chartLabels}
          values={chartValues}
        />

      </TabPanel>
    </>
  )
}

export default PokemonCard
