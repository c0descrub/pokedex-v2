import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'

export const PokemonSearchResult = ({ pokemonName, id }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [pokemon, setPokemon] = useState(
        window.localStorage.getItem(`savedPokemon:${pokemonName}`)
            ? JSON.parse(window.localStorage.getItem(`savedPokemon:${pokemonName}`))
            : null,
    )
    const { ref, inView } = useInView()

    useEffect(() => {
        if (pokemon !== null) {
            setIsLoading(false)
            return
        }
        if (inView) {
            const getPokemon = async () => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
                const { types, sprites } = await res.json()
                const pokemonToSave = {
                    types: types.map((t) => t.type.name),
                    sprite: sprites.other['official-artwork'].front_default,
                }
                setPokemon(pokemonToSave)
                window.localStorage.setItem(
                    `savedPokemon:${pokemonName}`,
                    JSON.stringify(pokemonToSave),
                )
                setIsLoading(false)
            }
            getPokemon()
        }
    }, [pokemonName, pokemon, inView])

    return (
        <Link ref={ref} to={`/pokemon/${id}`} style={{ textDecoration: 'none' }}>
            <div
                className={`homepage-pokemon-card background-${
                    isLoading ? 'loading' : pokemon.types[0]
                }`}>
                <div>
                    <h3 className='homepage-pokemon-card__id pokemon-id'>#{id}</h3>
                    <h1 className='homepage-pokemon-card__name pokemon-name'>{pokemonName}</h1>

                    <div className='type-container'>
                        {isLoading
                            ? null
                            : pokemon.types.map((t) => (
                                  <div key={t} className={`homepage-pokemon-card__type ${t}`}>
                                      <img
                                          alt={`${t} type icon`}
                                          src={`/img/svg/${t}.svg`}
                                          className='type-icon'
                                      />
                                      <p>{t.charAt(0).toUpperCase() + t.slice(1)}</p>
                                  </div>
                              ))}
                    </div>
                </div>

                <img
                    className='homepage-pokemon-card__image pokemon-image'
                    alt={pokemonName}
                    src={!isLoading && inView ? pokemon.sprite : null}
                />
            </div>
        </Link>
    )
}
