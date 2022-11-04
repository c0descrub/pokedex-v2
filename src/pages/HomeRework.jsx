import React, { useState } from 'react'
import { PokemonArray } from '../components/PokemonArray'
import { PokemonSearchResult } from '../components/PokemonSearchResult'

const HomeRework = () => {
    const [searchQuery, setSearchQuery] = useState('')
    return (
        <>
            <h1>HOME PAGE REWORK</h1>
            <input
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                type='text'
                placeholder='Search for a pokemon'
            />
            {searchQuery === '' ? null : (
                <div className='search_results'>
                    <ul>
                        {PokemonArray.map((pokemonName, index) => {
                            if (searchQuery === '') {
                                return <React.Fragment key={index}></React.Fragment>
                            }
                            if (!pokemonName.includes(searchQuery)) {
                                return <React.Fragment key={index}></React.Fragment>
                            }
                            return (
                                <PokemonSearchResult
                                    key={index}
                                    pokemonName={pokemonName}
                                    id={index + 1}
                                />
                            )
                        })}
                    </ul>
                </div>
            )}
        </>
    )
}

export default HomeRework
