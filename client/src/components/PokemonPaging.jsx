import React from "react";
import styles from "./Styles/PokemonPaging.module.css"

export default function PokemonPaging ({pokemonPerPage, statePokemons, paging}){
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(statePokemons/pokemonPerPage); i++){
        //Math.ceil redondea todos mis pokemons sobre el Q de pokes que quiero por página
        pageNumbers.push(i+1)
    }

    return(
        <nav>
            <ul className={styles.paging}>
                {pageNumbers.map((number) => {
                    return(
                    <li className={styles.button} key={number}>
                    <button className={styles.button} onClick = { ()=> paging(number) } > {number} </button>
                    </li>
                    )})
                }
            </ul>
        </nav>
    )
}