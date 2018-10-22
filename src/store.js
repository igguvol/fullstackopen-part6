import { createStore, combineReducers, bindActionCreators, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer.reducer,
  notification: notificationReducer.reducer,
  filter: filterReducer.reducer
})

export function mapDispatchToProps(dispatch) {
  return {
    actions: {
      anecdotes: bindActionCreators(anecdoteReducer.mapDispatchToProps(), dispatch),
      notification: bindActionCreators(notificationReducer.mapDispatchToProps(), dispatch ),
      filter: bindActionCreators(filterReducer.mapDispatchToProps(), dispatch )
    }
  };
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store