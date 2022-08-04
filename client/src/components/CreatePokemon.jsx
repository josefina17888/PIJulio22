import React from "react";
import { useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes } from '../actions/index';
import styles from "../components/Styles/CreatePoke.module.css"

function validate(input){
    let errors = {};
    if (!input.name){
        errors.name= 'A name is required';
    } else if (input.types.length < 1) {
        errors.types= 'At least one type must be selected'
    }
    return errors;
}

export default function CreatePokemon (){
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state) => state.types);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "", 
        img:"", 
        hp:null, 
        attack:null, 
        defense:null, 
        speed:null, 
        weight:null, 
        height:null,
        types: []
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    //le agrego al input el value de lo que este modificando

    function handleSelect(e){
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })
            setErrors(validate({
                ...input,
                [e.target.types]: e.target.value
            }))
    }
    
    function handleDelete(el){
        setInput({
            ...input,
            types: input.types.filter(e => e !== el)
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        if (input.name && input.types) {
        dispatch(postPokemon(input))
        alert('Pokemon successfully created')
        setInput({
        name: "", 
        img:"", 
        hp: null, 
        attack:null, 
        defense:null, 
        speed:null, 
        weight:null, 
        height:null,
        types: []
        })
        history.push('/home')
        } else {
        setInput({...input})
        alert('Pokemon is missing name/types, complete to create')    
        }
    }

    useEffect(()=>{
        dispatch(getTypes()) 
    }, []);

    return(
        <div className={styles.background}>
            <Link to= '/home'>
            <button className={styles.button1} >Return</button>
            </Link>
            <h1>Create your Pokemon</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.text}>
                    <label>Name: </label>
                    <input type='text'
                    value= {input.name.toLowerCase()}
                    name= 'name'
                    onChange={handleChange}/>
                    {
                        errors.name && (
                            <p className="error">{errors.name}</p>
                        )
                    }
                </div>
                <div className={styles.text}>
                    <label>Types: </label>
                    <select onChange={(e) => handleSelect(e)}>
                        {types.map((e) =>(<option className={styles.types} value= {e.name}>{e.name}</option>))}
                    </select> 
                    <ul className={styles.types}><li>{input.types.map(e => e + ", ")}</li></ul>
                    {
                        errors.types && (
                            <p className="error">{errors.types}</p>
                        )
                    }                
                </div>
                <div className={styles.text}>
                    <label>HP: </label>
                    <input type='number'
                    value= {input.hp}
                    name= 'hp'
                    onChange={handleChange}/>
                </div>
                <div className={styles.text}>
                    <label>Attack: </label>
                    <input type='number'
                    value= {input.attack}
                    name= 'attack'
                    onChange={handleChange}/>
                </div>
                <div className={styles.text}>
                    <label>Defense: </label>
                    <input type='number'
                    value= {input.defense}
                    name= 'defense'
                    onChange={handleChange}/>
                </div>
                <div className={styles.text}>
                    <label>Speed: </label>
                    <input type='number'
                    value= {input.speed}
                    name= 'speed'
                    onChange={handleChange}/>
                </div>
                <div className={styles.text}>
                    <label>Weight: </label>
                    <input type='number'
                    value= {input.weight}
                    name= 'weight'
                    onChange={handleChange}/>
                </div>
                <div className={styles.text}>
                    <label>Height: </label>
                    <input type='number'
                    value= {input.height}
                    name= 'height'
                    onChange={handleChange}/>
                </div>
                <div className={styles.text}>
                    <label>Image: </label>
                    <input type='text'
                    value= {input.img}
                    name= 'img'
                    onChange={handleChange}/>
                </div>
                <div>
                    <button className={styles.button} type='submit'>Create</button>
                </div>
            </form>
            {input.types.map(e =>
                <div>
                    <p>{e}</p>
                    <button className={styles.button2} onClick={()=> handleDelete(e)}>x</button>
                </div>)}
        </div>
    )
}