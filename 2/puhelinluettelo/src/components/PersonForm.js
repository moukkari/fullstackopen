import React, { useState } from 'react'
import srv from '../services/phoneService'

const PersonForm = (props) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        if (props.persons.some(person => person.name === newName)) {
            const answer = window.confirm(`${newName} is already in the phonebook. Replace the old number with a new one?`)
            if (answer) {
                let person = props.persons.find(x => x.name === newName)
                person.number = newNumber
                srv.update(person.id, person)
                    .then(r => srv.getAll().then(r => props.setAllPersons(r)))        
            }
        } else {
            let newObj = {name: newName, number: newNumber}
            srv.add(newObj).then(r =>  {
                newObj = r
                props.setAllPersons(props.persons.concat(newObj))
            })
            
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