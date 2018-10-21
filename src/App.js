import React from 'react'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import anecdoteReducer from './reducers/anecdoteReducer';
import { mapDispatchToProps } from './store';

class App extends React.Component {

  render() {
    console.log("App props:",this.props);
    //const anecdotes = this.props.store.getState()
    return (
      <div>
        <h1>Programming anecdotes</h1>
        {this.props.notification.text!==''&&<Notification />}
        <AnecdoteList />
        <AnecdoteForm/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    redux: state
  }
}

export default connect(
  (a) => a,
  mapDispatchToProps()
)(App)


//export default connect()(App);