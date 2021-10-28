import axios from "axios"
import { useState, useEffect } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
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
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card 
                            className="my-3 p-3 rounded text-center shadow p-3 mb-5 bg-white"
                            style={{border:'none'}}
                        >
                            <h1>#{pokemonDetails.id} {pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}</h1>
                            
                            <div className="type-container" style={{marginBottom: '10px'}}>
                                {pokemonDetails.types.map(t => (
                                    <div key={t.type.name} className={`type ${t.type.name}`}>
                                        <p>{t.type.name}</p>
                                    </div>
                                ))}
                            </div>

                            <Row>
                                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <h3>Normal Version</h3>
                                    <Card.Img 
                                        style={{width: '15rem', margin:'0 auto'}}
                                        src={pokemonDetails.sprites.front_default}
                                        variant="top"
                                    />
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <h3>Shiny Version</h3>
                                    <Card.Img 
                                        style={{width: '15rem', margin:'0 auto'}} 
                                        src={pokemonDetails.sprites.front_shiny}

                                    />
                                </Col>

                                {speciesData.flavor_text_entries.map(f => (
                                    <p>{f.flavor_text}</p>
                                ))}

                                  
                                <Row>
                                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Card style={{border: "none"}}>
                                    <h3>Stats</h3>
                                    {pokemonDetails.stats.map(s => (
                                        <div className="stats-container" key ={s.stat.name}>
                                            <p className="stats-stat-name">{s.stat.name.toUpperCase()}</p>
                                            <div className="stats-stat-max"><div className="stats-stat-level" style={{width: s.base_stat}}>{s.base_stat}</div></div>

                                        </div>
                                    ))}
                                </Card>
                                </Col>
                                </Row>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            ) }
        </>
    )
}

export default PokemonPage
