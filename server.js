require('dotenv').config()
require('./db/db.js')
const express = require('express')
const app = express()

const PORT = process.env.PORT
const bodyParser = require('body-parser')
const sessions = require('express-session')

//===============================================================================
	// Middleware
//===============================================================================
app.use(express.static('public'))
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
// local session data
// app.use((req, res) => {
// 	if(req.session.loggedIn) {
// 		//local = session
// 	} else {

// 	}
// 	nest()
// })



//===============================================================================
	// Controllers
//===============================================================================
const authControlller = require('./controllers/authController')
app.use('/auth', authController)
const userController = require('./controllers/userController.js')
app.use('/users', userController)



app.get('/', (req, res) => {
	res.render('home.ejs')
})


app.get('/about', (req, res) => {
	res.render('about.ejs')
})


app.get('*', (req, res) => {
	res.render('404.ejs')
})






	// Listener
//===============================================================================

app.listen(PORT, () => {

	const  date = new Date

	console.log(`${date} Sever is running on ${PORT}`);

})