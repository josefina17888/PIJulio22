const { Router } = require('express');
const { Sequelize, Op } = require('sequelize');
// Importar todos los routers;
const axios = require ('axios');
const { Pokemon, Types, pokemon_types } = require ('../db');
const router = Router();
const { pokemonApi } = require('./controllers/pokemonApi.js');
const { allPokemon } = require('./controllers/allPokemon.js')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// ------------ GET pokemons y pokemons?name="..." --------------------
//- Debe devolver solo los datos necesarios para la ruta principal CHEQUEAR!!

 router.get('/pokemons', async (req, res) => {
         const name = req.query.name;
         if(name){
             try {
             let apiPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
             let pokemonName = apiPoke.data;
             var pokeFound = {
                 name: pokemonName.name.toLowerCase(),
                 id: pokemonName.id,
                 img: pokemonName.sprites.other.dream_world.front_default,
                 types: pokemonName.types.map(e => e.type.name),
                 height: pokemonName.height,
                 weight: pokemonName.weight,
                 hp: pokemonName.stats[0].base_stat,
                 attack: pokemonName.stats[1].base_stat,
                 defense: pokemonName.stats[2].base_stat,
                 speed: pokemonName.stats[5].base_stat
             } 
             console.log(pokeFound);
             return res.status(200).send(pokeFound)
             } catch (error) {
                 const pokemonDataBase = await Pokemon.findOne({
                     where:{
                         name: name
                     }})
                 if(!pokemonDataBase) return res.status(404).send(`No se encuentra el pokemon ${name}`)
                 else {
                     var pokemonDbFound ={
                         name : pokemonDataBase.name.toLowerCase(),
                         id: pokemonDataBase.id,
                         img: pokemonDataBase.img,
                         types: pokemonDataBase.types,
                         height: pokemonDataBase.height,
                         weight: pokemonDataBase.weight,
                         hp: pokemonDataBase.hp,
                         attack: pokemonDataBase.attack,
                         defense: pokemonDataBase.defense,
                         speed: pokemonDataBase.speed
                     } 
                     return res.status(200).send(pokemonDbFound);
                 }
                 }
             } else {
                     try {
                         let pokemonTotal = await allPokemon();
                         res.status(200).send(pokemonTotal);
                         } catch (error) {
                             res.status(404).send('Ocurrió un error')
                             }
                 }
 });

// ------------ GET {idPokemon} --------------------
//  - Obtener el detalle de un pokemon en particular
//  - Debe traer solo los datos pedidos en la ruta de detalle de pokemon CHEQUEAR!
//  - Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes
router.get('/pokemons/:id', async (req, res) => {
    const id = req.params.id;
    const pokemonsTotal = await allPokemon();
    if (id) {
        let pokeId = await pokemonsTotal.filter(e => e.id == id)
        if (pokeId.length>0) {
            res.status(200).send(pokeId)
            //acá quise usar .json y no funcionó, será que tenía que importarme algo? rechequear clases martina modulo 3?
        } else {
            res.status(404).send('No se encuentra el pokemon')
        }
    }
});

/*[ ] __GET /types__:
  - Obtener todos los tipos de pokemons posibles
  - En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí*/
  router.get('/types', async (req, res) => {
    const pokemonsApi = await axios.get('https://pokeapi.co/api/v2/type');
    const pokeTypes = pokemonsApi.data.results.map(e => e.name);
    console.log(pokeTypes)
     pokeTypes.forEach(e => {
        Types.findOrCreate({
            where: {name: e}
        })
     })
    const allTypes = await Types.findAll();
    res.send(allTypes);
  });

/*- [ ] __POST /pokemons__:
- Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
- Crea un pokemon en la base de datos relacionado con sus tipos.*/
   router.post('/pokemons', async (req, res) => {
    let {
        name, 
        id, 
        img, 
        types, 
        hp, 
        attack, 
        defense, 
        speed, 
        weight, 
        height
    } = req.body;

    let newPoke = await Pokemon.create({
        name, 
        id,
        img, 
        hp, 
        attack, 
        defense, 
        speed, 
        weight, 
        height
    })

    let typesDb = await Types.findAll({
        where: {name: types}
    })
    newPoke.addTypes(typesDb)
    res.send('Pokemon creado exitosamente')
   })



module.exports = router;


