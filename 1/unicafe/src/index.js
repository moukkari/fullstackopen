import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <h1>{props.txt}</h1>

const Nappula = (props) => <button onClick={() => {props.handleClick()}}>{props.txt}</button>

const Value = (props) => <tr><td>{props.txt}</td><td>{props.value}</td></tr>

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  if (all === 0) {
    return <p>No feedback given</p>
  }
  return (
    <div>
      <Header txt="statistics" />
      <table>
        <tbody>
          <Value txt="good" value={props.good} />
          <Value txt="neutral" value={props.neutral} />
          <Value txt="bad" value={props.bad} />
          <Value txt="all" value={all} />
          <Value txt="average" value={((props.good - props.bad)) / (all)} />
          <Value txt="positive" value={(props.good / (all)) + " %"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header txt="give feedback" />
      <Nappula txt="good" handleClick={() => setGood(good + 1) } />
      <Nappula txt="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Nappula txt="bad" handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)