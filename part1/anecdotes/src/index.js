import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * 6))
  const [points, setPoints] = useState(new Uint8Array(6))
  var [maxIndex, setMaxIndex] = useState("")

  const newAnecdote = () => {
    setSelected(Math.floor(Math.random() * 6))
  }

  const addVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    setMaxIndex(maxIndex = copy.indexOf(Math.max(...copy)))
  }  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {props.anecdotes[selected]} 
      </div>
      <div>
        this has {points[selected]} votes
      </div>
      <div>
        <button onClick={addVote}>vote</button>
        <button onClick={newAnecdote}>new anecdote</button>
      </div>
      <h1>Anecdote with the most votes</h1>
      <div>
        {props.anecdotes[maxIndex]} 
      </div>
      <div>
        this has {points[selected]} votes
      </div>
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)