// npm imports
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

// Internal imports
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
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

// Middleware for using json in a request body
app.use(express.json())

app.get('/', (req, res) => {
	res.send('API is running....')
})

//////////////////////////////////////////////////
// Incorporate product routes

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

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
