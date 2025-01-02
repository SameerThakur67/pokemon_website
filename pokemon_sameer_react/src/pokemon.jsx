import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";
import "./index.css";


export const Pokemon =() =>{
const [pokemon, setPokemon]= useState([]);
const [loading, setloading]= useState(true);
const [error, setError]= useState(null);
const [search, setSearch]= useState("");

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


const searchData = pokemon.filter((curPokemon)=>{
 console.log (curPokemon.name.toLowerCase().includes(search.toLowerCase()))
});


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
        <div className="pokemon-search">
            <input type="text" placeholder="search pokemon" value={search} onChange={(e)=>
                {
                    setSearch(e.target.value)
                }}/>
        </div>
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