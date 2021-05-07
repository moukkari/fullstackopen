import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlog = ({ setInfoMessage, blogAdded, setBlogAdded }) => {
  const [blog, setBlog] = useState({title: '', author: '', url:''})

  const handleSubmit = async (e) => {
    e.preventDefault()

    let response = await blogService.create(blog)
    console.log(response)
    setBlogAdded(!blogAdded)
    setInfoMessage(`A new blog ${response.title} by ${response.author} has been added`)
  }

  const handleChange = (e) => {
    setBlog({...blog, [e.target.name]: e.target.value})
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