require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { default: mongoose } = require('mongoose')

const PORT = process.env.PORT || 8000
const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

const start = async () => {
	const dbHost = process.env.DB_HOST
	const dbPort = process.env.DB_PORT
	const options = {
		user: process.env.DB_USER,
		pass: process.env.DB_PASS,
	}
	try {
		await mongoose
			.connect(`mongodb://${dbHost}:${dbPort}`, options)
			.then(() => console.log('successfully connected to mongo'))
		app.listen(PORT, () =>
			console.log('Server has been started on port ' + PORT + '...')
		)
	} catch (e) {
		console.log(e)
	}
}

start()
