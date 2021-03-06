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
  types: string[]
}

interface LabelProps {
  labelName: string
  text: string
}

interface TitleProps {
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

const Title: FunctionComponent<TitleProps> = ({ text }) => (
  <Grid item xs={12}>
    <Box textAlign="center" fontWeight="fontWeightBold" m={1}>
      {text}
    </Box>
  </Grid>
)

const Label: FunctionComponent<LabelProps> = ({ labelName, text }) => (
  <>
    <Grid item xs={1}>
      <Box textAlign="left" fontWeight="fontWeightBold" m={1}>
        {labelName}
      </Box>
    </Grid>
    <Grid item xs={11}>
      <Box textAlign="right" fontWeight="fontWeightRegular" m={1} style={{ textTransform: 'capitalize' }}>
        {` ${text}`}
      </Box>
    </Grid>
  </>

)

const PokemonDetails: FunctionComponent<PokemonDetailsProps> = ({
  id,
  name,
  abilities,
  weight,
  types
}) => {
  const classes = usePokemonDetailsStyles()
  return (
    <div className={classes.details}>
      <CardContent className={classes.content}>
        <Grid container>
          <Title text="Summary" />
          <Label labelName="ID:" text={`${id}`} />
          <Label labelName="Name:" text={name} />
          <Label labelName="Abilities:" text={abilities.join(' / ')} />
          <Label labelName="Weight:" text={`${weight} kg`} />
          <Label labelName="Types:" text={types.join(' / ')} />
        </Grid>
      </CardContent>
    </div>
  )
}

export default PokemonDetails
