import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.click}>{props.label}</button>
  )
}

const Statistics = (props) => {
  return(
    <table>
      <tbody>
        <Statistic label="good" value ={props.value[0]} />
        <Statistic label="neutral" value ={props.value[1]} />
        <Statistic label="bad" value ={props.value[2]} />
        <Statistic label="all" value ={props.value[0] + props.value[1] + props.value[2]}></Statistic>
        <Statistic label="average" value ={props.value[3]}></Statistic>
        <Statistic label="positive" value ={props.value[4]}></Statistic>
      </tbody>
    </table>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.label}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const positive = ((good / (good + neutral + bad)) * 100) + " %" 
  const [allClicks, setAll] = useState([])
  const avg = allClicks.reduce((a, b) => a + b, 0) / allClicks.length

  const goodClick = () => {
    setAll(allClicks.concat(1))
    setGood(good + 1)
  }

  const neutralClick = () => {
    setAll(allClicks.concat(0))
    setNeutral(neutral + 1)
  }

  const badClick = () => {
    setAll(allClicks.concat(-1))
    setBad(bad + 1)
  }

  if (allClicks.length === 0) {
    return (
      <div>
        <h1>give feedback</h1>
        <Button click={goodClick} label="good"></Button>
        <Button click={neutralClick} label="neutral"></Button>
        <Button click={badClick} label="bad"></Button>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button click={goodClick} label="good"></Button>
      <Button click={neutralClick} label="neutral"></Button>
      <Button click={badClick} label="bad"></Button>
      <h1>statistics</h1>
      <Statistics value={[good, neutral, bad, avg, positive]}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

