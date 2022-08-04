 import React from 'react';
 import { useState, useEffect } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { getPokemons, filterByTypes, filterByOrigin, orderAlphabetical, orderAttack, getNamePokemons } from '../actions/index';
 import { Link } from 'react-router-dom';
 import PokemonPaging from './PokemonPaging';
 import PokemonCard from "./PokemonCard";
 import s from './Styles/Home.module.css'
 import styles from "./Styles/PokemonCard.module.css"

 export default function Home (){
    let statePokemons = useSelector((state) => state.pokemons);
     const dispatch = useDispatch();
     const [currentPage, setCurrentPage] = useState(1);// guardar en estado local la página actual
     const [pokemonPerPage, setPokemonPerPage] = useState(12);// setear el 12 la cantidad de pokemon por página.
     const [order, setOrder] = useState('')
     const [name, setName] = useState('')
     const indexLastPokemon = currentPage * pokemonPerPage;
     const indexFirstPokemon = indexLastPokemon - pokemonPerPage;
     const currentPokemon = statePokemons.slice(indexFirstPokemon, indexLastPokemon);
     const pokeLoader = useSelector((state) => state.pokeLoader);
     
     const paging = (pageNumber) => {
         setCurrentPage(pageNumber)
     }
    
     useEffect(() => {
      dispatch(getPokemons());
      }, [dispatch]) 

//reload
     function handleClick(e){
         e.preventDefault();
         dispatch(getPokemons());
         setCurrentPage(1)
     }
//filter type
     function handleFilterType(e){
        dispatch(filterByTypes(e.target.value))
        paging(1);
     }
//filter origin
     function handleFilterOrigin(e){
        dispatch(filterByOrigin(e.target.value))
        paging(1);  //toma el valor clickeado
     }
//order name
     function handleOrderAlphabetical (e){
        e.preventDefault();
        dispatch(orderAlphabetical(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
     }
//order arrack
     function handleOrderAttack (e){
        e.preventDefault();
        dispatch(orderAttack(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
     }
//search name
     function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNamePokemons(name));
        setName('');
        setCurrentPage(1); 
    }
     
    return(
        <div className={s.home}>
            <div className={s.create}>
                <div>
                <img src ={"https://media.pocketmonsters.net/pages/524/logo.png"} alt="Pokemon Page"/>
                </div>
                <div>
                <Link to = '/pokemons'>Create Pokemon</Link>
                </div>
                <div>
                <button className={s.reload} onClick={e => {handleClick(e)}}>Reload Pokemons</button>
                <div>
                <input type= 'text' placeholder= 'Search by name...' onChange= {(e) => handleInputChange(e)}/>
                <button type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
                </div>
                </div>
            </div>
        <div>
            <div className={s.order}>
                <div className={s.orders}>
                <h3>Show by Name</h3>
                <select onClick={e => handleOrderAlphabetical(e)}>
                <option value= 'asc'>A to Z</option>
                <option value= 'desc'>Z to A</option>
                </select>
                </div>
                <div className={s.orders}>
                <h3>Show by Attack</h3>
                <select onClick={e => handleOrderAttack(e)}>
                    <option value= 'lowest'>Bottom Up</option>
                <option value= 'highest'>Top Down</option>
                </select>
                </div>
            </div>
            <div>
            <h3>Filter by Types or Origin</h3>  
            <select onChange={e => handleFilterType(e)}>
                     <option value= 'all'>All</option>
                     <option value= 'flying'>Flying</option>
                     <option value= 'rock'>Rock</option>
                     <option value= 'water'>Water</option>
                     <option value= 'dragon'>Dragon</option>
                     <option value= 'fighting'>Fighting</option>
                     <option value= 'steel'>Steel</option>
                     <option value= 'psychic'>Psychic</option>
                     <option value= 'poison'>Poison</option>
                     <option value= 'fire'>Fire</option>
                     <option value= 'ice'>Ice</option>
                     <option value= 'normal'>Normal</option>
                     <option value= 'bug'>Bug</option>
                     <option value= 'electric'>Electric</option>
                     <option value= 'fairy'>Fairy</option>
                     <option value= 'ground'>Ground</option>
                     <option value= 'ghost'>Ghost</option>
                     <option value= 'grass'>Grass</option>
            </select>
            <select onChange={e => handleFilterOrigin(e)}>
            <option value= 'all'>All</option>
            <option value= 'api'>Existent</option>
            <option value= 'created'>Created</option>
            </select>
            </div>
        <div>
            <div className={s.paging}>
            { !pokeLoader ? <PokemonPaging
            pokemonPerPage= {pokemonPerPage}
            statePokemons={statePokemons.length}
            paging = {paging} /> : null}
            </div>
            <div className={styles.flex}>
            { pokeLoader ? (
                <h2>Loading...</h2>) : 
            currentPokemon.length < 1 ?
                <h2>No pokemons were found</h2> 
            : currentPokemon.map((e) => {
                return (
                <div key={e.id}>
                    <Link to={`/pokemons/${e.id}`}>
                        <PokemonCard
                            name={e.name}
                            types={e.types.map(e => e + " ")}
                            img={e.img}/>
                    </Link>
                </div>)})
            }
            </div>
        </div>
        </div>
    </div>
    )
 }

 //{!e.createdInDb? e.types.map(e => e + " ") : e.types.map(e => e.name + (" "))}