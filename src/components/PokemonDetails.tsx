import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';

export interface PokemonDetailsProps {
  id: number
  name: string
  abilities: string[]
  weight: number
}

interface LabelProps {
  labelName: string
  text: string
}

const usePokemonDetailsStyles = makeStyles({
  content: {
    flex: '1 0 auto',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },

});

const Label: FunctionComponent<LabelProps> = ({ labelName, text }) => (
  <>
    <Grid item xs={3}>
      <Box textAlign="left" fontWeight="fontWeightBold" m={1}>
        {labelName}
      </Box>
    </Grid>
    <Grid item xs={9}>
      <Box textAlign="right" fontWeight="fontWeightRegular" m={1}>
        {` ${text}`}
      </Box>
    </Grid>
  </>

)

const PokemonDetails: FunctionComponent<PokemonDetailsProps> = ({
  id,
  name,
  abilities,
  weight
}) => {
  const classes = usePokemonDetailsStyles()
  return (
    <div className={classes.details}>
      <CardContent className={classes.content}>
        <Grid container>
          <Label labelName="ID:" text={`${id}`} />
          <Label labelName="Name:" text={name} />
          <Label labelName="Abilities:" text={abilities.join(' / ')} />
          <Label labelName="Weight:" text={`${weight}`} />
        </Grid>
      </CardContent>
    </div>
  )
}

export default PokemonDetails
