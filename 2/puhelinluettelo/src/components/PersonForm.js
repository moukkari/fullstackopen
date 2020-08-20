import React, { useState } from 'react'

const PersonForm = (props) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        if (props.persons.some(person => person.name === newName)) {
            alert(`Error! ${newName} is already in the phonebook`)
        } else {
            props.setPersons(props.persons.concat({name: newName, number: newNumber}))
            props.setFiltered(props.persons.concat({name: newName, number: newNumber}))
        }
    }
    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input onChange={handleNameChange} placeholder="New person..."/>
                <br/>
                number: <input onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    ) 
}

export default PersonForm