const mongoose = require('mongoose')
const supertest = require('supertest')
const { response } = require('../app')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('the title of the first blog is Testititle', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('Testititle')
})

test('the blog objects have a variable called id', async () => {
  const response = await api.get('/api/blogs')

  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

test('posting a blog adds the correct blog to the database', async () => {
  let response = await api.get('/api/blogs')

  const blogsLength = response.body.length
  console.log(blogsLength)

  const newBlog = {
    title: 'superTestTitle',
    author: 'Kari Grandi',
    url: 'http://www.yle.fi',
    likes: 2
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(blogsLength + 1)

  expect(response.body[blogsLength]).toMatchObject(newBlog)
})

test(`if likes doesn't have a value, it's set to 0`, async () => {
  const newBlog = {
    title: 'likesValueTest',
    author: 'Kari Grandi',
    url: 'http://www.yle.fi'
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)

  const response = await api.get('/api/blogs')

  expect(response.body[response.body.length-1].likes).toBe(0)
})

test('new blog has to have values for title and url', async () => {
  const newBlog = {
    author: 'Kari Grandi'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})