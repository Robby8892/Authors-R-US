require('dotenv').config()
require('./db/db.js')
const express = require('express')
const app = express()

const PORT = process.env.PORT

//===============================================================================
	// Middleware
//===============================================================================

const authController = require('./controllers/authController.js')
app.use('/auth', authController)



app.get('/', (req, res) => {
	res.send('Hello this works')
})















	// this is our listener
//===============================================================================

app.listen(PORT, () => {

	const  date = new Date

	console.log(`${date} Sever is running on ${PORT}`);

})