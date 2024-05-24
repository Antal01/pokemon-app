function Lost({goBack}) {
  return (
    <div className="card" style={{ backgroundImage: `url(/pic/Lost.jpeg)` }}>
      <h1>YOU LOST!!!</h1>
      <button className='pokemon-btn' onClick={goBack}>BACK</button>
    </div>
  )
}

export default Lost;
