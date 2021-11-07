import React from 'react'

export const PokemonHeader = ({ pokemonDetails }) => {
    return (
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
    )
}
