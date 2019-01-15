import React from 'react'

class DeleteItem extends React.Component {
  render() {
    return <button>{this.props.children}</button>
  }
}

export default DeleteItem
