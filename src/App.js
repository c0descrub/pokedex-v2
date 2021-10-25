import { BrowserRouter as Router , Route } from "react-router-dom"
import { Container } from 'react-bootstrap'
import Homepage from "./pages/Homepage";
import PokemonPage from "./pages/PokemonPage";
import './App.css'


const App = () => {
  return (
      <Router>
        <Container>
        <Route exact path='/' component={Homepage}/>
        <Route path = '/pokemon/:id' component = {PokemonPage}/>

        </Container>
      </Router>
  );
}

export default App;
