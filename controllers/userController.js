const express = require('express')
const router = express.Router()

const User = require('../models/user.js')


router.get('/profile', (req, res) => {
	res.render('user/show.ejs')
})



router.get('/', async (req,res,next) => {
	try {

		// here we will render a list of all authors on the site not including 
		// the person logged in


		res.render('user/index.ejs')

	}catch(err){
		next(err)
	}

	})



router.get('/profile/:id/edit', async (req,res,next) => {
	try {
		// from the profile page the user can select edit profile
		// to route them to a edit profile page, this will include
		// all of their information

		res.render('user/edit.ejs')

	}catch(err){
		next(err)
	}

	})





module.exports = router