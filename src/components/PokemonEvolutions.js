import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const RenderChain = ({ pokemonChain, current, pokemonDetails }) => {
    if (!pokemonChain || !current || !pokemonDetails) return null
    const isCurrent = pokemonChain?.species?.name.toLowerCase() === current.toLowerCase()
    console.log(pokemonDetails)
    return (
        <div>
            <img
                src={pokemonDetails.sprites.other['official-artwork'].front_default}
                alt={pokemonDetails.name}
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
                              pokemonDetails={pokemonDetails}
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
    }, [])
    return (
        <div id='tab-3' className='tab-content tab'>
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
