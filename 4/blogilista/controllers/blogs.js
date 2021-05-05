const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  console.log('found blogs: ', blogs)

  response.json(blogs)
  /*
  // Old way using promises
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
  */
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  try {
    const savedNote = await blog.save()
    response.status(201).json(savedNote.toJSON())
  } catch(e) {
    response.status(400).json({error: e.toJSON()})
  }
  

  // old way using promises
  /*
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
  */
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id, (err, docs) => {
    if (err) {
      response.status(404).end()
    } else {
      response.status(204).end()
    }
  })
})

blogRouter.put('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndUpdate(request.params.id, request.body, (err, docs) => {
      if (err) {
        response.status(404).end()
      } else {
        response.status(200).json(docs)
      }
    })
  } catch(e) {
    response.status(404).end()
  }
  
})

module.exports = blogRouter