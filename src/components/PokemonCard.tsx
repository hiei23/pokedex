import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';

import CardMedia from '@material-ui/core/CardMedia';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { PokemonStat, PokemonAbility, PokemonType } from '../types'
import PokemonStatsChart, { CHART_MIN_VALUE } from './PokemonStatsChart'
import PokemonDetails, { PokemonDetailsProps } from './PokemonDetails'

interface PokemonCardProps extends Omit<PokemonDetailsProps, 'abilities' | 'types'> {
  imageURL: string
  stats: PokemonStat[]
  abilities: PokemonAbility[]
  types: PokemonType[]
}

const useStyles = makeStyles({
  root: {
    maxHeight: 320,
    display: 'flex',
  },
  media: {
    height: 320,
    width: 320,
  },
  graph: {
    maxHeight: 350,
    display: 'flex',
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
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


const PokemonCard: FunctionComponent<PokemonCardProps> = ({
  id,
  name,
  abilities,
  imageURL,
  stats,
  weight,
  types
}) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  }
  const pokemonAttributes = ['hp', 'attack', 'defense', 'speed', 'special-defense', 'special-attack']
  const mappedAbilities = abilities.map(ability => ability.ability.name)
  const mappedTypes = types.map(type => type.type.name)
  const chartTitle = `${name} stats`
  const chartLabels = pokemonAttributes.map(attirbute => attirbute.split('-'))
  const chartValues = pokemonAttributes.map(label => {
    const pokemonStat = stats.find(stat => stat.stat.name === label)
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
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={imageURL}
            title={name}
          />
          <PokemonDetails
            id={id}
            name={name}
            weight={weight}
            abilities={mappedAbilities}
            types={mappedTypes}
          />
        </Card>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Card className={classes.graph}>
          <PokemonStatsChart
            title={chartTitle}
            labels={chartLabels}
            values={chartValues}
          />
        </Card>
      </TabPanel>
    </>
  )
}

export default PokemonCard
