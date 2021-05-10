import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlog = ({ addBlog }) => {
  const [blog, setBlog] = useState({ title: '', author: '', url:'' })

  NewBlog.propTypes = {
    addBlog: PropTypes.func.isRequired,
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    addBlog(blog)
  }

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h2>New Blog</h2>
      <form onSubmit={handleSubmit}>
        title:
        <input name="title" onChange={handleChange} value={blog.title} />
        author:
        <input name="author" onChange={handleChange} value={blog.author} />
        url:
        <input name="url" onChange={handleChange} value={blog.url} />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog