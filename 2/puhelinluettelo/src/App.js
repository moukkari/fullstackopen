import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filteredPersons, setFiltered ] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
        setFiltered(response.data)
    })
  }, [])
  
  

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setFiltered={setFiltered} />
      <h3>Add new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setFiltered={setFiltered} />
      <h3>Numbers</h3>
      <Persons data={filteredPersons} />
    </div>
  )

}

export default App