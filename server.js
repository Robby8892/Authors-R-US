require('dotenv').config()
require('./db/db.js')
const express = require('express')
const app = express()
const User = require('./models/user')

const PORT = process.env.PORT

// middleware modules
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const session = require('express-session')
const bcrypt = require('bcrypt')


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
// Not currently needed, login/ registration through home route.
// const authControlller = require('./controllers/authController')
// app.use('/auth', authController)
const userController = require('./controllers/userController.js')
app.use('/users', userController)



//===============================================================================
	// Routes
//===============================================================================

app.get('/', (req, res) => {
	res.render('home.ejs')
})

// Use bcrypt for POST/create user route,
	// install/ require method-override
// use sessions in register/ login and implement with res.locals in server.js

// register form: POST /
app.post('/', async(req, res) => {
	console.log(req.body);
	const desiredUsername = req.body.username
	const usernameInUse = await User.findOne({ username: desiredUsername})

	res.send('testing')
})




// login form: POST /(    )
// app.post('/', )







app.get('/about', (req, res) => {
	res.render('about.ejs')
})


app.get('*', (req, res) => {
	res.status(404).render('404.ejs')
})




	// Listener
//===============================================================================

app.listen(PORT, () => {

	const  date = new Date

	console.log(`${date} Sever is running on ${PORT}`);

})