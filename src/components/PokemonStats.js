export const PokemonStats = ({ pokemonDetails, toggleTab }) => {
    return (
        <div id='tab-2' className='tab-content tab' onClick={() => toggleTab(1)}>
            <div className='center-container__stats'>
                {pokemonDetails.stats.map((s) => (
                    <div
                        className='stats-container'
                        // style={{ width: '50%', margin: '0 auto', marginBottom: '10px' }}
                        key={s.stat.name}>
                        <p className='stats-stat-name'>{s.stat.name.toUpperCase()}</p>
                        <div className='stats-stat-max'>
                            <div
                                className={`${pokemonDetails.types[0].type.name} stats-stat-level`}
                                style={{ width: s.base_stat }}>
                                {s.base_stat}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
