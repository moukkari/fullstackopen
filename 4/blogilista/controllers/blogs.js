const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  console.log('found blogs: ', blogs)
  response.header("Content-Type",'application/json')
  response.send(JSON.stringify(blogs, null, 2))
})

blogRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const user = await User.findById(body.userId)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
  
  
    try {
      const savedBlog = await blog.save()

      user.blogs = user.blogs.concat(savedBlog.id)
      await user.save()

      response.status(201).json(savedBlog.toJSON())
    } catch(e) {
      response.status(400).json(e.message).end()
    }
  } catch(e) {
    response.status(400).json(e.message).end()
  }

  
  
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