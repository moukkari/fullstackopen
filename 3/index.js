require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/note')

app.use(express.static('puhelinluettelo/build'))
app.use(cors())
app.use(express.json())

app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))

app.get('/', (req, res, next) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res, next) => {
    Person
        .countDocuments()
        .then(r => {
            res.send(`
                <p>Phonebook has info for ${r} people</p>
                <p>${new Date()}</p>
            `)
        })
        .catch(err => next(err))
})

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(r => res.json(r))
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(p => {
            if (p) {
                res.send(JSON.stringify(p,null,'\t'))
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => res.status(204).end())
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    console.log(body)

    if (!body.name || !body.number) {
        return res.status(400).json({error: 'content missing'})
    } else {
        const newPerson = new Person({
            name: body.name,
            number: body.number,
        })
        newPerson.save()
            .then(savedPerson => res.json(savedPerson))
            .catch(error => next(error))
    }
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    console.log(body)
    
    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => res.json(updatedPerson))
        .catch(err => next(err))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
    console.error(err.message)
  
    if (err.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {  
        return res.status(400).json({ error: err.message })
    }
  
    next(err)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})