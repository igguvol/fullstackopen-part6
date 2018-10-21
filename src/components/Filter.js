import React from 'react'
import {connect} from 'react-redux'
import {mapDispatchToProps} from '../store'

class Filter extends React.Component {
  handleChange = (event) => {
    this.props.actions.filter.setFilter( event.target.value );
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

export default connect(
  (a) => a,
  mapDispatchToProps
)(Filter)

