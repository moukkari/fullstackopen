const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.header("Content-Type",'application/json')
  response.send(JSON.stringify(blogs, null, 2))
})

/*
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}
*/

blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  //const token = getTokenFrom(request)
  
  /*
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }
  const user = await User.findById(decodedToken.id)
  */
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  /*
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }

  const user = await User.findById(decodedToken.id)
  */

  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id, (err, docs) => {
      if (err) {
        response.status(404).end()
      } else {
        response.status(204).end()
      }
    })
  } else {
    response.status(401).json({ error: 'invalid token'})
  }
})

blogRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body, (err, docs) => {
    if (err) {
      response.status(404).end()
    } else {
      response.status(200).json(docs)
    }
  })
  
})

module.exports = blogRouter