import {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Pokemon from '../components/Pokemon'

const Homepage = () => {
  
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)

  
  useEffect(()=> {
      const getPokemonList = async () => {
        let pokemonArray = []
        for(let i = 1; i <= 898; i++){
            pokemonArray.push(await getPokemonData(i))
        }
        console.log(pokemonArray)
        setPokemon(pokemonArray)
        setLoading(false)
    
      }
  
      const getPokemonData = async (id) => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return res
        
      }; getPokemonList()
}, [])

    return (
        <>
        {loading ? (<h1>Loading...</h1>) : (<Row>{pokemon.map(p =>(<Col xs={12} sm={12} md={4} lg={4} xl={4} key = {p.data.name}> <Pokemon pokemon = {p.data} /> </Col>))}</Row>)
        }
        </>
    )
}

export default Homepage
