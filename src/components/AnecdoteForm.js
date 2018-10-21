import React from 'react'

import {connect} from 'react-redux';  

import { mapDispatchToProps } from '../store';


class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.actions.anecdotes.createAnecdote( content );
    this.props.actions.notification.setNotification( 'Anecdote created' );
    setTimeout( () => this.props.actions.notification.removeNotification(), 5000 );
    
    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

