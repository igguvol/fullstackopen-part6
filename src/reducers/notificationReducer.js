
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
    },
    removeNotification: () => {
      return {
        type: 'SET_NOTIFICATION',
        text: ''
      };
    }
  }
}

export const notify = (text, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      text: text
      });
    setTimeout( () => dispatch({
      type: 'SET_NOTIFICATION',
      text: ''
    }), seconds * 1000 );
  }
}


export default { reducer, mapDispatchToProps };