import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const RenderChain = ({ pokemonChain, current, sprite }) => {
    if (!pokemonChain || !current) return null
    const isCurrent = pokemonChain?.species?.name.toLowerCase() === current.toLowerCase()
    return (
        <div>
            <img
                src={sprite.sprites.other['official-artwork'].front_default}
                alt={pokemonChain.species.name}
            />
            <div
                style={{
                    fontWeight: isCurrent ? 'bold' : 'normal',
                }}>
                <Link to={`${pokemonChain.species.name}`}>{pokemonChain.species.name}</Link>
            </div>
            {pokemonChain.evolves_to.length > 0
                ? pokemonChain.evolves_to.map((pokemon) => {
                      return (
                          <RenderChain
                              key={pokemon.species.name}
                              pokemonChain={pokemon}
                              current={current}
                          />
                      )
                  })
                : null}
        </div>
    )
}

export const PokemonEvolutions = ({ pokemonDetails }) => {
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
    }, [pokemonDetails.species.url])
    return (
        <div id='tab-3' className='tab-content tab'>
            {evoChain !== false ? (
                <RenderChain
                    pokemonChain={evoChain.chain}
                    current={pokemonDetails.name}
                    sprite={pokemonDetails.sprites}
                />
            ) : null}
        </div>
    )
}
