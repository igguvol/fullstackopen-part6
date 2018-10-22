
import anecdoteService from '../services/anecdotes'

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
      return [...store, action.content ]
    case 'UPDATE_ANECDOTE':
      const old = store.filter(a => a.id !==action.content.id)
      return [...old, action.content ]
    default:
      return store;
  }
}



/*export const setAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await ane cdoteService.getAll()
    dispatch({
      type: 'SET_ANECDOTES',
      data: anecdotes
    })
  }
}
export const createAnecdote = (content) => {
  return async (dispatch) => {
    anecdoteService.create({content:content,votes:0})
    dispatch({
      type: 'CREATE_ANECDOTE',
      content: content
    })
  }
}
export const voteAnecdote = (content) => {
  return async (dispatch) => {
    anecdoteService.update( content )
    dispatch({
      type: 'VOTE_ANECDOTE',
      content: content
    })
  }
}*/


export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'SET_ANECDOTES',
      content: anecdotes
      })
  }
}
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create( content );
    console.log('createAnecdote', anecdote)
    dispatch({
      type: 'CREATE_ANECDOTE',
      content: anecdote
      });
  }
};
export const voteAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.update( {...content,votes:content.votes+1} );
    dispatch({
      type: 'UPDATE_ANECDOTE',
      content: anecdote
      });
  }
}

/*const mapDispatchToProps = dispatch => {
  return {
    initAnecdotes: async () => {
      const anecdotes = await anecdoteService.getAll()
      return dispatch => dispatch({
        type: 'SET_ANECDOTES',
        content: anecdotes
      });
    }/*,
    setAnecdotes: async (content) => {
      return {
        type: 'SET_ANECDOTES',
        content: content
      };
    },
    createAnecdote: async (content) => {
      return {
        type: 'CREATE_ANECDOTE',
        content: content
      };
    },
    voteAnecdote: async (id) => {
      return {  
        type: 'VOTE_ANECDOTE',
        id: id
      }
    }*/
/*  }
}
*/

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


export default { reducer, mapDispatchToProps, initializeAnecdotes, createAnecdote };
//export default { reducer };
