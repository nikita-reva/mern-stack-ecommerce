import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import { Card } from 'react-bootstrap'

const Product = ({ product }) => {
	return (
		<Card className="my-3 p-3 rounded" style={{ minHeight: '25rem' }}>
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} variant="top"></Card.Img>
			</Link>
			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<Card.Title as="div">
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>
				<Card.Text as="div">
					<Rating
						value={product.rating}
						text={`${product.numReviews} reviews`}
					></Rating>
				</Card.Text>
				<Card.Text as="h3" className="h3-product-price">
					${product.price}
				</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Product
