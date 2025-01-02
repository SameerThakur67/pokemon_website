import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";
import "./index.css";


export const Pokemon =() =>{
const [pokemon, setPokemon]= useState([]);
const [loading, setloading]= useState(true);
const [error, setError]= useState(null);

    const API=" https://pokeapi.co/api/v2/pokemon?limit=124";

    const fetchPokemon = async()=>{
        try{
        const res= await fetch(API);
        const data = await res.json();

        const detailedPokemonData = data.results.map(async(curPokemon)=>{
           const res = await fetch (curPokemon.url);
           const data = await res.json();
           return data;
        })

const detailedResponses = await Promise.all(detailedPokemonData);
setPokemon(detailedResponses);
setloading(false);


    }catch(error)
    {
        console.log(error);
        setloading(false);
        setError(error);

    }
}

useEffect(()=>{

    fetchPokemon();
},[]);

if(loading){
    return (<div>
        <h1>
            loading is in process plzz wait..........
        </h1>
    </div>);
}

    return(
    <>
    <section  className="container">
        <header>
        <h1>
       LETS CATCH POKEMON
    </h1>
        </header>
        <div>
            <ul className="cards">
                {
                    pokemon.map((curPokemon)=>{
                        return <PokemonCards key={curPokemon.id}  pokemonData={curPokemon}/>;
                    })
                }
            </ul>
        </div>
    </section>
   
    </>
    
);

}