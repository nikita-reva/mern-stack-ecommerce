import express from 'express'
import {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductRewiew,
	getTopProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)

router.get('/top', getTopProducts)

router
	.route('/:id')
	.get(getProductById)
	.put(protect, admin, updateProduct)
	.delete(protect, admin, deleteProduct)

router.route('/:id/reviews').post(protect, createProductRewiew)

export default router
