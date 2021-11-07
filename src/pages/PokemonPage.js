import axios from 'axios'
import { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import Loader from '../components/Loader'

const getPokemonData = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const details = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const species = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            const evolution = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}`)
            resolve({
                details,
                species,
                evolution,
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
    const [evolutionData, setEvoloutionData] = useState()
    const [weaknessData, setWeaknessData] = useState()
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
            setEvoloutionData(res.evolution.data)
            setLoading(false)
        })
    }, [id])

    const heightConversion = () => {
        let a = (pokemonDetails.height * 10) / 30.48
        return (
            <p className='species-data' style={{ fontSize: '14px', marginLeft: '5px' }}>
                ({a.toFixed(2) + 'ft'})
            </p>
        )
    }

    const weightConversion = () => {
        let b = (pokemonDetails.weight / 10) * 2.2
        return (
            <p className='species-data' style={{ fontSize: '14px', marginLeft: '5px' }}>
                ({b.toFixed(0) + 'lbs'})
            </p>
        )
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Row>
                        <div
                            className={`pokemon-page-header background-${pokemonDetails.types[0].type.name}`}
                            style={{
                                backgroundImage: `url("/img/svg/${pokemonDetails.types[0].type.name}-bg.svg")`,
                                backgroundSize: '100px',
                            }}>
                            <div className='pokemon-page-header__details'>
                                <img
                                    className='pokemon-page-header__image pokemon-image'
                                    src={
                                        pokemonDetails.sprites.other['official-artwork']
                                            .front_default
                                    }
                                    alt={pokemonDetails.name}
                                />
                                <div className='type-name-container'>
                                    <h3 className='pokemon-page-header__id pokemon-id'>
                                        #{pokemonDetails.id}
                                    </h3>
                                    <h1 className='pokemon-page-header__name pokemon-name'>
                                        {pokemonDetails.name.charAt(0).toUpperCase() +
                                            pokemonDetails.name.slice(1)}
                                    </h1>
                                    <div className='type-container'>
                                        {pokemonDetails.types.map((t) => (
                                            <div
                                                key={t.type.name}
                                                className={`homepage-pokemon-card__type ${t.type.name}`}>
                                                <img
                                                    alt={`${t.type.name} type icon`}
                                                    src={`/img/svg/${t.type.name}.svg`}
                                                    className='type-icon'
                                                />
                                                <p>
                                                    {t.type.name.charAt(0).toUpperCase() +
                                                        t.type.name.slice(1)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='pokemon-page-tab__container'>
                            <div className='pokemon-page-tab' onClick={() => toggleTab(1)}>
                                <h1>About</h1>
                                <div id='about' className='about-tab-marker'></div>
                            </div>

                            <div className='pokemon-page-tab' onClick={() => toggleTab(2)}>
                                <h1>Stats</h1>
                                <div id='stats' className='stats-tab-marker hidden'></div>
                            </div>

                            <div className='pokemon-page-tab' onClick={() => toggleTab(3)}>
                                <h1>Evolution</h1>
                                <div id='evo' className='evo-tab-marker hidden'></div>
                            </div>
                        </div>
                    </Row>

                    <Row>
                        <div id='tab-1' className='tab-content current-tab'>
                            <p className='tab-content-text'>
                                {speciesData.flavor_text_entries['15'].flavor_text}
                            </p>
                            <h2 className={`${pokemonDetails.types[0].type.name}-text`}>
                                Pokédex Data
                            </h2>
                            <div className='pokedex-data-container'>
                                <div>
                                    <h3 className='species-data-title'>Genus:</h3>
                                </div>
                                <div>
                                    <p className='species-data'>{speciesData.genera['7'].genus}</p>
                                </div>
                            </div>

                            <div className='pokedex-data-container'>
                                <div>
                                    <h3 className='species-data-title'>Height:</h3>
                                </div>
                                <div>
                                    <p className='species-data'>
                                        {pokemonDetails.height * 10 + 'cm'}
                                    </p>
                                </div>
                                <div>{heightConversion()}</div>
                            </div>

                            <div className='pokedex-data-container'>
                                <div>
                                    <h3 className='species-data-title'>Weight:</h3>
                                </div>
                                <div>
                                    <p className='species-data'>
                                        {pokemonDetails.weight / 10 + 'kg'}
                                    </p>
                                </div>
                                <div>{weightConversion()}</div>
                            </div>

                            <div className='pokedex-data-container'>
                                <div>
                                    <h3 className='species-data-title'>Abilities:</h3>
                                </div>
                                <div>
                                    {pokemonDetails.abilities.map((a) => (
                                        <div>
                                            <p className='species-data'>
                                                {a.ability.name.charAt(0).toUpperCase() +
                                                    a.ability.name.slice(1)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div id='tab-2' className='tab-content tab' onClick={() => toggleTab(1)}>
                            {pokemonDetails.stats.map((s) => (
                                <div className='stats-container' key={s.stat.name}>
                                    <p className='stats-stat-name'>{s.stat.name.toUpperCase()}</p>
                                    <div className='stats-stat-max'>
                                        <div
                                            className='stats-stat-level'
                                            style={{ width: s.base_stat }}>
                                            {s.base_stat}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div id='tab-3' className='tab-content tab'>
                            <p>EVOLUTIONNNNNS</p>
                        </div>
                    </Row>
                </>
            )}
        </>
    )
}

export default PokemonPage
