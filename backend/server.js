// npm imports
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'

// Internal imports
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

//////////////////////////////////////////////////
// Utilize environment variables

dotenv.config()

//////////////////////////////////////////////////
// Connect to database

connectDB()

//////////////////////////////////////////////////
// Initialize server

const app = express()

// Use morgan
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// Middleware for using json in a request body
app.use(express.json())

//////////////////////////////////////////////////
// Incorporate routes

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
)

//////////////////////////////////////////////////
// Set the uploads folder as static directory

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//////////////////////////////////////////////////
// Set the frontend build folder as static directory

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')))

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	)
} else {
	app.get('/', (req, res) => {
		res.send('API is running....')
	})
}

//////////////////////////////////////////////////
// Custom error handling via middleware

app.use(notFound)

app.use(errorHandler)

//////////////////////////////////////////////////
// Start listening at port 5000
const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow
			.bold
	)
)
