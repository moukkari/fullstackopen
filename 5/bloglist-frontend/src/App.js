import React, { useEffect, useState } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import NewBlog from './components/NewBlog'

const App = () => {
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [blogAdded, setBlogAdded] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogDude')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
        <Login setInfoMessage={setInfoMessage} setUser={setUser} />
        : 
        <div>
          <p>{user.name} logged in <button onClick={() => logOut()}>Log out</button></p>
          <NewBlog setInfoMessage={setInfoMessage} blogAdded={blogAdded} setBlogAdded={setBlogAdded} />
          <Blogs blogAdded={blogAdded} />
        </div>
      }
      
      
    </div>
  )
}

export default App