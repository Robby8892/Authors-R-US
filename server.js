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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

// local session data
app.use((req, res, next) => {
	
	if(req.session.loggedIn) {
		//local = session
		res.locals.loggedIn = req.session.loggedIn
		res.locals.username = req.session.username
		res.locals.userId = req.session.userId

	} else {
		res.locals.username = false
		res.locals.userId = false 
		res.locals.loggedIn = false 
	}
	next()
})


//===============================================================================
	// Controllers
//===============================================================================
// Not currently needed, login/ registration through home route.
// const authControlller = require('./controllers/authController')
// app.use('/auth', authController)
const userController = require('./controllers/userController.js')
app.use('/users', userController)

const storyController = require('./controllers/storyController.js')
app.use('/stories', storyController)


//===============================================================================
	// Routes
//===============================================================================

// home route
app.get('/', (req, res) => {

	res.locals.message = req.session.message

	res.render('home.ejs')
})

// register form: POST /
app.post('/', async (req, res) => {

	
	const desiredUsername = req.body.username
	const desiredPassword = req.body.password
	// find if username exists
	const userAlreadyExists = await User.findOne({
		username: desiredUsername
		})

//	// Stretch: More logic and change with placeholders using session/locals
	// query results: If username is or is not found
	if(userAlreadyExists) {
		req.session.message = `Username ${desiredUsername} already taken`

		res.redirect('/')
	// create user
	} else{

//		// change to async
		const salt = bcrypt.genSaltSync(10) //// salt value >10?
		const hashedPassword = bcrypt.hashSync(desiredPassword, salt)
		// use async bcrypted password instead: 
			// bcrypt.hash(desiredPassword, 10).then(function(hash) {
			// 	// Store hash in your password DB.
			// })
		const createdUser = await User.create({
			username: desiredUsername,
			// change to async
			password: hashedPassword,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			dob: req.body.dob
		})
		req.session.loggedIn = true
		req.session.userId = createdUser._id
		req.session.username = createdUser.username
		req.session.message = `Thank you for signing up, please login ${desiredUsername} .`

		res.redirect('/users/profile')
	}
})

// login form: POST
app.post('/users', async (req, res) => {
	const user = await User.findOne({ username: req.body.username })



	if(!user) {
		req.session.message = "Invalid username or password"

		res.redirect('/')
	} else {
//		// change to async
		const loginInfoIsValid = bcrypt.compareSync(req.body.password, user.password)
		// for bcrypt
		if(loginInfoIsValid) {
			req.session.loggedIn = true
			req.session.userId = user._id
			req.session.username = user.username

			res.redirect('/stories')
		} else {
			req.session.message = "Invalid username or password"

			res.redirect('/')
		}
	}
})

// logout -- destroy all session info

app.get('/logout', async (req,res,next) => {
	try {

		await req.session.destroy()

		res.redirect('/')
	}catch(err){
		next(err)
	}
})


// About-Us route
app.get('/about', (req, res) => {
	res.render('about.ejs')
})

// 404/ undefined routes
app.get('*', (req, res) => {
	res.status(404).render('404.ejs')
})


	// Listener
//===============================================================================

app.listen(PORT, () => {

	const  date = new Date

	console.log(`${date} Sever is running on port ${PORT}`);

})