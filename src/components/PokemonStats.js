export const PokemonStats = ({ pokemonDetails, toggleTab }) => {
    return (
        <div id='tab-2' className='tab-content tab' onClick={() => toggleTab(1)}>
            {pokemonDetails.stats.map((s) => (
                <div className='stats-container' key={s.stat.name}>
                    <p className='stats-stat-name'>{s.stat.name.toUpperCase()}</p>
                    <div className='stats-stat-max'>
                        <div className='stats-stat-level' style={{ width: s.base_stat }}>
                            {s.base_stat}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
