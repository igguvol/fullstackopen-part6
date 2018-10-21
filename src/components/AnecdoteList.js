import React from 'react'
import {connect} from 'react-redux'
import anecdoteReducer from '../reducers/anecdoteReducer';
import { mapDispatchToProps } from '../store';

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
                  this.props.actions.anecdotes.voteAnecdote( anecdote.id );
                  this.props.actions.notification.setNotification( 'Anecdote voted' );
                  setTimeout( () => this.props.actions.notification.removeNotification(), 5000 );
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
  mapDispatchToProps
)(AnecdoteList)
