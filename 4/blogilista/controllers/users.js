const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10

  if (body.password && body.password.length > 2) {
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  
    response.status(400).json(e.message).end()
    
  } else {
    response.status(400).json('User validation failed: password: Error, expected password to be at least 3 characters long')
  }
  
  
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.header("Content-Type",'application/json')
  response.send(JSON.stringify(users, null, 2))
})

module.exports = usersRouter
