import { BrowserRouter as Router, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import PokemonPage from './pages/PokemonPage'
import AllPokemon from './pages/AllPokemon'
import './App.css'

const App = () => {
    return (
        <Router>
            <Route exact path='/' component={Homepage} />
            <Route path='/pokemon/:id' component={PokemonPage} />
            <Route path='/allpokemon' component={AllPokemon} />
        </Router>
    )
}

export default App
