import { useState, useEffect } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Loader from '../components/Loader'
import Pokemon from '../components/Pokemon'
import axios from 'axios'

const AllPokemon = () => {
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getPokemonList = async () => {
            let pokemonArray = []
            const maxPokemon = 151
            for (let i = 1; i <= maxPokemon; i++) {
                pokemonArray.push(await getPokemonData(i))
            }
            setPokemon(pokemonArray)
            setLoading(false)
        }

        const getPokemonData = async (id) => {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            return res
        }
        getPokemonList()
    }, [])

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Container style={{ marginTop: '40px' }}>
                    <Link
                        to={`/`}
                        style={{
                            position: 'absolute',
                            top: '15px',
                            left: '15px',
                            cursor: 'pointer',
                            color: 'black',
                        }}>
                        <i className='fa-solid fa-arrow-left'></i>
                    </Link>
                    <Row>
                        {pokemon.map((p) => (
                            <Col xs='12' sm='12' md='6' lg='4' xl='4' key={p.data.name}>
                                {' '}
                                <Pokemon pokemon={p.data} />{' '}
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}
        </>
    )
}

export default AllPokemon
