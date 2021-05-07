import React, { useEffect, useState } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import NewBlog from './components/NewBlog'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

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

  return (
    <div>
      {errorMessage}

      {user === null ?
        <Login setErrorMessage={setErrorMessage} setUser={setUser} />
        : 
        <div>
          <p>{user.name} logged in <button onClick={() => logOut()}>Log out</button></p>
          <NewBlog setErrorMessage={setErrorMessage} />
          <Blogs setErrorMessage={setErrorMessage} />
        </div>
      }
      
      
    </div>
  )
}

export default App