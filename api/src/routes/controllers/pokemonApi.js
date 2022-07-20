const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const { Pokemon, Types, pokemon_types } = require ('../../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const pokemonApi = async () => { 
const apiPokemon1 = await axios.get('https://pokeapi.co/api/v2/pokemon');
const apiPokemon2 = await axios.get(apiPokemon1.data.next);
const apiPokemonTotal = apiPokemon1.data.results.concat(apiPokemon2.data.results);

try {
    const pokemonUrl = apiPokemonTotal.map (e => axios.get(e.url))
    let pokemonInfo = Promise.all(pokemonUrl)
    .then(e => {
        let pokemonVal = e.map(e => e.data)
        let pokemonData = [];
        pokemonVal.map(e => {
            pokemonData.push(
                {
                    id: e.id,
                    name: e.name,
                    hp: e.stats[0].base_stat,
                    attack: e.stats[1].base_stat,
                    defense: e.stats[2].base_stat,
                    speed: e.stats[5].base_stat,
                    height: e.height,
                    weight: e.weight,
                    types: e.types.map(e => e.type.name),
                    img: e.sprites.other.dream_world.front_default
                }
            )
        })
        return pokemonData;
    })
    return pokemonInfo;
} catch (error) {
    console.log(error)
}
}

module.exports = {pokemonApi}