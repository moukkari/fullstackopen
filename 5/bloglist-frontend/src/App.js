import React, { useEffect, useState, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogDude')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    let response = await blogService.create(blog)
    setBlogs(blogs.concat(response))
    setInfoMessage(`A new blog ${response.title} by ${response.author} has been added`)
  }

  const logOut = () => {
    window.localStorage.removeItem('blogDude')
    window.location.reload()
  }

  const setInfoMessage = (message, type = 'default') => {
    const style = type === 'default' ? 'green' : 'red'
    setMessage(<p style={{color: style}}>{message}</p>)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      {message}

      {user === null ?
        <Togglable buttonLabel="login">
            <Login setInfoMessage={setInfoMessage} setUser={setUser} />
        </Togglable>
        : 
        <div>
          <p>{user.name} logged in <button onClick={() => logOut()}>Log out</button></p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlog addBlog={addBlog} />
          </Togglable>
          <Blogs blogs={blogs} setInfoMessage={setInfoMessage} />
        </div>
      }
      
      
    </div>
  )
}

export default App