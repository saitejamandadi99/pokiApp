import {useState, useEffect} from 'react'
import './index.css'

const apiStatus = {
    initial: 'INITIAL', 
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE'
}

const PokemonItem = (props) =>{

    const {details} = props
    const {name, url} = details
    const [pokemonItem, setPokemonItem] = useState({status:apiStatus.initial, data:[], errorMsg:null})

    useEffect(()=>{
        const fetchPokemonDetails = async () =>{
            setPokemonItem({status:apiStatus.inProgress, data:[], errorMsg:null})
            const response = await fetch(url)
            const data = await response.json()
            if(response.ok){
                setPokemonItem({status:apiStatus.success, data:data, errorMsg:null})
                console.log(data)
            }
            else{
                setPokemonItem({status:apiStatus.failure, data:data, errorMsg:response.statusText})
            }
        }
        fetchPokemonDetails()
    },[])

    const {id, species , sprites, types } = pokemonItem.data 

    return(
        <li>
            {id}
            {species && species.name && <p>{species.name}</p>}   
            {sprites && sprites.front_default && <img src={sprites.front_default} alt={name} />}    
            {types && types.map((type) => (
                <p key={type.type.name}>{type.type.name}</p>
            ))}
            {pokemonItem.status === apiStatus.inProgress && <p>Loading...</p>}
        </li>   
        
    )


}
export default PokemonItem; 