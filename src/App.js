import React from 'react'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import anecdoteReducer from './reducers/anecdoteReducer';
import store, { mapDispatchToProps } from './store';

class App extends React.Component {

  componentWillMount()
  {
    store.subscribe( (a) => {
      this.forceUpdate();
    } );
  }
  componentWillUnMount()
  {
    store.subscribe( (a) => {
      console.log('remove');
    } );
  }

  render() {
    console.log("App props:",this.props);
    //const anecdotes = this.props.store.getState()
    return (
      <div>
        <h1>Programming anecdotes</h1>
        {this.props.notification.text!==''&&<Notification />}
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}



export default connect(
  (a) => a,
  mapDispatchToProps
)(App)


//export default connect()(App);