import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  function handleClick(e){
    if(e.target.id === 'good'){
      setGood(prev => prev + 1)
    }

    if(e.target.id === 'neutral'){
      setNeutral(prev => prev + 1)
    }

    if(e.target.id === 'bad'){
      setBad(prev => prev + 1)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button id='good'onClick={handleClick}>good</button>
      <button id='neutral'onClick={handleClick}>neutral</button>
      <button id='bad'onClick={handleClick}>bad</button>
      <h1>statistics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
    </div>
  )
}

export default App