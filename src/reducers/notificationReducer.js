
const initialState = { text:'' }

const reducer = (store = initialState, action) => {
  console.log( 'reducer ', action );
  if (action.type === 'SET_NOTIFICATION') {
    store.text = action.text;
    return store;
  }

  return store
}


const mapDispatchToProps = dispatch => {
  return {
    setNotification: (text) => {
      return {
        type: 'SET_NOTIFICATION',
        text: text
      };
    }
  }
}


export default { reducer, mapDispatchToProps };