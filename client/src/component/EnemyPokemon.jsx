import { useState, useEffect } from "react"

function EnemyPokemon({ enemy, selectOwn }) {

  const [ownPokemon, setOwnPokemon] = useState([])

  const handleSelect = event => {
    console.log(event.target.id)
    selectOwn(event.target.id)
  };

  useEffect(() => {
    fetch(`/pokemon`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        setOwnPokemon(data)
      })
  }, [])

  return (
    <>
    <div className="card" style={{ backgroundImage: `url(/pic/Battle.png)` }}>
      <div className="enemy-pokemon cards" >
        <div className="Poke-Name">
          {enemy.name}
        </div>
        <img alt='Poke-Icon' src={enemy.sprites.front_default} />
        <div className="Poke-Stats">
          {enemy.stats.slice(0, 3).map((e, i) =>
            <p key={i}>
              {e.stat.name}: {e.base_stat}
            </p>
          )}
        </div>
        <div className="pokemon-types">
          {enemy.types.map(type => (
            <span key={type.type.name} className={`pokemon-type ${type.type.name}`}>{type.type.name}</span>
          ))}
        </div>
      </div>

      <div className="Own-Pokemon-Name" >
        <label className="label"> Choose your pokemon:
          {ownPokemon.map(own => (
            <p key={own} id={own} className='options' onClick={handleSelect}>{own}</p>
          ))}
        </label>
      </div>
    </div>
    </>
  )
}


export default EnemyPokemon;