import React from 'react';
// import logo from './logo.svg';
import 'fontsource-roboto'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import PokemonTable from './components/PokemonTable'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/'>
            <PokemonTable />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
