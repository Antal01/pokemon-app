import { useState, useEffect } from "react"

function Battle({ enemy, ownPokemon, goBack, lose, win }) {

  const [enemyAttackNumber, setEnemyAttackNumber] =useState(0)
  const [attackNumber, setAttackNumber] = useState(0)
  const [turn, setTurn] = useState(0)

  const[enemyPokemonStats, setEnemyPokemonStats] = useState({
    hp: enemy.stats[0].base_stat,
    att: enemy.stats[1].base_stat,
    def: enemy.stats[2].base_stat
  })

  const[ownPokemonStats, setOwnPokemonStats] = useState({
    hp: ownPokemon.stats[0].base_stat,
    att: ownPokemon.stats[1].base_stat,
    def: ownPokemon.stats[2].base_stat
  })

function winnerPokemon() {
  if(enemyPokemonStats.hp <= 0) {
    win();
  } else  if (ownPokemonStats.hp <= 0){
    lose();
   }
}

  function handleAttack() {
    const hp = enemyPokemonStats.hp
    const att = ownPokemonStats.att
    const def = enemyPokemonStats.def
    const rnd = Math.floor(Math.random()*38)+217
    const attack = Math.floor(((((2/5+2)*att*60/def)/50)+2)*rnd/255)
    setEnemyPokemonStats({
      ...enemyPokemonStats,
      hp: hp-attack
    });
    setAttackNumber(attack)
    handleAttackBack();
  }
  
  function handleAttackBack() {
    const hp = ownPokemonStats.hp
    const att = enemyPokemonStats.att
    const def = ownPokemonStats.def
    const rnd = Math.floor(Math.random()*38)+217
    const attack = Math.floor(((((2/5+2)*att*60/def)/50)+2)*rnd/255)

    setOwnPokemonStats({
      ...ownPokemonStats,
      hp: hp-attack
    })
    setEnemyAttackNumber(attack)
    setTurn(turn+1)
  }

  useEffect(() => {
    winnerPokemon();
  }, [enemyPokemonStats, ownPokemonStats])

  useEffect(() => {
    const damageElement = document.getElementById('attackNumber');
    const enemyDamageElement = document.getElementById('enemyAttackNumber');
    damageElement.classList.add('animated');
    enemyDamageElement.classList.add('animated');
    setTimeout(() => {
      damageElement.classList.remove('animated');
      enemyDamageElement.classList.remove('animated');
    }, 1000);
  }, [turn]);

  return (
    <>
      <div className="card" style={{ backgroundImage: `url(/pic/Battle.png)` }}>
        <div className="enemy-pokemon cards">
          <div className="damage" id='attackNumber'>{attackNumber}</div>
          <div className="Poke-Name">
            {enemy.name}
          </div>
          <img className="img" alt='Poke-Icon' src={enemy.sprites.front_default} />
          <div className="Poke-Stats">
            <p>HP: {enemyPokemonStats.hp}</p>
            <p>Attack: {enemyPokemonStats.att}</p>
            <p>Defense: {enemyPokemonStats.def}</p>
          </div>
          <div className="pokemon-types">
            {enemy.types.map(type => (
              <span key={type.type.name} className={`pokemon-type ${type.type.name}`}>{type.type.name}</span>
            ))}
          </div>
        </div>
        <div className="own-pokemon cards">
          <div className="damage" id='enemyAttackNumber'>{enemyAttackNumber}</div>
          <div className="Poke-Name">
            {ownPokemon.name}
          </div>
          <img className="img" alt='Poke-Icon' src={ownPokemon.sprites.front_default} />
          <div className="Poke-Stats">
            <p>HP: {ownPokemonStats.hp}</p>
            <p>Attack: {ownPokemonStats.att}</p>
            <p>Defense: {ownPokemonStats.def}</p>
          </div>
          <div className="pokemon-types">
            {ownPokemon.types.map(type => (
              <span key={type.type.name} className={`pokemon-type ${type.type.name}`}>{type.type.name}</span>
            ))}
          </div>
        </div>
      <button className='pokemon-btn' onClick={handleAttack}>ATTACK</button>
      <button className='pokemon-btn'onClick={goBack}>BACK</button>
      </div>
    </>
  )
}

export default Battle;