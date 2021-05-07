import React, { useEffect, useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ setInfoMessage, setUser }) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState({})

  // to avoid getting a 'Can't perform a React state update on an unmounted component' error
  useEffect(() => {
    return () => { setState({})}
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('blogDude', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch(e) {
      setInfoMessage('wrong credentials', 'error')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login