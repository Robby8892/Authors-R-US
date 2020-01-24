require('dotenv').config()
require('./db/db.js')
const express = require('express')
const app = express()

const PORT = process.env.PORT

//===============================================================================
	// Middleware
//===============================================================================


//===============================================================================
	// Controllers
//===============================================================================
// const authController = require('./controllers/authController.js')
// app.use('/auth', authController)



// app.get('/', (req, res) => {
// 	res.send('Hello this works')
// })



app.get('*', (req, res) => {
	res.render('404.ejs')
})













	// this is our listener
//===============================================================================

app.listen(PORT, () => {

	const  date = new Date

	console.log(`${date} Sever is running on ${PORT}`);

})