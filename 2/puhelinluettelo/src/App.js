import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import srv from './services/phoneService'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filteredPersons, setFiltered ] = useState([])

  const setAllPersons = (newPersonList) => {
    setPersons(newPersonList)
    setFiltered(newPersonList)
  }

  useEffect(() => {
    srv.getAll().then(initialPhoneBook => {
      setAllPersons(initialPhoneBook)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setFiltered={setFiltered} />
      <h3>Add new</h3>
      <PersonForm persons={persons} setAllPersons={setAllPersons} />
      <h3>Numbers</h3>
      <Persons data={filteredPersons} setAllPersons={setAllPersons} />
    </div>
  )

}

export default App