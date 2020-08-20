import React from 'react'

const Persons = (props) => {
    let data = props.data.map(person =>
        <p key={person.name}>{person.name} - {person.number}</p>
    )
    return <div>{data}</div>  
}

export default Persons