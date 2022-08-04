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
    const dbPokemonCorrect = dbPokemon.map(e => {
        return {
            name: e.name,
            id: e.id,
            img: e.img,
            hp: e.hp,
            attack: e.attack,
            defense: e.defense,
            weight: e.weight,
            height: e.height,
            speed: e.speed,
            createdInDb: e.createdInDb,
            types: e.types.map(e => e.name)
        }
    })
    const totalPokemon = bringApiPokemon.concat(dbPokemonCorrect);
    return totalPokemon
}

module.exports = {
    pokemonDb,
    allPokemon
  }