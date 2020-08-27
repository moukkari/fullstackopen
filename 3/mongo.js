const mongoose = require('mongoose')

/*
if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}
*/

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://stack:${password}@puhelinluettelocluster.hmiig.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', noteSchema)

if (process.argv.length < 4) {
    Person.find({}).then(r => {
        r.forEach(p => {
            console.log(p.name, p.number)
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name: name,
        number: number
    })
    person.save().then(() => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}
