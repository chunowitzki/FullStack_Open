import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([ ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=> {
    axios.get('http://localhost:3001/persons')
      .then(res => {
        console.log(res.data)
        setPersons(res.data)
      })
      
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(newName)

    const newPerson = {
      name: newName
    }

    persons.some(person => person.name === newName) ? alert("name already exists") : setPersons(persons.concat(newPerson))
    
    setNewName('')
  }

  const handleValue = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }

  const handleNumber = (e) => {
      console.log(e.target.value)
      setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const filteredPeople = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>

      <h2>Phonebook</h2>
      filter shown with : <input value={filter} onChange={handleFilter} />
      <h2>Add a new </h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleValue} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPeople.map(p => (
        <li key={p.id ?? p.name}>{p.name} {p.number}</li>
      ))}
    </div>
  )
}

export default App