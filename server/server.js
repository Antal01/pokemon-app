const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json({ limit: '25mb' }));
app.use(express.static('../resources'))

let cityData;

function randomPokemon(pokeList) {
  return Math.floor(Math.random() * pokeList.length)
}

app.get('/api/cities', async (req, res) => {
  const response = await fetch('https://pokeapi.co/api/v2/location');
  cityData = await response.json();
  const cityList = cityData.results.map((e) => {
    return e.name;
  });
  res.send(cityList);
});

app.get('/api/cities/:id', async (req, res) => {
  const found = cityData.results.find((obj) => obj.name === req.params.id)
  const cityNumber = (found.url.split('/'))
  const URL = `https://pokeapi.co/api/v2/location-area/${cityNumber[cityNumber.length - 2]}`
  const response = await fetch(URL);
  pokeData = await response.json();
  const pokeList = pokeData.pokemon_encounters.map((e) => {
    return e.pokemon
  });
  let pokemonURL = pokeList[randomPokemon(pokeList)].url
  const pokeResponse = await fetch(pokemonURL);
  const randomPokemonData = await pokeResponse.json();
  res.send(randomPokemonData)
})

app.get('/pokemon', async (req, res) => {
  fs.readFile('../resources/pokemons.json', (err, data) => {
    if (err) throw err;
    ownPokemons = JSON.parse(data);
    let pokeList = ownPokemons.pokemons.map((e) => {
      return e.name
    })
    res.send(pokeList)
  });
})

app.post('/pokemon', async (req, res) => {
  fs.readFile('../resources/pokemons.json', (err, data) => {
    if (err) throw err;
    ownPokemons = JSON.parse(data);
    ownPokemons.pokemons.push(req.body.enemy)
    ownPokemons = JSON.stringify(ownPokemons)
    fs.writeFile('../resources/pokemons.json', ownPokemons, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send('OK')
      }
    })
  })
})

app.get('/pokemon/:id', async (req, res) => {
  fs.readFile('../resources/pokemons.json', (err, data) => {
    if (err) throw err;
    ownPokemons = JSON.parse(data);
    const found = ownPokemons.pokemons.find((obj) => obj.name === req.params.id)
    res.send(found)
  })
})



app.listen(5000, () => {
  console.log('Server: http://localhost:5000/');
});