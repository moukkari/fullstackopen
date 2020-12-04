import React from 'react'

const Filter = (props) => {
    const handleFilter = (event) => {
        props.setFiltered(props.persons.filter(
            person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
    }
    return (
    <form>
        filter <input onChange={handleFilter} />
    </form> 
    )
}

export default Filter