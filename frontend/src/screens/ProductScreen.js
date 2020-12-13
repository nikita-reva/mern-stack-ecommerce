import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(1)

	const dispatch = useDispatch()

	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	useEffect(() => {
		dispatch(listProductDetails(match.params.id))
	}, [dispatch, match])

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`)
	}

	return (
		<>
			<Link className="btn btn-dark my-3" to="/">
				Go Back
			</Link>
			{loading ? (
				<Loader></Loader>
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								></Rating>
							</ListGroup.Item>
							<ListGroup.Item>
								<h4>Price: ${product.price}</h4>
							</ListGroup.Item>
							<ListGroup.Item>
								<h5>{product.description}</h5>
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0
												? `${product.countInStock} in stock`
												: 'out of stock'}{' '}
										</Col>
									</Row>
								</ListGroup.Item>

								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Quantity</Col>
											<Col>
												<Form.Control
													as="select"
													value={qty}
													onChange={(e) =>
														setQty(e.target.value)
													}
												>
													{[
														...Array(
															product.countInStock
														).keys(),
													].map((x) => (
														<option
															key={x + 1}
															value={x + 1}
														>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										className="btn btn-primary btn-block"
										type="button"
										onClick={addToCartHandler}
										disabled={product.countInStock === 0}
									>
										Add to Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	)
}

export default ProductScreen
