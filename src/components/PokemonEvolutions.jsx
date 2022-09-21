import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const RenderChain = ({ pokemonChain, current, pokemonDetails }) => {
    const [sprites, setSprites] = useState()

    useEffect(() => {
        const callSprites = async () => {
            const sprites = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemonChain.species.name}/`,
            )
            const spritesData = await sprites.json()
            setSprites(spritesData)
        }
        callSprites()
    }, [])

    if (!pokemonChain || !current || !pokemonDetails || !sprites) return null
    const isCurrent = pokemonChain?.species?.name.toLowerCase() === current.toLowerCase()

    return (
        <div className='sprites_wrapper'>
            <div className='sprite_container'>
                <Link
                    style={{ fontWeight: isCurrent ? 'bold' : 'normal' }}
                    to={`${pokemonChain.species.name}`}>
                    <img
                        className='sprite_image'
                        src={sprites.sprites.other['official-artwork'].front_default}
                        alt={sprites.name}
                    />
                    <div className='sprite_name'>
                        {pokemonChain.species.name.charAt(0).toUpperCase() +
                            pokemonChain.species.name.slice(1)}
                    </div>
                </Link>
            </div>
            {pokemonChain.evolves_to.length > 0
                ? pokemonChain.evolves_to.map((pokemon) => {
                      return (
                          <RenderChain
                              key={pokemon.species.name}
                              pokemonChain={pokemon}
                              current={current}
                              pokemonDetails={pokemonDetails}
                          />
                      )
                  })
                : null}
        </div>
    )
}

export const PokemonEvolutions = ({ pokemonDetails, pokemonChain }) => {
    const [evoChain, setEvoChain] = useState(false)

    useEffect(() => {
        const test = async () => {
            const species = await fetch(pokemonDetails.species.url)
            const speciesData = await species.json()
            const evoChain = await fetch(speciesData.evolution_chain.url)
            const evoChainData = await evoChain.json()
            setEvoChain(evoChainData)
        }
        test()
    }, [])
    return (
        <div id='tab-3' className='tab-content tab'>
            <div>
                <p className='tab-content-text'>
                    {' '}
                    Pokémon evolutions in decending order. The lower in the chain you go the higher
                    the evolution. Click on a Pokémon in the chain to see that Pokémon's Pokédex
                    entry!
                </p>
            </div>
            {evoChain !== false ? (
                <RenderChain
                    pokemonChain={evoChain.chain}
                    current={pokemonDetails.name}
                    pokemonDetails={pokemonDetails}
                />
            ) : null}
        </div>
    )
}
