import { BrowserRouter as Router , Route } from "react-router-dom"
import { Container } from 'react-bootstrap'
import Homepage from "./pages/Homepage";
import './App.css'

const App = () => {
  return (
      <Router>
        <Container>
        <Route exact path='/' component={Homepage}/>

        </Container>
      </Router>
  );
}

export default App;
