const express = require('express')
const router = express.Router()

const User = require('../models/user.js')
const Story = require('../models/story.js')


router.get('/:id', async (req, res, next) => {
	try {
		const userInput = req.params.id
		const foundUser = await User.findById(req.params.id)
		res.render('user/show.ejs', {
			user: foundUser,
			userInput: userInput
		})

		// profilePhoto: // user add profile photo

	}catch(err){
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

	}catch(err){
		next(err)
	}

})

router.get('/stories/:id', async (req,res,next) => {
	try {

		const foundStories = await Story.find({ user: req.session.userId}).populate('user')
		res.render('story/index.ejs', {
			stories: foundStories
		})

	}catch(err){
		next(err)
	}

})

router.get('/:id/edit', async (req,res,next) => {
	try {

		const userToEdit = await User.findById(req.params.id)

		res.render('user/edit.ejs', { user: userToEdit})

	}catch(err){
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
	}catch(err){
		next(err)
	}
})


router.delete('/:id', async (req, res, next) => {
	try{

		// We need to destory the users comment when they destory the accout
		// which means we have to find the comments within all stories that have
		// a ref to user 
		// const findAllStories = await Story.find({}).populate('comments.user')
		// console.log(findAllStories);

		const deleteComments = await Story.updateMany({$pull:{'comments':{'user': req.session.userId}}})


		console.log(deleteComments);

		// findAllStories.comments.user.id(req.params.id).remove()

		// for(let i = 0; i < findAllStories.length; i++) {

		// 	for(let j = 0; j < findAllStories[i].comments.length; j++) {

				// findAllStories[i].comments[j].update()


		// 			// const test = findAllStories[i].comments[j].remove()
		// 			// console.log('this is all the ones to be removed by this id 5e2f51a3f29c2833ee3d9239');
		// 			// console.log(test);
		// 			await findAllStories[i].save()
					
		// 	}
		// }

		// const deletedStories = await Story.remove({ user: req.session.userId})
		// const deletedUser = await User.findByIdAndRemove(req.session.userId)

		// res.redirect('/')
	}catch(err){
		next(err)
	}
})




module.exports = router