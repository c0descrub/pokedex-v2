import {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Pokemon from '../components/Pokemon'
import Loader from '../components/Loader'

const Homepage = () => {
  
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)

  
  useEffect(()=> {
      const getPokemonList = async () => {
        let pokemonArray = []
        for(let i = 1; i <= 151; i++){
            pokemonArray.push(await getPokemonData(i))
        }
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
        {loading ? (<Loader/>) : (<Row>{pokemon.map(p =>(<Col xs={12} sm={12} md={6} lg={2} xl={2} key = {p.data.name}> <Pokemon pokemon = {p.data} /> </Col>))}</Row>)
        }
        </>
    )
}

export default Homepage
