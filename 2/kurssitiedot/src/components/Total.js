import React from 'react'

const Total = ({data}) => {
    const total = data.reduce((a, b) => a + b.exercises, 0)
    return <p><strong>total of {total} exercises</strong></p>
}

export default Total