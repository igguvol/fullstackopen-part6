
const initialState = ''

const reducer = (store = initialState, action) => {
  if (action.type === 'SET_FILTER') {
    store = action.text;
    return store;
  }
  return store
}

const mapDispatchToProps = dispatch => {
  return {
    setFilter: (text) => {
      return {
        type: 'SET_FILTER',
        text: text
      };
    },
  }
}


export default { reducer, mapDispatchToProps };