import React from "react";
import ReactDOM  from "react";
// import Nav from "./components/navbar/navbar";
import PokemonDetails from './components/PokemonDetails/pokeapi';
import PokemonList from "./components/PokemonList/pokelist";

function App(){
    return(
        <>
            <h2>testando api 🤔</h2>

            <PokemonDetails/> 

            <PokemonList/> 

        </>
    );
}
export default App;