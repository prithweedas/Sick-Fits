import React from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'
import ErrorMessage from './ErrorMessage'

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`
export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      data: { id: $id, title: $title, description: $description, price: $price }
    ) {
      id
    }
  }
`

class UpdateItem extends React.Component {
  handleChange = e => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({
      [name]: val
    })
  }

  handleSubmit = updateItem => async e => {
    e.preventDefault()
    const res = await updateItem({
      variables: {
        id: this.props.id,
        ...this.state
      }
    })
    console.log(res)
  }

  render() {
    // const { title, price, description } = this.state
    const { id } = this.props
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>
          if (!data.item) return <p>No Item found for id {id}</p>
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION}>
              {(updateItem, { loading, error }) => {
                return (
                  <Form onSubmit={this.handleSubmit(updateItem)}>
                    <ErrorMessage error={error} />
                    <fieldset disabled={loading} aria-busy={loading}>
                      <label htmlFor="title">
                        Title
                        <input
                          type="text"
                          placeholder="Title"
                          id="title"
                          required
                          name="title"
                          defaultValue={data.item.title}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label htmlFor="price">
                        Price
                        <input
                          type="number"
                          placeholder="Price"
                          id="price"
                          required
                          name="price"
                          defaultValue={data.item.price}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label htmlFor="description">
                        Description
                        <textarea
                          placeholder="Enter A Description"
                          id="description"
                          required
                          name="description"
                          defaultValue={data.item.description}
                          onChange={this.handleChange}
                        />
                      </label>
                      <button type="submit">
                        Sav{loading ? 'ing' : 'e'} Changes
                      </button>
                    </fieldset>
                  </Form>
                )
              }}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default UpdateItem
