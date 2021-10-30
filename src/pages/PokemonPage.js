import axios from "axios"
import { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import Loader from "../components/Loader"

const PokemonPage = ({ match }) => {

    const id = match.params.id

    const[pokemonDetails, setPokemonDetails] = useState()
    const[speciesData, setSpeciesData] = useState()
    const[loading, setLoading] = useState(true)

    useEffect(() => {
        const getPokemon = async (id) => {
            const details = await getPokemonData(id)
            
            setPokemonDetails(details.data)
            setLoading(false)
    
        }

        const getSpecies = async (id) => {
            const species = await getSpeciesData(id)
            setSpeciesData(species.data)
        }

        const getPokemonData = async (id) => {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            return res
        };

        const getSpeciesData = async (id) => {
            const re = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            return re
        }
        
         getPokemon(id)
         getSpecies(id)

    },[id])

    console.log(speciesData)

    return (
        <>
            {loading ? (
            <Loader/>
            ) : (
                <>
                    <Row>
                        <div className={`pokemon-page-header background-${pokemonDetails.types[0].type.name}`}>
                            <img className="pokemon-page-header__image pokemon-image"src={pokemonDetails.sprites.other["official-artwork"].front_default} alt={pokemonDetails.name} />

                            
                            <div className="pokemon-page-header__details">
                                <h3 className="pokemon-page-header__id pokemon-id">#{pokemonDetails.id}</h3>
                                    <h1 className="pokemon-page-header__name pokemon-name">{pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}</h1>
                                        <div className="type-container">
                                            {pokemonDetails.types.map(t => (
                                                <div key={t.type.name} className={`homepage-pokemon-card__type ${t.type.name}`}>
                                                <img alt={`${t.type.name} type icon`} src={`/img/svg/${t.type.name}.svg`} className="type-icon" />
                                                    <p>{t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}</p>
                                                </div>
                                            ))}
                                        </div>
                            </div>
                            
                            
                        </div>
                    </Row>
                    <Row>
                        <div>
                         <p>{speciesData.flavor_text_entries["15"].flavor_text}</p>
                            <h3>Stats</h3>
                                {pokemonDetails.stats.map(s => (
                                    <div className="stats-container" key ={s.stat.name}>
                                        <p className="stats-stat-name">{s.stat.name.toUpperCase()}</p>
                                        <div className="stats-stat-max"><div className="stats-stat-level" style={{width: s.base_stat}}>{s.base_stat}</div></div>
                                    </div>
                                    ))}
                        </div>
                    </Row>
                </>
            ) }
        </>
    )
}

export default PokemonPage
