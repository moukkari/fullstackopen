import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({txt}) => <h1>{txt}</h1>

const MostVotes = (props) => {
  let mostVotes = 0
  let mostVoted = 0
  for (let x = 0; x < props.votes.length; x++) {
    if (props.votes[x] > mostVotes) {
      mostVotes = props.votes[x]
      mostVoted = x
    }
  }
  return (
    <div>
      <Header txt="Anecdote with most votes" />
      {props.anecdotes[mostVoted]}<br/>
      has {mostVotes} votes
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
  const randomAnecdote = () => setSelected(Math.floor(Math.random() * props.anecdotes.length))

  return (
    <div>
      <Header txt="Anecdote of the day" />
      {props.anecdotes[selected]}<br/>
      has {votes[selected]} votes <br/>
      <button onClick={() => {
        let tmp = votes
        tmp[selected]++
        setVotes(tmp)
      }}>vote</button>
      <button onClick={() => randomAnecdote()}>next anecdote</button>
      <MostVotes votes={votes} anecdotes={props.anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)