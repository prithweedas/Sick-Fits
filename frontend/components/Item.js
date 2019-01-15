import React from 'react'
import propTypes from 'prop-types'
import Link from 'next/link'

import ItemStyles from './styles/ItemStyles'
import Title from './styles/Title'
import PriceTag from './styles/PriceTag'
import formatMoney from '../lib/formatMoney'

class Item extends React.Component {
  static propTypes = {
    item: propTypes.shape({
      title: propTypes.string.isRequired,
      description: propTypes.string.isRequired,
      price: propTypes.number.isRequired,
      image: propTypes.string,
      largeImage: propTypes.string,
      id: propTypes.string.isRequired
    })
  }
  render() {
    const { item } = this.props
    return (
      <ItemStyles>
        {item.image && <img src={item.image} alt={item.title} />}
        <Title>
          <Link
            href={{
              pathname: '/item',
              query: { id: item.id }
            }}
          >
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>
        <div className="buttonList">
          <Link
            href={{
              pathname: 'update',
              query: {
                id: item.id
              }
            }}
          >
            <a>Edit ✏️</a>
          </Link>
          <button>Add to Cart</button>
          <button>Delete</button>
        </div>
      </ItemStyles>
    )
  }
}

export default Item
