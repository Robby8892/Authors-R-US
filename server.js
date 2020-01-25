require('dotenv').config()
require('./db/db.js')
const express = require('express')
const app = express()

const PORT = process.env.PORT

//===============================================================================
	// Middleware
//===============================================================================


app.use(express.static('public'))

//===============================================================================
	// Controllers
//===============================================================================
// const authController = require('./controllers/authController.js')
// app.use('/auth', authController)


const userController = require('./controllers/userController.js')
app.use('/users', userController)



app.get('/', (req, res) => {
	res.render('home.ejs')
})



app.get('*', (req, res) => {
	res.render('404.ejs')
})













	// this is our listener
//===============================================================================

app.listen(PORT, () => {

	const  date = new Date

	console.log(`${date} Sever is running on ${PORT}`);

})