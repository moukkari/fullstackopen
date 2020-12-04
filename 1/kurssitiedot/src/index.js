import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => {
return <p>{props.data.name} {props.data.exercises}</p>
}

const Content = (props) => {
  return (
    <div>
      <Part data={props.data[0]} />
      <Part data={props.data[1]} />
      <Part data={props.data[2]} />
    </div>
  )
}

const Total = (props) => {
  const total = props.data[0].exercises + props.data[1].exercises + props.data[2].exercises
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content data={course.parts} />
      <Total data={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))