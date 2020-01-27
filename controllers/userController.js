const express = require('express')
const router = express.Router()

const User = require('../models/user.js')
const Story = require('../models/story.js')


router.get('/profile', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.session.userId)
		res.render('user/show.ejs', {
			user: foundUser
		})

		// profilePhoto: // user add profile photo

	}catch(err){
		next(err)
	}
})

router.get('/profile/stories', async (req, res, next) => {
	try {
		const foundStories = await Story.find({user: req.session.userId})

		res.render('user/storyIndex.ejs', {
			stories: foundStories
		})

	}catch(err){
		next(err)
	}
})

router.get('/profile/stories/:storyId', async (req,res,next) => {
	try {

		const foundStory = await Story.findById(req.params.storyId)
		res.render('user/storyShow.ejs', {
			story: foundStory
		})

	}catch(err){
		next(err)
	}

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
		const userToEdit = await User.findById(req.params.id)

		res.render('user/edit.ejs', { user: userToEdit})

	}catch(err){
		next(err)
	}

	})


router.put('/profile/:id/edit', async (req, res, next) => {
	try {
		// const newPassword = req.body.password
		// const salt = bcrypt.genSaltSync(10) //// salt value >10?
		// const hashedPassword = bcrypt.hashSync(newPassword, salt)

		const userUpdatedProfile = {
			username: req.body.username,
			// password: hashedPassword, // stretch: password validation then choose new password
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			dob: req.body.dob
		}

		const updatedProfile = await User.findByIdAndUpdate(req.params.id, userUpdatedProfile)
		res.redirect('/users/profile')
	}catch(err){
		next(err)
	}
})


router.delete('/profile/stories/:storyId', async (req,res,next) => {
	try {

		const deletedStory = await Story.findByIdAndRemove(req.params.storyId)
		res.redirect('/users/profile/stories')

	}catch(err){
		next(err)
	}

	})




module.exports = router