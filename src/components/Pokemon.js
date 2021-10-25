import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Pokemon = ({pokemon}) => {
    return (
        <>
            <Card 
                className="my-3 p-3 h-250 rounded text-center shadow mb-5 bg-white"
                style={{minHeight: '250px', border: 'none'}}
            >
                <Link 
                    to={`/pokemon/${pokemon.id}`}
                    style={{textDecoration: "none"}}
                >
                    <Card.Img 
                        style={{ width: '8rem'}}
                        src={pokemon.sprites.front_default} variant="top"
                    />
                    <h1 className="pokemon-name">#{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                </Link>
                <Card.Body className="type-container">
                {pokemon.types.map(t => (
                        <div key={t.type.name} className={`type ${t.type.name}`}>
                            <p>{t.type.name}</p>
                        </div>
                ))}
                </Card.Body>
            </Card>
        </>

    )
}

export default Pokemon
