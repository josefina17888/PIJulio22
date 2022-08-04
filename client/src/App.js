import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from './components/Landing';
import Home from './components/Home';
import CreatePokemon from './components/CreatePokemon';
import PokemonDets from './components/PokemonDets';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component= {Landing} />
        <Route path= '/home' component= {Home} />
        <Route exact path= '/pokemons' component= {CreatePokemon} />
        <Route exact path= '/pokemons/:id' component={PokemonDets}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
