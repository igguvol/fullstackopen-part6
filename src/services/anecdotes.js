import axios from 'axios'

const getAll = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

const create = async (anecdote) => {
  const response = await axios.post('http://localhost:3001/anecdotes', {content:anecdote, votes:0} )
  return response.data
}

const update = async (anecdote) => {
  const response = await axios.put('http://localhost:3001/anecdotes/'+anecdote.id, anecdote)
  return response.data
}

export default { getAll, create, update }