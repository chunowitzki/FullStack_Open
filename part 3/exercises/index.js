const express = require('express')
const app = express()

app.use(express.json())


let data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(data)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = data.find(person => person.id === id)
    console.log(id)
    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})
app.delete('/api/persons/:id' , (req, res) => {
    const id = req.params.id
    const exists = data.some(person => person.id === id)

    if(!exists){
        return res.status(404)
    }

    data = data.filter(person => person.id !== id)
    res.status(204).end
})

app.post('/api/persons', (req, res)=> {
    const { name, number } = req.body

    if(!name || !number) {
        return res.status(404)
    }

    const nameExists = data.some(person => person.name === name)
    if(nameExists){
        return res.status(409).json({error: 'name must be unique'})
    }

    const newPerson = {
        id: (Date.now().toString()),
        name,
        number
    }

    data = data.concat(newPerson)
    res.status(201).json(newPerson)
})

app.get('/info', (req, res) => {
    const timeStamp = Date.now()

    res.send(
        `<h1>Phonebook has info for ${data.length} people</h1>`
    )
})



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


