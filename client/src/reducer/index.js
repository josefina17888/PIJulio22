 const initialState = {
     pokemons: [],
     allPokemons: [],
     names: [],
     types: [],
     details: {},
     pokeLoader: true
 }

 function rootReducer (state = initialState, action){

     switch(action.type){
         case 'GET_POKEMONS':
                return {
                    ...state,
                    pokemons: action.payload,
                    allPokemons: action.payload,
                    names: action.payload,
                    pokeLoader: false
                }

        case 'FILTER_BY_TYPE':
            const allPokemons = state.allPokemons
            const typeFiltered = action.payload === 'all' ? allPokemons
            : allPokemons.filter(e => e.types.includes(action.payload))
            return {
               ...state,
               pokemons: typeFiltered
            }

        case 'CREATED_DB':
            const createdPokemons = state.allPokemons
            const apiPokes = createdPokemons.filter(e => typeof e.id === 'number')
            const createdPokes = createdPokemons.filter(e => typeof e.id !== 'number')
            const originFiltered = action.payload === 'created' ? createdPokes : apiPokes
            return {
                ...state,
                pokemons: action.payload === 'all' ? createdPokemons : originFiltered
            }

        case 'ORDER_ALPHABETICAL':

            let sortedPokes = action.payload === 'asc' ?
                state.pokemons.sort(function (a,b){
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1
                    }
                    return 0
                })
            :  
                state.pokemons.sort(function (a,b){
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return - 1
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                pokemons: sortedPokes
            }

        case 'ORDER_ATTACK':
           
            let sortedPokesAttack = action.payload === 'lowest' ? 
            state.pokemons.sort(function (a, b){
                if (a.attack > b.attack) {
                    return 1
                }
                if (b.attack > a.attack) {
                    return -1
                }
                return 0
            })  
            : state.pokemons.sort(function (a, b){
                if (a.attack > b.attack) {
                    return -1
                }
                if (b.attack > a.attack) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                pokemons: sortedPokesAttack
            }

        case 'GET_NAMES':
            const names = state.names
            const nameFiltered = names.filter(e => e.name === action.payload.name)
            return {
                ...state,
                pokemons: nameFiltered,
                pokeLoader: false
            }

            case 'POST_POKEMON':
                return {
                    ...state
                }

            case 'GET_TYPES':
                return{
                    ...state,
                    types: action.payload
                }

            case 'GET_POKEMON_DETAIL':
                return {
                    ...state,
                    detail: action.payload
                }
            
            case 'LOADER_TRUE': 
                return {
                  ...state,
                  pokeLoader: true,
                };
              
              
            case 'LOADER_FALSE': 
                return {
                  ...state,
                  pokeLoader: false,
                };
            

        default: 
        return state;
     }
 }

 export default rootReducer;