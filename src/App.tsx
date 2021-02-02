import React from 'react';
// import logo from './logo.svg';
import 'fontsource-roboto'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

import Grid from '@material-ui/core/Grid';
import PokemonTable from './components/PokemonTable'
import { ReactComponent as PokedexSVG } from './pokedex.svg'

const useStyles = makeStyles((theme: Theme) =>
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

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton>
            <SvgIcon style={{ height: '100%', width: 50 }} titleAccess="#pokedex">
              <PokedexSVG />
            </SvgIcon>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            PokeTable
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <Switch>
          <Route path='/'>
            <Grid container style={{ paddingTop: 60 }}>
              <Grid container xs={12} >
                <Grid xs={1} lg={3} />
                <Grid item xs={10} lg={6}>
                  <PokemonTable />
                </Grid>
                <Grid xs={1} lg={3} />
              </Grid>
              <Grid item xs={12}>
                Footer
              </Grid>
            </Grid>
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;
