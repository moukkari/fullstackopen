import React, { useEffect, useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = (props) => {
  const [blogs, setBlogs] = useState(props.blogs)

  useEffect(() => {
    setBlogs(props.blogs)
  }, [props.blogs])

  const removeBlog = async blog => {
    if (window.confirm(`Really remove the blog ${blog.title}?`)) {
      const response = await blogService.remove(blog.id)
      if (response.status === 204) {
        props.setInfoMessage(response.message)
        let newBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(newBlogs)
      } else {
        props.setInfoMessage(response.message, 'error')
      }
    }
  }

  blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1)
  
  return (
    <div>
      <h2>Blogs ({blogs.length})</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} removeBlog={removeBlog} />
    )}</div>
  )
}

export default Blogs