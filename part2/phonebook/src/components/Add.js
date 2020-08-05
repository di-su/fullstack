import React, { useState } from 'react'
import personService from '../services/persons'
// import '../index.js'

const Add = ({persons, setPersons, setNotification}) => {

    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('') 
  
    const addNumber = (event) => {
      event.preventDefault()
      const numberObject = {
        name: newName,
        number: newNumber
      }

      const personsArray = persons.map(x => x.name)
      const find = personsArray.filter(x => x === newName)
    
      if (find.length > 0) {

        const matchName = persons.filter(x=>x.name===newName)
        const getID = matchName.map(x=>x.id)

        console.log("matchName", matchName)
        console.log("getID", getID)
        
        window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

        personService
        .update(getID, numberObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        .catch(error => {
          setNotification({
            message:`Information of ${numberObject.name} has already been removed from the server`, 
            type:'fail'
          })
  
          setTimeout(() => setNotification(null), 3000);
        })
      } 
      
      else {
        personService
        .create(numberObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })

        setNotification({
          message:`Added ${numberObject.name}`, 
          type:'success'
        })

        setTimeout(() => setNotification(null), 3000);

        // The event handler resets the value of the controlled input element by calling the setNewName function of the newName state
        // setNewName('')
      }
  
    }

    const handleNumberChange = (event) => {
        setNewName(event.target.value)
    }
    
      const handlePhoneNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    
    return (
        <>
        <form onSubmit={addNumber}>
          <div>
            name: 
            <input 
              value={newName}
              onChange={handleNumberChange}
            />
            <br></br>
            number: 
            <input 
              value={newNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>    
        </>
    )
}

export default Add
