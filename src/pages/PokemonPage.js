import axios from 'axios'
import { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import { PokemonHeader } from '../components/PokemonHeader'

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

    const evTotal = () => {
        let total =
            pokemonDetails.stats['0'].effort +
            pokemonDetails.stats['1'].effort +
            pokemonDetails.stats['2'].effort +
            pokemonDetails.stats['3'].effort +
            pokemonDetails.stats['4'].effort +
            pokemonDetails.stats['5'].effort

        return total
    }

    const hpEV = () => {
        return pokemonDetails.stats['0'].effort
    }

    const attkEV = () => {
        return pokemonDetails.stats['1'].effort
    }

    const defEV = () => {
        return pokemonDetails.stats['2'].effort
    }

    const spAttkEV = () => {
        return pokemonDetails.stats['3'].effort
    }

    const spDefEV = () => {
        return pokemonDetails.stats['4'].effort
    }

    const speedEV = () => {
        return pokemonDetails.stats['5'].effort
    }

    const hp = () => {
        let hp = pokemonDetails.stats['0'].stat.name
        const hitpoints = hp.charAt(0).toUpperCase() + hp.slice(1)

        return hitpoints
    }

    const attack = () => {
        let attk = pokemonDetails.stats['1'].stat.name
        const attack = attk.charAt(0).toUpperCase() + attk.slice(1)

        return attack
    }

    const defence = () => {
        let def = pokemonDetails.stats['2'].stat.name
        const defence = def.charAt(0).toUpperCase() + def.slice(1)

        return defence
    }

    const shortenedAttack = () => {
        let specialAttack = pokemonDetails.stats['3'].stat.name
        const spAttack =
            specialAttack.charAt(0).toUpperCase() +
            specialAttack.charAt(1) +
            '.' +
            specialAttack.charAt(8).toUpperCase() +
            specialAttack.slice(9)

        return spAttack
    }

    const shortenedDefence = () => {
        let specialDefence = pokemonDetails.stats['4'].stat.name
        const spDefence =
            specialDefence.charAt(0).toUpperCase() +
            specialDefence.charAt(1) +
            '.' +
            specialDefence.charAt(8).toUpperCase() +
            specialDefence.slice(9)

        return spDefence
    }

    const speed = () => {
        let spd = pokemonDetails.stats['5'].stat.name
        const speed = spd.charAt(0).toUpperCase() + spd.slice(1)

        return speed
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                
                    <Row>

                    <PokemonHeader pokemonDetails={pokemonDetails} />


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
                                            {a.is_hidden === true ? (
                                                <p className='hidden-ability species-data'>
                                                    {a.ability.name.charAt(0).toUpperCase() +
                                                        a.ability.name.slice(1) +
                                                        ' (hidden ability)'}
                                                </p>
                                            ) : (
                                                <p className='species-data'>
                                                    {a.ability.name.charAt(0).toUpperCase() +
                                                        a.ability.name.slice(1)}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <h2 className={`${pokemonDetails.types[0].type.name}-text`}>
                                Training
                            </h2>
                            <h3 className='species-data-title'>EV Yield</h3>
                            <div className='pokedex-data-container ev-table'>
                                <div className='ev-table-container'>
                                    <div className='ev-table-data'>
                                        <div className='stat hp'>{hp()}</div>
                                        <div className='ev'>{hpEV()}</div>
                                    </div>

                                    <div className='ev-table-data'>
                                        <div className='stat attk'>{attack()}</div>
                                        <div className='ev'>{attkEV()}</div>
                                    </div>

                                    <div className='ev-table-data'>
                                        <div className='stat def'>{defence()}</div>
                                        <div className='ev'>{defEV()}</div>
                                    </div>

                                    <div className='ev-table-data'>
                                        <div className='stat sp-attk'>{shortenedAttack()}</div>
                                        <div className='ev'>{spAttkEV()}</div>
                                    </div>

                                    <div className='ev-table-data'>
                                        <div className='stat sp-def'>{shortenedDefence()}</div>
                                        <div className='ev'>{spDefEV()}</div>
                                    </div>

                                    <div className='ev-table-data data-last'>
                                        <div className='stat speed'>{speed()}</div>
                                        <div className='ev'>{speedEV()}</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'block' }}>
                                <p
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        marginLeft: '3px',
                                    }}>
                                    EV Total: {evTotal()}
                                </p>
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
