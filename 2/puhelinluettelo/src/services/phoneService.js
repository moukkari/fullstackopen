import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(url)
    return req.then(r => r.data)
}

const add = newObj => {
    const req = axios.post(url, newObj)
    return req.then(r => r.data)
}

const remove = id => {
    const req = axios.delete(`${url}/${id}`)
        .catch(() => {
            return { status: 404 }
        })     
    console.log(`deleted id ${id}`)
    return req.then(r => r.status)

}

const update = (id, newObj) => {
    const req = axios.put(`${url}/${id}`, newObj)
    return req.then(r => r.data)
}

export default { getAll, add, remove, update }