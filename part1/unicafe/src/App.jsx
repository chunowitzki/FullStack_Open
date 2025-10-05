import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  return (
    <>
       <h1>statistics</h1>
       {good + neutral + bad == 0 ? 'No feedback given' : <div>
          <p>good: {good}</p>
          <p>neutral: {neutral}</p>
          <p>bad: {bad}</p>
          <p>all: {good + neutral + bad}</p>
          <p>average: {(good + neutral + bad)/ 3}</p>
          <p>positive: {good + neutral / 3}</p>

       </div>}
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (props) => {
    const holder = props
    if (holder == 'good'){
      setGood(good + 1)
    } else if (holder == 'neutral'){
      setNeutral(neutral + 1)

    } else if( holder == 'bad') {
      setBad(bad + 1)
    }
  }
  return (
    <>
      <h1>give Feedback</h1>
      <Button text='good' handleClick={() => handleClick('good')}/>
      <Button text="neutral" handleClick={() => handleClick('neutral')}/>
      <Button text='bad' handleClick={() => handleClick('bad')}/>

    <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App