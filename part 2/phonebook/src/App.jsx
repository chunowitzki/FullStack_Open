import { useState, useEffect } from 'react'
import axios from 'axios'
import {nanoid} from 'nanoid'

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

   },[])


  const handleSubmit = (e) => {
    e.preventDefault()
    if(persons.some(person => person.name.toLowerCase() === newName.toLowerCase())){
      alert(`${newName} is already added to phonebook `)
    } else { 
      const newPerson = {
        name: newName,
        id: nanoid()
      }
      axios.post('http://localhost:3001/persons', newPerson)
        .then(res => {
          console.log('Response:', res.data)
          setPersons([...persons, res.data])
          setNewName('')
        })
        .catch(err => console.error('Error:', err))
      
    }
  }

  const filterSubmit = (e) => {
    e.preventDefault
    console.log(e.target.value)
    setFilterSearch(e.target.value)
  }

  const deletePerson = (id) => {
    const findPerson = persons.filter(person => person.id === id)[0]
    console.log(findPerson)
    const name = findPerson.name
    console.log(name)
    if (window.confirm(`Delete ${name}?`)){axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(err => {
        console.error('Failed to delete contact', err)
      })}
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
      {persons.map(person => {
        return (
        <>
        <h2>{person.name}</h2>
        <button onClick={() => deletePerson(person.id)}>delete</button>
        </>
        )
      })}
    </div>
  )
}

export default App