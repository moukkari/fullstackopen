import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({courses}) => {
    let data = courses.map(element => 
        <div key={element.id}>
            <Header course={element.name} />
            <Content data={element.parts} />
            <Total data={element.parts} />
        </div>
    )
    return (
        <div>
            {data}
        </div>
    )
}

export default Course