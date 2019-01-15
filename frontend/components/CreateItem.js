import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'
import ErrorMessage from './ErrorMessage'

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      data: {
        title: $title
        description: $description
        price: $price
        image: $image
        largeImage: $largeImage
      }
    ) {
      id
    }
  }
`

class CreateItem extends React.Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0
  }

  handleChange = e => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({
      [name]: val
    })
  }

  handleSubmit = createItem => async e => {
    e.preventDefault()
    const res = await createItem()
    Router.push({
      pathname: '/item',
      query: {
        id: res.data.createItem.id
      }
    })
    console.log(res)
  }

  uploadFile = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'sickfits')
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/prithweedas/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
    console.log(file)
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    })
  }

  render() {
    const { title, price, description, image } = this.state

    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={{ ...this.state }}>
        {(createItem, { loading, error }) => {
          return (
            <Form onSubmit={this.handleSubmit(createItem)}>
              <ErrorMessage error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="file">
                  Image
                  <input
                    type="file"
                    placeholder="Upload an Image"
                    id="file"
                    required
                    name="file"
                    onChange={this.uploadFile}
                  />
                  {image && (
                    <img width={200} src={image} alt="Upload Preview..." />
                  )}
                </label>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    placeholder="Title"
                    id="title"
                    required
                    name="title"
                    value={title}
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
                    value={price}
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
                    value={description}
                    onChange={this.handleChange}
                  />
                </label>
                <button type="submit">Submit</button>
              </fieldset>
            </Form>
          )
        }}
      </Mutation>
    )
  }
}

export default CreateItem
