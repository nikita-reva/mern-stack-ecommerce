import bcrypt from 'bcryptjs'

const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('password123', 10),
		isAdmin: true,
	},
	{
		name: 'Nikita Reva',
		email: 'nikita@example.com',
		password: bcrypt.hashSync('password123', 10),
	},
	{
		name: 'Angela Ernst',
		email: 'angela@example.com',
		password: bcrypt.hashSync('password123', 10),
	},
]

export default users
