import { useState, useEffect } from 'react'   
import PokemonItem from '../PokemonItem' 
import './index.css'
const apiStatus = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'Failure'
}
const Pokemon = () =>{
    const [pokemon , setPokemon] = useState({status:apiStatus.initial, pokemonList:[], errorMsg:null})
    useEffect(() => {
        const fetchPokemon = async () =>{
            setPokemon({status:apiStatus.inProgess, pokemonList:[], errorMsg:null})
            const url = 'https://pokeapi.co/api/v2/pokemon?limit=150'
            const response = await fetch(url)
            const data = await response.json()
            if(response.ok){
                setPokemon({status:apiStatus.success, pokemonList: data.results, errorMsg: null})
                console.log(data.results)
            }
            else{
                setPokemon({status:apiStatus.failure, pokemonList:[], errorMsg: response.statusText})
            }
        }
        fetchPokemon()
    },[])

    const {status, pokemonList, errorMsg} = pokemon
    

    return(
        <div>
            <p>pokemon</p>
            <ul>
            {pokemonList.map((item) =>(
                <PokemonItem key={item.name} details ={item}/>
            ))}
            </ul>
            
            
            
        </div>
    )
}

export default Pokemon;