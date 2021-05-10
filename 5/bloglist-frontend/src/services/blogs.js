import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObj => {
  const config = { headers: { Authorization: token } }

  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

const update = (id, newObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newObj)
  return request.then(response => response.data)
}

const remove = async (id) => {
  const config = { headers: { Authorization: token } }
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return { status: response.status, message: 'removed succesfully' }
  } catch(e) {
    return { status: e.response.status, message: e.response.data.error }
  }

}

const blogService = { getAll, setToken, create, update, remove }

export default blogService