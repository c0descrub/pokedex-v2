import { Link } from 'react-router-dom'

const Pokemon = ({pokemon}) => {
    return (
        <>
        <Link to={`/pokemon/${pokemon.id}`} style={{textDecoration: "none"}}>
            <div className={`homepage-pokemon-card background-${pokemon.types[0].type.name}`}>
                <div>
                    <h3 className="homepage-pokemon-card__id pokemon-id">#{pokemon.id}</h3>
                    <h1 className="homepage-pokemon-card__name pokemon-name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                

                    <div className="type-container">
                        {pokemon.types.map(t => (
                                <div key={t.type.name} className={`homepage-pokemon-card__type ${t.type.name}`}>
                                <img alt={`${t.type.name} type icon`} src={`/img/svg/${t.type.name}.svg`} className="type-icon" />
                                    <p>{t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}</p>
                                </div>
                        ))}
                    </div>
                </div>
                
                    <img className="homepage-pokemon-card__image pokemon-image" alt={pokemon.name} src={pokemon.sprites.other["official-artwork"].front_default}/>
                    
            </div>
        </Link>
        </>

    )
}

export default Pokemon
