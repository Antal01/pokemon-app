import { useEffect, useState } from 'react'
import Locations from './component/Locations';
import EnemyPokemon from './component/EnemyPokemon';
import Battle from './component/Battle';
import Lost from './component/Lost';
import Win from './component/Win';
import './App.css';

function App() {

  const [cityList, setCityList] = useState([])
  const [screen, setScreen] = useState('Location')
  const [ownPokemon, setOwnPokemon] = useState('')
  const [enemy, setEnemy] = useState({})

  const handleSelectCity = (city) => {
    fetch(`api/cities/${city}`)
      .then((res) => res.json())
      .then((data) => {
        setEnemy(data)
        setScreen('EnemyPokemon')
      })
  }

  const handleSelectOwn = (ownPokemonName) => {
    fetch(`pokemon/${ownPokemonName}`)
      .then((res) => res.json())
      .then((data) => {
        setOwnPokemon(data)
        setScreen('Battle')
      })
  }

  const handleBack = () => {
    setScreen('Location')
  }

  const handleLose = () => {
    setScreen('Lost')
  }

  const handleWin = () => {
    setScreen('Win')
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/cities');
      const data = await res.json();
      setCityList(data);
    }
    fetchData()
  }, [])

  return (
    <div className="App">

      {screen === 'Location' && cityList && (
        <Locations
          cityList={cityList}
          selectCity={handleSelectCity}
        />
      )}

      {screen === 'EnemyPokemon' && (
        <EnemyPokemon
          enemy={enemy}
          selectOwn={handleSelectOwn}
        />
      )}

      {screen === 'Battle' && (
        <Battle
          enemy={enemy}
          ownPokemon={ownPokemon}
          goBack={handleBack}
          lose={handleLose}
          win={handleWin}
        />
      )}

      {screen === 'Lost' && (
        <Lost
          goBack={handleBack}
        />
      )}

      {screen === 'Win' && (
        <Win
          enemy={enemy}
          goBack={handleBack}
        />
      )}

    </div>
  );
}

export default App;
