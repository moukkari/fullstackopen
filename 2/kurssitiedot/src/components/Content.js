import React from 'react'
import Part from './Part'

const Content = ({data}) => {
    const result = data.map(course => 
        <Part key={course.id} data={course}/>  
    )
    return (
      <div>
        {result}
      </div>
    )
  }

export default Content