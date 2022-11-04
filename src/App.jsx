import { BrowserRouter as Router, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import PokemonPage from './pages/PokemonPage'
import AllPokemon from './pages/AllPokemon'
import './App.css'
import HomeRework from './pages/HomeRework'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Route exact path='/' component={HomeRework} />
                <Route path='/pokemon/:id' component={PokemonPage} />
                <Route path='/allpokemon' component={AllPokemon} />
            </Router>
        </QueryClientProvider>
    )
}

export default App
