import axios from 'axios';
import { GET_POKEMONS, FILTER_BY_TYPE, CREATED_DB, ORDER_ALPHABETICAL, ORDER_ATTACK, GET_NAMES, GET_TYPES, GET_POKEMON_DETAIL, LOADER_FALSE, LOADER_TRUE } from './constants';

export function getPokemons(){
    return async function(dispatch){
        try{
        const json = await axios.get("http://localhost:3001/pokemons")
        
        dispatch({
            type:GET_POKEMONS,
            payload: json.data
        })
    } catch (error) {
        console.log(error);
    }
}
}

export function filterByTypes(payload){
    return {
        type: FILTER_BY_TYPE,
        payload
    }
}

export function filterByOrigin(payload){
    return {
        type: CREATED_DB,
        payload
    }
}

export function orderAlphabetical(payload){
    return {
        type: ORDER_ALPHABETICAL,
        payload
    }
}

export function orderAttack(payload){
    return {
        type: ORDER_ATTACK,
        payload
    }
}

export function getNamePokemons(name){
    return async function (dispatch){
        try{
            let nameL = name.toLowerCase();
            const json = await axios.get("http://localhost:3001/pokemons?name=" + nameL)
            return dispatch ({
                type: GET_NAMES,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getTypes(){
    return async function (dispatch) {
        var info = await axios.get("http://localhost:3001/types");
        return dispatch({
            type: GET_TYPES,
            payload: info.data
        })
    }
}

export function postPokemon(payload){
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/pokemons", payload);
        return response;
    }
}

export function getDetail (id){
    return async function (dispatch){
        try{
            const res = await axios.get("http://localhost:3001/pokemons/" + id)
            return dispatch({
                type: GET_POKEMON_DETAIL,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function setLoaderTrue() {
    return {
      type: LOADER_TRUE,
    }
  }
  
  export function setLoaderFalse() {
    return {
      type: LOADER_FALSE,
    }
  }
