 import React from "react";
 import { Link } from "react-router-dom";
 import styles from "./Styles/Landing.module.css"

 export default function Landing(){
     return(
         <div className={styles.Landing}>
            <div>
            <div className={styles.div}>
             <img className={styles.title} src={"https://www.freepnglogos.com/uploads/black-pokemon-logo-transparent-27.png"} alt="Pokemon"/>
             <Link to = '/home'>
                 <button className={styles.button}>Enter</button>
             </Link>
             </div>
             </div>
         </div>
     ) 
 }