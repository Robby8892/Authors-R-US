const express = require('express')
const router = express.Router()

const User = require('../models/user.js')
const Story = require('../models/story.js')

const checkAuthorAuth = require('../lib/checkAuthorAuth.js')




router.get('/:id', async (req, res, next) => {
	try {

		const userInput = req.params.id
		const foundUser = await User.findById(req.params.id)
		res.render('user/show.ejs', {
			user: foundUser,
			userInput: userInput
		})


		// profilePhoto: // user add profile photo

	}catch(err) {
		next(err)
	}
})


router.get('/', async (req,res,next) => {
	try {

		// here we will render a list of all authors on the site not including 
		// the person logged in
		const foundUsers = await User.find({ $nor: [ { _id: req.session.userId}]})
		console.log(foundUsers);
		res.render('user/index.ejs', { users: foundUsers})

	}catch(err) {
		next(err)
	}

})

router.get('/stories/:id', checkAuthorAuth, async (req,res,next) => {
	try {

		const foundStories = await Story.find({ user: req.session.userId}).populate('user')
		res.render('story/index.ejs', {
			stories: foundStories
		})

	}catch(err) {
		next(err)
	}

})

router.get('/:id/edit', async (req,res,next) => {
	try {

		const userToEdit = await User.findById(req.params.id)

		res.render('user/edit.ejs', { user: userToEdit})

	}catch(err) {
		next(err)
	}

})


router.put('/:id/edit', async (req, res, next) => {
	try {

		// stretch: password validation then choose new password

		const userUpdatedProfile = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			dob: req.body.dob
		}

		const updatedProfile = await User.findByIdAndUpdate(req.params.id, userUpdatedProfile)
		res.redirect('/users/' + req.session.userId)
	} catch(err) {
		next(err)
	}
})


router.delete('/:id', async (req, res, next) => {
	try {

		const deletedRatings = await Story.updateMany({$pull:{'ratings':{'user': req.session.userId}}})
		const deletedComments = await Story.updateMany({$pull:{'comments':{'user': req.session.userId}}})
		const deletedStories = await Story.remove({ user: req.session.userId})
		const deletedUser = await User.findByIdAndRemove(req.session.userId)

		res.redirect('/')
	} catch(err) {
		next(err)
	}
})



module.exports = router