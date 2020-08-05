import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Add from './components/Add'
import personService from './services/persons'
import './index.css'
import Notification from './components/Notification'


// 2.20*: Phonebook step12

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ notification, setNotification ] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(personsNotes => {
        setPersons(personsNotes)
      })
  }, [])

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <h2>add a new</h2>
        <Notification notification={notification}/>
        <Add setNotification={setNotification} setPersons={setPersons} persons={persons}></Add>
      </div>
      <div>
        <Filter persons={persons}></Filter>
      </div>
    </div>

  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))