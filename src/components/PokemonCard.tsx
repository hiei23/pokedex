import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { PokemonAbility } from '../types'

interface PokemonCardProps {
  id: number
  name: string
  abilities: PokemonAbility[]
  imageURL: string
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});



const PokemonCard: FunctionComponent<PokemonCardProps> = ({
  id,
  name,
  abilities,
  imageURL
}) => {
  const classes = useStyles()
  const mappedAbilities = abilities.map(ability => ability.ability.name)
  return (
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
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {mappedAbilities.join(' / ')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default PokemonCard
