function Win ({enemy, goBack}) {

  function catchPokemon () {
    fetch('/pokemon', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({enemy})
    })
    .then(() => goBack())
  }

    return (
      <div className="card" style={{ backgroundImage: `url(/pic/Win.jpg)` }}>
        <h1>YOU WON!!!</h1>
        <button className='pokemon-btn' onClick={catchPokemon}>CATCH {enemy.name}</button>
        <button className='pokemon-btn' onClick={goBack}>RELEASE</button>
      </div>
    )
  }
  
  export default Win;