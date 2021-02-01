import React from 'react';
// import logo from './logo.svg';
import 'fontsource-roboto'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import PokemonTable from './components/PokemonTable'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/'>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                Header
              </Grid>
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
    </div>
  );
}

export default App;
