import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ blogAdded }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogAdded])

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
    )}</div>
  )
}

export default Blogs