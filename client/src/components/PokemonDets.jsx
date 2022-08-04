import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../actions";
import styles from "../components/Styles/PokemonDets.module.css"

// - [ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
// - [ ] Número de Pokemon (id)
// - [ ] Estadísticas (vida, ataque, defensa, velocidad)
// - [ ] Altura y peso

export default function PokemonDets(props){
    console.log(props)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    const myPokemon = useSelector((state) => state.detail)

    return(
        <div className={styles.background}>
            {
                myPokemon === undefined ?
                    <p>Loading...</p>
                :
                <div>
                    <div className={styles.name}>
                    <h1 className={styles.name}>{myPokemon[0].name.toUpperCase()}</h1>
                    </div>
                    <div className={styles.id}>
                    <h3 className={styles.id}>Id: {myPokemon[0].id}</h3>
                    </div>
                    <div className={styles.image}>
                    <img src={myPokemon[0].img} alt='img not found'/>
                    </div>
                    <div className={styles.types}>
                    <h2 className={styles.types}>Types: {!myPokemon[0].createdInDb? myPokemon[0].types.map(e => e + " ") : myPokemon[0].types.map(e => e.name + (" "))}</h2>
                    </div>
                    <div>
                    <h2 className={styles.stats}>Stats</h2>
                    <h4 className={styles.stats}>Health Points: {myPokemon[0].hp}</h4>
                    <h4 className={styles.stats}>Attack: {myPokemon[0].attack}</h4>
                    <h4 className={styles.stats}>Defense: {myPokemon[0].defense}</h4>
                    <h4 className={styles.stats1}>Speed: {myPokemon[0].speed}</h4>
                    <h4 className={styles.stats1}>Weight: {myPokemon[0].weight}</h4>
                    <h4 className={styles.stats1}>Height: {myPokemon[0].height}</h4>
                    </div>
                </div> 
            } 
            <Link to= '/home'>
                <button className={styles.button}>Return</button>
            </Link>
        </div>
    )

}