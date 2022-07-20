const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const { Pokemon, Types, pokemon_types } = require ('../../db');
const { pokemonApi } = require('./pokemonApi.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const pokemonDb = async () => {
    return await Pokemon.findAll({
        include: {
            model: Types,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
};

const allPokemon = async () => {
    const bringApiPokemon = await pokemonApi();
    const dbPokemon = await pokemonDb();
    const totalPokemon = bringApiPokemon.concat(dbPokemon);
    return totalPokemon
}

module.exports = {
    pokemonDb,
    allPokemon
  }