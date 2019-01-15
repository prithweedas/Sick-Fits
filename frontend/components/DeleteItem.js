import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { ALL_ITEMS_QUERY } from './Items'

export const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`
class DeleteItem extends React.Component {
  handleClick = deleteItem => {
    if (confirm('Are you sure you want to delete this Item?')) deleteItem()
  }

  update = (cache, payload) => {
    // read the cache
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY })
    // filter the deleted item
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    )
    // write the updated data in cache
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data })
  }

  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { error, loading }) => (
          <button onClick={() => this.handleClick(deleteItem)}>
            {this.props.children}
          </button>
        )}
      </Mutation>
    )
  }
}

export default DeleteItem
