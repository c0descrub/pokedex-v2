import { useEffect, useState } from 'react'

const RenderChain = ({ pokemonChain, current }) => {
    console.log({ pokemonChain, current })
    if (!pokemonChain || !current) return null
    const isCurrent = pokemonChain?.species?.name.toLowerCase() === current.toLowerCase()
    return (
        <div>
            <div
                style={{
                    fontWeight: isCurrent ? 'bold' : 'normal',
                }}>
                {pokemonChain.species.name}
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

export const PokemonEvolutions = ({ pokemonDetails, evolutionData, toggleTab }) => {
    console.log(pokemonDetails.name)
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
                <RenderChain pokemonChain={evoChain.chain} current={pokemonDetails.name} />
            ) : null}
        </div>
    )
}
