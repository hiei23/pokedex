import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { PokemonAbility, PokemonStat } from '../types'
import PokemonStatsChart, { CHART_MIN_VALUE } from './PokemonStatsChart'

interface PokemonCardProps {
  id: number
  name: string
  abilities: PokemonAbility[]
  imageURL: string
  stats: PokemonStat[]
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
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
  stats
}) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  }
  const pokemonAttributes = ['hp', 'attack', 'defense', 'speed', 'special-defense', 'special-attack']
  const mappedAbilities = abilities.map(ability => ability.ability.name)
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
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={imageURL}
              title={name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {id}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {`Abilities: ${mappedAbilities.join(' / ')}`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Card className={classes.root}>
          <PokemonStatsChart title={chartTitle} labels={chartLabels} values={chartValues} />
        </Card>
      </TabPanel>
    </>
  )
}

export default PokemonCard
