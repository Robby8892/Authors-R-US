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
	} else {
		res.locals.registered = req.session.registered
		if(req.session.registered) {
			res.locals.registerSuccess = req.session.registerSuccess
		} else {
			res.locals.registered = undefined
			res.locals.registerSuccess = undefined
		}
		res.locals.registering = req.session.registering
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
	res.render('home.ejs')
})

// register form: POST /
app.post('/', async(req, res) => {
	console.log(req.body);
	const desiredUsername = req.body.username
	// find if username exists
	const userAlreadyExists = await User.findOne({ username: desiredUsername})

//	// Stretch: More logic and change with placeholders using session/locals
	// query results: If username is or is not found
	if(userAlreadyExists) {
		req.session.registering = `Username ${desiredUsername} already taken`
		res.redirect('/')
	// create user
	} else{
		// Encrypt password and desired data using bcrypt for POST/create user route
			//sync example -- needs to be async
			//     const salt = bcrypt.genSaltSync(10) //// salt value >10?
			//     const hashedPassword = bcrypt.hashSync(req.body.password, salt)

		const createdUser = await User.create({
			username: desiredUsername,
			password: req.body.password, //       password: hashedPassword
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			dob: req.body.dob
		})
		req.session.registered = true
		req.session.registerSuccess = `Thank you for signing up, please login ${desiredUsername}`
		req.session.userId = createdUser._id
		req.session.username = createdUser.username


		res.redirect('/')
	}
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