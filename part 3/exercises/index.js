const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

let phoneBook = [
    { 
      id: "1",
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: "2",
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: "3",
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: "4",
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Welcome</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(phoneBook)
})

app.get('/api/persons/:id', (request, response) => {
    const reqId = request.params.id

    if(phoneBook.some(person => person.id === reqId)){
        const reqInfo = phoneBook.find(num => num.id === reqId)
        response.json(reqInfo)

    } else {
        response.status(404).send('Nah')
    }

})

app.get('/info', (request, response) => {
    response.json(`Phonebooks has info for ${phoneBook.length} people
        ${new Date()}
        `)
})

app.post('/api/persons', (request, response) => {
    const {name, number} = request.body 

    if(!name) {
        return response.status(400).send('Error: name and number are required')
    }

    const nameExists = phoneBook.some(person => person.name === name)
    if(nameExists){
        return response.status(409).send('error: name must be unique')
    }

    const newContact = {
        id: Date.now().toString(),
        name: name,
        number: number,
    }

    phoneBook = phoneBook.concat(newContact)
    response.status(201).json(newContact)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const exists = phoneBook.some(num => num.id === id)

    if(!exists) {
        return response.status(404).send('Error: Person not found')
    }

    phoneBook = phoneBook.filter(person => person.id !== id)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
