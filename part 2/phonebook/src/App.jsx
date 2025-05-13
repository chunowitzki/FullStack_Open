import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [filterSearch, setFilterSearch] = useState('')
  const addName = (e) => {
    setNewName(e.target.value)
  }

   useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(res => setPersons(res.data))
      .catch(err => console.error('Error:', err))

   })


  const handleSubmit = (e) => {
    e.preventDefault()
    if(persons.some(person => person.name.toLowerCase() === newName.toLowerCase())){
      alert(`${newName} is already added to phonebook `)
    } else { 
      setPersons([...persons, {name: newName} ])
    }
  }

  const filterSubmit = (e) => {
    e.preventDefault
    console.log(e.target.value)
    setFilterSearch(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filterSearch} type="text" onChange={filterSubmit}/>
    {persons.some(person => person.name.toLowerCase() === filterSearch.toLowerCase()) ? filterSearch : ''}
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName}  onChange={addName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <h2>{person.name}</h2>)}
    </div>
  )
}

export default App