import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ setErrorMessage }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <h2>Blogs</h2>
      <button onClick={() => setErrorMessage('testi')}>Click</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
    )}</div>
  )
}

export default Blogs