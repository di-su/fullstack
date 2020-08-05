import React, { useState } from 'react'
import Result from './Result'


const Filter = ({persons}) => {
    
    const [ filtered, setFilter ] = useState([])

    const filterSearch = (event) => {
        setFilter(persons.filter(x => x.name.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    return (
        <>
            filter shown with
            <input 
                onChange={filterSearch}
            />
            <h2>Numbers</h2>
            <Result filtered={filtered}></Result>
        </>
    )
}

export default Filter
