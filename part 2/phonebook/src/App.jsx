import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [filterSearch, setFilterSearch] = useState('')
  const addName = (e) => {
    setNewName(e.target.value)
  }

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