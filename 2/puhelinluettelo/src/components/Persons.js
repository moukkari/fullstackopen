import React, {useState} from 'react'
import srv from '../services/phoneService'
import Notification from './Notification'

const Persons = (props) => {
    const [ message, setMessage ] = useState('')

    const handleRemoveClick = (person) => {
        const answer = window.confirm(`Do you really want to delete ${person.name}`)
        if (answer) {
            srv.remove(person.id).then((status) => {
                if (status === 200) {
                    props.setAllPersons(props.data.filter(x => x !== person))
                    setMessage(`Deleted ${person.name}`)
                    setTimeout(() => setMessage(null), 5000)
                } else {
                    props.setAllPersons(props.data.filter(x => x !== person))
                    setMessage(`${person.name} has already been deleted`)
                    setTimeout(() => setMessage(null), 5000)
                }
            })
        }
    }

    let data = props.data.map(person =>
        <p key={person.name}>
            {person.name} - {person.number} 
            <button onClick={() => handleRemoveClick(person)}>remove</button>
        </p>
    )
    return (
        <div>
            <Notification msg={message} error={true} />
            {data}
        </div>  
    )
}

export default Persons