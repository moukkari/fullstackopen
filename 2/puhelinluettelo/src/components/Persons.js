import React from 'react'
import srv from '../services/phoneService'

const Persons = (props) => {

    const handleRemoveClick = (person) => {
        const answer = window.confirm(`Do you really want to delete ${person.name}`)
        if (answer) {
            srv.remove(person.id)
            props.setAllPersons(props.data.filter(x => x !== person))
        }
    }

    let data = props.data.map(person =>
        <p key={person.name}>
            {person.name} - {person.number} 
            <button onClick={() => handleRemoveClick(person)}>remove</button>
        </p>
    )
    return <div>{data}</div>  
}

export default Persons