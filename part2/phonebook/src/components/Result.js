import React from 'react'
import axios from 'axios'

 
const DeleteButton = (props) => {

    const deletePerson = () => {

        if (window.confirm(`Delete ${props.name}?`)) { 
            const request = axios.delete(`http://localhost:3001/persons/${props.id}`)
            console.log(`deleted ${props.id}`)
            return request.then(response => response.data)
        }
        
    }

    return (
        <button onClick={deletePerson}>delete</button>
    )
}
  
const Result = ({filtered}) => {

    return (
        <>
            <div>{filtered.map(x => <p key={x.name}>{x.name} {x.number}<DeleteButton name={x.name} id={x.id}></DeleteButton></p>)}</div>
        </>
    )
}

export default Result
