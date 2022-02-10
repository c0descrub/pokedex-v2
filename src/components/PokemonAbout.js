export const PokemonAbout = ({ speciesData, pokemonDetails }) => {
    const heightConversion = () => {
        let a = (pokemonDetails.height * 10) / 30.48
        return (
            <p className='species-data' style={{ fontSize: '14px', marginLeft: '5px' }}>
                ({a.toFixed(2) + 'ft'})
            </p>
        )
    }

    const weightConversion = () => {
        let b = (pokemonDetails.weight / 10) * 2.2
        return (
            <p className='species-data' style={{ fontSize: '14px', marginLeft: '5px' }}>
                ({b.toFixed(0) + 'lbs'})
            </p>
        )
    }
    const determineGender = () => {
        let gender = speciesData.gender_rate
        let female = (gender / 8) * 100
        let male = 100 - female

        if (gender > -1) {
            return (
                <div style={{ display: 'flex' }}>
                    <p style={{ color: '#1981d3', fontWeight: 'bold' }}>{male + '%'}</p>{' '}
                    <p style={{ color: '#c97cc3', fontWeight: 'bold', marginLeft: '5px' }}>
                        {female + '%'}
                    </p>
                </div>
            )
        } else return <p style={{ color: 'var(--text-grey)' }}>Genderless</p>
    }

    const eggGroups = () => {
        let eggArray = speciesData.egg_groups

        if (eggArray.length === 0) {
            return <p className='species-data'>N/a</p>
        } else
            return (
                <p className='species-data'>
                    {speciesData.egg_groups['0'].name.charAt(0).toUpperCase() +
                        speciesData.egg_groups['0'].name.slice(1)}
                </p>
            )
    }

    const hatchCounter = () => {
        let data = speciesData.hatch_counter
        let counter = 255 * (data + 1)

        return counter
    }

    const evTotal = () => {
        let total =
            pokemonDetails.stats['0'].effort +
            pokemonDetails.stats['1'].effort +
            pokemonDetails.stats['2'].effort +
            pokemonDetails.stats['3'].effort +
            pokemonDetails.stats['4'].effort +
            pokemonDetails.stats['5'].effort

        return total
    }

    const hpEV = () => {
        return pokemonDetails.stats['0'].effort
    }

    const attkEV = () => {
        return pokemonDetails.stats['1'].effort
    }

    const defEV = () => {
        return pokemonDetails.stats['2'].effort
    }

    const spAttkEV = () => {
        return pokemonDetails.stats['3'].effort
    }

    const spDefEV = () => {
        return pokemonDetails.stats['4'].effort
    }

    const speedEV = () => {
        return pokemonDetails.stats['5'].effort
    }

    const hp = () => {
        let hp = pokemonDetails.stats['0'].stat.name
        const hitpoints = hp.charAt(0).toUpperCase() + hp.slice(1)

        return hitpoints
    }

    const attack = () => {
        let attk = pokemonDetails.stats['1'].stat.name
        const attack = attk.charAt(0).toUpperCase() + attk.slice(1)

        return attack
    }

    const defence = () => {
        let def = pokemonDetails.stats['2'].stat.name
        const defence = def.charAt(0).toUpperCase() + def.slice(1)

        return defence
    }

    const shortenedAttack = () => {
        let specialAttack = pokemonDetails.stats['3'].stat.name
        const spAttack =
            specialAttack.charAt(0).toUpperCase() +
            specialAttack.charAt(1) +
            '.' +
            specialAttack.charAt(8).toUpperCase() +
            specialAttack.slice(9)

        return spAttack
    }

    const shortenedDefence = () => {
        let specialDefence = pokemonDetails.stats['4'].stat.name
        const spDefence =
            specialDefence.charAt(0).toUpperCase() +
            specialDefence.charAt(1) +
            '.' +
            specialDefence.charAt(8).toUpperCase() +
            specialDefence.slice(9)

        return spDefence
    }

    const speed = () => {
        let spd = pokemonDetails.stats['5'].stat.name
        const speed = spd.charAt(0).toUpperCase() + spd.slice(1)

        return speed
    }

    const flavorText = () => {
        let entriesArray = speciesData.flavor_text_entries
        let englishEntries = entriesArray.filter((entry) => {
            return entry.language.name === 'en'
        })

        let lastEnglishEntry = englishEntries.length - 1

        return englishEntries[lastEnglishEntry].flavor_text
    }

    return (
        <div id='tab-1' className='tab-content current-tab tab-1'>
            <p className='tab-content-text'>{flavorText()}</p>
            <div className='center-container'>
                <h2 className={`${pokemonDetails.types[0].type.name}-text`}>Pokédex Data</h2>
                <div className='pokedex-data-container'>
                    <div>
                        <h3 className='species-data-title'>Genus:</h3>
                    </div>
                    <div>
                        <p className='species-data'>{speciesData.genera['7'].genus}</p>
                    </div>
                </div>

                <div className='pokedex-data-container'>
                    <div>
                        <h3 className='species-data-title'>Height:</h3>
                    </div>
                    <div>
                        <p className='species-data'>{pokemonDetails.height * 10 + 'cm'}</p>
                    </div>
                    <div>{heightConversion()}</div>
                </div>

                <div className='pokedex-data-container'>
                    <div>
                        <h3 className='species-data-title'>Weight:</h3>
                    </div>
                    <div>
                        <p className='species-data'>{pokemonDetails.weight / 10 + 'kg'}</p>
                    </div>
                    <div>{weightConversion()}</div>
                </div>

                <div className='pokedex-data-container'>
                    <div>
                        <h3 className='species-data-title'>Abilities:</h3>
                    </div>
                    <div>
                        {pokemonDetails.abilities.map((a, pos) => (
                            <div key={pos}>
                                {a.is_hidden === true ? (
                                    <p className='hidden-ability species-data'>
                                        {a.ability.name.charAt(0).toUpperCase() +
                                            a.ability.name.slice(1) +
                                            ' (hidden ability)'}
                                    </p>
                                ) : (
                                    <p className='species-data'>
                                        {a.ability.name.charAt(0).toUpperCase() +
                                            a.ability.name.slice(1)}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <h2 className={`${pokemonDetails.types[0].type.name}-text`}>Training</h2>
                <h3 className='species-data-title'>EV Yield</h3>
                <div className='pokedex-data-container ev-table'>
                    <div className='ev-table-container'>
                        <div className='ev-table-data'>
                            <div className={` ${pokemonDetails.types[0].type.name} stat hp`}>
                                {hp()}
                            </div>
                            <div className={`background-${pokemonDetails.types[0].type.name} ev`}>
                                {hpEV()}
                            </div>
                        </div>

                        <div className='ev-table-data'>
                            <div className={` ${pokemonDetails.types[0].type.name} stat`}>
                                {attack()}
                            </div>
                            <div className={`background-${pokemonDetails.types[0].type.name} ev`}>
                                {attkEV()}
                            </div>
                        </div>

                        <div className='ev-table-data'>
                            <div className={` ${pokemonDetails.types[0].type.name} stat`}>
                                {defence()}
                            </div>
                            <div className={`background-${pokemonDetails.types[0].type.name} ev`}>
                                {defEV()}
                            </div>
                        </div>

                        <div className='ev-table-data'>
                            <div className={` ${pokemonDetails.types[0].type.name} stat`}>
                                {shortenedAttack()}
                            </div>
                            <div className={`background-${pokemonDetails.types[0].type.name} ev`}>
                                {spAttkEV()}
                            </div>
                        </div>

                        <div className='ev-table-data'>
                            <div className={` ${pokemonDetails.types[0].type.name} stat`}>
                                {shortenedDefence()}
                            </div>
                            <div className={`background-${pokemonDetails.types[0].type.name} ev`}>
                                {spDefEV()}
                            </div>
                        </div>

                        <div className='ev-table-data data-last'>
                            <div className={` ${pokemonDetails.types[0].type.name} stat`}>
                                {speed()}
                            </div>
                            <div className={`background-${pokemonDetails.types[0].type.name} ev`}>
                                {speedEV()}
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'block' }}>
                    <p
                        style={{
                            fontWeight: 'bold',
                            fontSize: '14px',
                            marginLeft: '3px',
                            marginBottom: '20px',
                        }}>
                        EV Total: {evTotal()}
                    </p>
                </div>

                <div className='pokedex-data-container'>
                    <div>
                        <h3 className='species-data-title' style={{ width: '150px' }}>
                            Catch Rate:
                        </h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p className='species-data'>{speciesData.capture_rate}</p>{' '}
                        <p className='species-data' style={{ fontSize: '12px', marginLeft: '5px' }}>
                            {' '}
                            (Regular Pokéball, full HP)
                        </p>
                    </div>
                </div>
                <div className='pokedex-data-container'>
                    <div>
                        <h3 className='species-data-title' style={{ width: '150px' }}>
                            Base Friendship:
                        </h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p className='species-data'>{speciesData.base_happiness}</p>{' '}
                    </div>
                </div>
                <div className='pokedex-data-container'>
                    <div>
                        <h3 className='species-data-title' style={{ width: '150px' }}>
                            Base Experience:
                        </h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p className='species-data'>{pokemonDetails.base_experience}</p>{' '}
                    </div>
                </div>
                <div className='pokedex-data-container'>
                    <div>
                        <h3 className='species-data-title' style={{ width: '150px' }}>
                            Growth Rate:
                        </h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p className='species-data'>
                            {speciesData.growth_rate.name.charAt(0).toUpperCase() +
                                speciesData.growth_rate.name.slice(1)}
                        </p>{' '}
                    </div>
                </div>

                <h2 className={`${pokemonDetails.types[0].type.name}-text`}>Breeding</h2>
                <div className='pokedex-data-container'>
                    <div>
                        <h3 className='species-data-title' style={{ width: '150px' }}>
                            Gender Rate:
                        </h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>{determineGender()}</div>
                </div>
                <div className='pokedex-data-container'>
                    <div>
                        <h3 className='species-data-title' style={{ width: '150px' }}>
                            Egg Groups:
                        </h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>{eggGroups()}</div>
                </div>
                <div className='pokedex-data-container'>
                    <div>
                        <h3 className='species-data-title' style={{ width: '150px' }}>
                            Egg Cycles:
                        </h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p className='species-data'>
                            {speciesData.hatch_counter}{' '}
                            <span className='hidden-ability'>({hatchCounter()} steps</span>)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
