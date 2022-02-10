import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import Pokemon from '../components/Pokemon'
import Loader from '../components/Loader'

const Homepage = () => {
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const [filteredArray, setFilteredArray] = useState([])

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

    const searchLogic = () => {
        const searchBar = document.getElementById('mainSearchBar')
        searchBar.addEventListener('keyup', function (e) {
            console.log(e.target.value)
            let filtered = pokemon.filter((p) => {
                if (p.data.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                    return p
                } else return ''
            })

            setFilteredArray(filtered)

            if (e.target.value === '') {
                setFilteredArray([])
            }
        })
    }

    console.log(filteredArray)

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Container style={{ marginTop: '300px' }}>
                    <h1 style={{ textAlign: 'center' }}>React Pokédex!</h1>
                    <div className='search-bar-wrapper'>
                        <input
                            type='text'
                            name='search bar'
                            id='mainSearchBar'
                            className='mainSearchBar'
                            placeholder='Search for a Pokémon...'
                            onChange={searchLogic}></input>
                        {filteredArray.length ? (
                            <div id='searchResults' className='searchResults'>
                                {filteredArray.map((p) => (
                                    <div key={p.data.name}>
                                        {' '}
                                        <Pokemon pokemon={p.data} />{' '}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </Container>
            )}
        </>
    )
}

export default Homepage
