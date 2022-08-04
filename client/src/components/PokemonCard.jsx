import React from "react";
import styles from "./Styles/PokemonCard.module.css"

//  - Imagen
// - Nombre
// - Tipos (Electrico, Fuego, Agua, etc) types es un arreglo de strings separadas por comas

export default function PokemonCard ({name, types, img}) {
    return (
        <div className={styles.card}>
            <div>
            <img className={styles.img} src= {img} alt="img not found" width="200px" height="250px" />
            </div>
            <div>
            <h3 className={styles.text}>{name.toUpperCase()}</h3>
            <h5 className={styles.text}>{types.map(e => e + " ")}</h5>
            </div>
        </div>
    )
}