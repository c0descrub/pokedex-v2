import { Link } from 'react-router-dom'

export const PokemonHeader = ({ pokemonDetails, toggleTab }) => {
    return (
        <>
            <div
                className={`pokemon-page-header background-${pokemonDetails.types[0].type.name}`}
                style={{
                    backgroundImage: `url("/img/svg/${pokemonDetails.types[0].type.name}-bg.svg")`,
                    backgroundSize: '100px',
                }}>
                <Link
                    to={`/`}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        left: '15px',
                        cursor: 'pointer',
                        color: 'white',
                    }}>
                    <i className='fa-solid fa-arrow-left'></i>
                </Link>
                <div className='pokemon-page-header__details'>
                    <img
                        className='pokemon-page-header__image pokemon-image'
                        src={pokemonDetails.sprites.other['official-artwork'].front_default}
                        alt={pokemonDetails.name}
                    />
                    <div className='type-name-container'>
                        <h3 className='pokemon-page-header__id pokemon-id'>#{pokemonDetails.id}</h3>
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
                                        {t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='pokemon-page-tab__container'>
                <div className='pokemon-page-tab' onClick={() => toggleTab(1)}>
                    <h1>About</h1>
                    <div id='about' className='about-tab-marker'></div>
                </div>

                <div className='pokemon-page-tab' onClick={() => toggleTab(2)}>
                    <h1>Stats</h1>
                    <div id='stats' className='stats-tab-marker hidden'></div>
                </div>

                <div className='pokemon-page-tab' onClick={() => toggleTab(3)}>
                    <h1>Evolution</h1>
                    <div id='evo' className='evo-tab-marker hidden'></div>
                </div>
            </div>
        </>
    )
}
