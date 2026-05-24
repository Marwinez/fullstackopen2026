import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const addPerson = (person) => {
    const request = axios.post(baseUrl, person)
    return request.then(res => res.data)
}

const removePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(res => res.data)
}

const updatePerson = (id, person) => {
    const request = axios.put(`${baseUrl}/${id}`, person)
    return request.then(res => res.data)
}

export default { getAll, addPerson, removePerson, updatePerson }