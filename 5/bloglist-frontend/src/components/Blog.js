import React, { useState } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({blog, removeBlog}) => {
  const [likes, setLikes] = useState(blog.likes)
  const user = JSON.parse( window.localStorage.getItem('blogDude') )

  const increaseLikes = async () => {
    blog.likes++
    const newBlog = {...blog, user: blog.user.id }
    delete newBlog.id
    await blogService.update(blog.id, newBlog)
    setLikes(blog.likes)
  }

  const removeStyle = {
    background: 'red', 
    float: 'right'
  }

  return (
    <div style={{border: '1px solid black', padding: '1em'}}>
      <Togglable buttonLabel='view' cancelLabel='hide' preText={blog.title} up={true}>
        {user.username === blog.user.username 
          ? <button onClick={() => removeBlog(blog)} style={removeStyle}>remove</button>
          : ''
        }
        title: {blog.title} <br/>
        url: {blog.url} <br/>
        author: {blog.author} <br/>
        likes: {likes} <button onClick={() => increaseLikes()}>like</button><br/>
        
      </Togglable>
    </div> 
)}

  

export default Blog