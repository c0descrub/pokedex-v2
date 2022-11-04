import { useState, useEffect } from 'react'
import { PokemonArray } from '../components/PokemonArray'

const HomeRework = () => {
    const [searchResults, setSearchResults] = useState([])
    const [pokemonData, setPokemonData] = useState([])

    useEffect(() => {
        const gatherPokemonData = () => {
            searchResults.map(async (name) => {
                console.log(name)
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
                const data = await res.json()
                setPokemonData([...pokemonData, data])
            })
        }
        gatherPokemonData()
        console.log('search results array', searchResults)
        console.log('Pokemon data', pokemonData)
    }, [searchResults])

    const handleSearch = (e) => {
        const filtered = PokemonArray.filter((p) => {
            if (p.includes(e.target.value.toLowerCase())) {
                return p
            } else return ''
        })

        setSearchResults(filtered)

        if (e.target.value === '') {
            setSearchResults([])
        }
    }

    return (
        <>
            <h1>HOME PAGE REWORK</h1>
            <input onChange={handleSearch} type='text' placeholder='Search for a pokemon'></input>
            <div className='search_results'>
                <ul>
                    {/* {searchResults.map((result) => {
                        return (
                            <>
                                <li>{pokemonData.id}</li>
                                <li>{result}</li>

                                <li>
                                    <ul>
                                        {pokemonData.types.map((t) => {
                                            return <li>{t.type.name}</li>
                                        })}
                                    </ul>
                                </li>
                            </>
                        )
                    })} */}
                </ul>
            </div>
        </>
    )
}
export default HomeRework
