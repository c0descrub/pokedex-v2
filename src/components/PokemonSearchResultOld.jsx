import React from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { useQuery } from '@tanstack/react-query'

const getPokemon = async (pokemonName) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
    const { types, sprites } = await res.json()

    return {
        types: types.map((t) => t.type.name),
        sprite: sprites.other['official-artwork'].front_default,
    }
}

export const PokemonSearchResult = ({ pokemonName, id }) => {
    const { ref, inView } = useInView()
    const { data: pokemon, isLoading } = useQuery([pokemonName], () => getPokemon(pokemonName), {
        enabled: inView,
    })

    return (
        <Link ref={ref} to={`/pokemon/${id}`} style={{ textDecoration: 'none' }}>
            <div
                className={`homepage-pokemon-card background-${
                    isLoading ? 'loading' : pokemon?.types[0]
                }`}>
                <div>
                    <h3 className='homepage-pokemon-card__id pokemon-id'>#{id}</h3>
                    <h1 className='homepage-pokemon-card__name pokemon-name'>{pokemonName}</h1>

                    <div className='type-container'>
                        {isLoading
                            ? null
                            : pokemon?.types.map((t) => (
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
                    src={!isLoading && inView ? pokemon?.sprite : null}
                />
            </div>
        </Link>
    )
}
