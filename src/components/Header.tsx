import React, { FunctionComponent } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

import { ReactComponent as PokedexSVG } from '../pokedex.svg'

const useHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

interface HeaderProps {
  title: string
}

const Header: FunctionComponent<HeaderProps> = ({ title }) => {
  const classes = useHeaderStyles()
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton disabled>
          <SvgIcon style={{ height: '100%', width: 50 }} titleAccess="#pokedex">
            <PokedexSVG />
          </SvgIcon>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
