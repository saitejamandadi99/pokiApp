import { useState, useEffect } from 'react'    
import './index.css'
const apiStatus = {
    initial: 'INITIAL',
    inProgess: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'Failure'
}
const Pokemon = () =>{
    const [pokemon , setPokemon] = useState({status:apiStatus.initial, data:[], errorMsg:null})
    useEffect(() => {
        const fetchPokemon = async () =>{
            setPokemon({status:apiStatus.inProgess, data:[], errorMsg:null})
            const url = "https://pokeapi.co/api/v2/ability/?limit=150&offset=0"
            const response = await fetch(url)
            const data = await response.json()
            if(response.ok){
                setPokemon({status:apiStatus.success, data: data, errorMsg: null})
                console.log(data)
            }
            else{
                setPokemon({status:apiStatus.failure, data:data, errorMsg: response.statusText})
            }
        }
        fetchPokemon()
    },[])
    

    return(
        <div>
            <p>pokemon</p>
            
        </div>
    )
}

export default Pokemon;