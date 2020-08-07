
import axios from 'axios'

// const cors = require('cors')

// app.use(cors())

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = numberObject => {
  const request = axios.post(baseUrl, numberObject)
  return request.then(response => response.data)
}

const update = (id, numberObject) => {
  const request = axios.put(`${baseUrl}/${id}`, numberObject)
  return request.then(response => response.data)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}