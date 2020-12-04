import React, { useState } from 'react'
import srv from '../services/phoneService'
import Notification from './Notification'

const PersonForm = (props) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ message, setMessage ] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        if (props.persons.some(person => person.name === newName)) {
            const answer = window.confirm(`${newName} is already in the phonebook. Replace the old number with a new one?`)
            if (answer) {
                let person = props.persons.find(x => x.name === newName)
                person.number = newNumber
                srv.update(person.id, person)
                    .then(r => srv.getAll().then(r => {
                        props.setAllPersons(r)
                        setMessage(`Updated ${person.name}`)
                        setTimeout(() => setMessage(null), 5000)
                }))        
            }
        } else {
            let newObj = {name: newName, number: newNumber}
            srv.add(newObj).then(r =>  {
                props.setAllPersons(props.persons.concat(r))
                setMessage(`Added ${r.name}`)
                setTimeout(() => setMessage(null), 5000)
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
                <Notification msg={message} error={false} />
            </div>
        </form>
    ) 
}

export default PersonForm