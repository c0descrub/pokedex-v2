import axios from 'axios'
import { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import { PokemonHeader } from '../components/PokemonHeader'
import { PokemonAbout } from '../components/PokemonAbout'
import { PokemonStats } from '../components/PokemonStats'
import { PokemonEvolutions } from '../components/PokemonEvolutions'

const getPokemonData = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const details = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const species = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)

            resolve({
                details,
                species,
                
            })
        } catch (e) {
            reject(e)
        }
    })
}

const PokemonPage = ({ match }) => {
    const id = match.params.id

    const [pokemonDetails, setPokemonDetails] = useState()
    const [speciesData, setSpeciesData] = useState()
    const [loading, setLoading] = useState(true)
    const [toggleState, setToggleState] = useState(1)

    const toggleTab = (index) => {
        const tab1 = document.getElementById('tab-1')
        const tab2 = document.getElementById('tab-2')
        const tab3 = document.getElementById('tab-3')
        const about = document.getElementById('about')
        const stats = document.getElementById('stats')
        const evo = document.getElementById('evo')

        if (index === 1) {
            tab1.classList.replace('tab', 'current-tab')
            tab2.classList.contains('current-tab')
            tab2.classList.replace('current-tab', 'tab')
            tab3.classList.contains('current-tab')
            tab3.classList.replace('current-tab', 'tab')
            about.classList.remove('hidden')
            stats.classList.add('hidden')
            evo.classList.add('hidden')
        } else if (index === 2) {
            tab2.classList.replace('tab', 'current-tab')
            tab1.classList.contains('current-tab')
            tab1.classList.replace('current-tab', 'tab')
            tab3.classList.contains('current-tab')
            tab3.classList.replace('current-tab', 'tab')
            stats.classList.remove('hidden')
            about.classList.add('hidden')
            evo.classList.add('hidden')
        } else if (index === 3) {
            tab3.classList.replace('tab', 'current-tab')
            tab1.classList.contains('current-tab')
            tab1.classList.replace('current-tab', 'tab')
            tab2.classList.contains('current-tab')
            tab2.classList.replace('current-tab', 'tab')
            evo.classList.remove('hidden')
            stats.classList.add('hidden')
            about.classList.add('hidden')
        }

        setToggleState(index)
    }

    useEffect(() => {
        setLoading(true)
        getPokemonData(id).then((res) => {
            setPokemonDetails(res.details.data)
            setSpeciesData(res.species.data)
            setLoading(false)
        })
    }, [id])

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Row>
                        <PokemonHeader pokemonDetails={pokemonDetails} toggleTab={toggleTab} />
                    </Row>

                    <Row>
                        <PokemonAbout pokemonDetails={pokemonDetails} speciesData={speciesData} />

                        <PokemonStats pokemonDetails={pokemonDetails} toggleTab={toggleTab} />

                        <PokemonEvolutions />
                    </Row>
                </>
            )}
        </>
    )
}

export default PokemonPage
