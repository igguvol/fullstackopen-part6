import { createStore, combineReducers, bindActionCreators } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer.reducer,
  notification: notificationReducer.reducer
})

export function mapDispatchToProps(dispatch) {
  return {
    actions: {
      anecdotes: bindActionCreators(anecdoteReducer.mapDispatchToProps(), dispatch),
      notification: bindActionCreators(notificationReducer.mapDispatchToProps(), dispatch )
    }
  };
}

const store = createStore(reducer)

export default store