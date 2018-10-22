const anecdotesAtStart = [
  'If it hurts, do it more often'
]

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (store = initialState, action) => {
  switch (action.type) 
  {
    case 'SET_ANECDOTES':
      return action.content
    case 'CREATE_ANECDOTE':
      return [...store, { content: action.content, id: getId(), votes:0 }]
    case 'VOTE_ANECDOTE':
      const old = store.filter(a => a.id !==action.id)
      const voted = store.find(a => a.id === action.id)

      return [...old, { ...voted, votes: voted.votes+1} ]
    default:
      return store;
  }
}


const mapDispatchToProps = dispatch => {
  return {
    setAnecdotes: (content) => {
      return {
        type: 'SET_ANECDOTES',
        content: content
      };
    },
    createAnecdote: (content) => {
      return {
        type: 'CREATE_ANECDOTE',
        content: content
      };
    },
    voteAnecdote: (id) => {
      return {  
        type: 'VOTE_ANECDOTE',
        id: id
      }
    }
  }
}


export default { reducer, mapDispatchToProps };