import React from 'react'
import {connect} from 'react-redux'
import { mapDispatchToProps } from '../store';
import anecdoteService from '../services/anecdotes'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    console.log('AnecdoteList props', this.props);
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotesToShow.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                  this.props.voteAnecdote( anecdote );
                  this.props.notify(`you voted '${anecdote.content}'`, 10);
                }
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      anecdotesToShow: state.anecdotes
                            .filter(a=>a.content.indexOf(state.filter)!==-1)
                            .sort((a, b) => b.votes - a.votes)
    };
  },
  {voteAnecdote, notify} //mapDispatchToProps
)(AnecdoteList)
