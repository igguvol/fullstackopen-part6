import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Anecdote extends React.Component
{

  render() 
  {
    return (
      <div>
        <h1>
          {this.props.anecdote.content} by {this.props.anecdote.author}
        </h1>
        <div>
          has {this.props.anecdote.votes} votes
        </div>
        <br />
        <div>
          for more information see <Link to={this.props.anecdote.info} />
        </div>
        <br />
      </div>
    );
  }
}