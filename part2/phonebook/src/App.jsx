import { useEffect, useState } from 'react'
import axios from 'axios'
import getAll from './backend'

const App = () => {

  const [persons, setPersons] = useState([ ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=> {
    // axios.get('http://localhost:3001/persons')
      getAll()
      .then(res => {
        console.log(res.data)
        setPersons(res.data)
      })
      
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(newName)

    const newPerson = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString()
    }

    persons.some(person => person.name === newName) ? alert("name already exists") 
    : axios.post('http://localhost:3001/persons', newPerson)
    .then(response => {
      console.log('Added person:', response.data);
    })
    .catch(error => {
      console.error('Error adding person:', error);
    });
    
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
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

  const deleteNumber = (id) => {
    const foundId = persons.find(person => person.id === id )
    console.log(foundId)
    axios.delete(`http://localhost:3001/persons/${foundId.id}`)
    .then(response => {
      console.log('Deleted successfully');
    })
    .catch(error => {
      console.error('Error deleting person:', error);
    });

    setPersons(prev => prev.filter(p => p.id !== id))


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
        <li key={p.id ?? p.name}>{p.name} {p.number} <button onClick={()=> deleteNumber(p.id)}>delete</button></li>
        
      ))}
    </div>
  )
}

export default App