import React, { FunctionComponent } from 'react';
import 'fontsource-roboto'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Grid from '@material-ui/core/Grid';

import PokemonTable from './components/PokemonTable'
import Header from './components/Header'

const App: FunctionComponent = () => (
  <div className="App"
    style={{
      backgroundImage: 'linear-gradient(to top, #4481eb 0%, #04befe 100%)'
    }}>
    <Header title="PokeTable" />
    <Router>
      <Switch>
        <Route path='/'>
          <Grid container style={{
            paddingTop: 40,
            paddingBottom: 40,

          }}>
            <Grid container xs={12} >
              <Grid item xs={1} lg={3} />
              <Grid item xs={10} lg={6}>
                <PokemonTable />
              </Grid>
              <Grid item xs={1} lg={3} />
            </Grid>
          </Grid>
        </Route>
      </Switch>
    </Router>
  </div >
)

export default App;
