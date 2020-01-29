const express = require('express')
const router = express.Router()

const Story = require('../models/story.js')

// custom authorization middleware
const checkAuthorAuth = require('../lib/checkAuthorAuth.js')



router.get('/', async (req, res, next) => {
	try {
		// This will find all the stories written by users who don't share the userId
	const foundStories = await Story.find({$nor:[{user: req.session.userId}]}).populate('user') 

	res.render('story/index.ejs', {
		stories: foundStories
		})

	}catch(err) {
		next(err)
	}
})


router.get('/users/:userId', async (req,res,next) => {
	try {
		const userStories = await Story.find({user: req.params.userId}).populate('user')

		console.log(userStories);

		res.render('story/index.ejs', {stories: userStories})

	}catch(err) {
		next(err)
	}

})


router.get('/new', checkAuthorAuth,  (req,res,next) => {
	

	res.render('story/new.ejs')

})

router.get('/:id', async (req, res, next) => {
	try {
		const foundStory = await Story.findById(req.params.id).populate('user').populate('comments.user').populate('ratings.user')
		const userInput = req.params.id

		let upVote = 0
		let downVote = 0
		foundStory.ratings.forEach((rating) => {
			if (rating.vote === true) {
				upVote += 1
			}
			if (rating.vote === false) {
				downVote += 1
			}
		})

		res.render('story/show.ejs', {
			story: foundStory,
			userInput: userInput,
			upVote: upVote,
			downVote: downVote
		})

	}catch(err) {
		next(err)
	}
})


router.get('/:id/edit', async (req,res,next) => {
	try {
		const storyToEdit = await Story.findById(req.params.id)
		res.render('story/edit.ejs', {
			story: storyToEdit
		})

	}catch(err){
		next(err)
	}

})


router.post('/new', async (req,res,next) => {
	try {
		const newStory = {
		title: req.body.title,
		genre: req.body.genre,
		body: req.body.body,
		user: res.locals.userId
	}

	const createdStory = await Story.create(newStory)

	res.redirect('/users/stories/' + req.session.userId)

	}catch(err){
		next(err)
	}
})

router.put('/:id/edit', async (req, res, next) => {
	try {
		const userUpdatedStory = {
			title: req.body.title,
			genre: req.body.genre,
			body: req.body.body
		}
		const updatedStory = await Story.findByIdAndUpdate(req.params.id, userUpdatedStory)

		res.redirect('/stories/' + req.params.id )

	}catch(err){
		next(err)
	}
})


router.delete('/:id', async (req,res,next) => {
	try {
		const deletedStory = await Story.findByIdAndRemove(req.params.id)
		res.redirect('/users/stories/' + req.params.id)

	}catch(err){
		next(err)
	}
})



module.exports = router