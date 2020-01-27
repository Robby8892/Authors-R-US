const express = require('express')
const router = express.Router()

const Story = require('../models/story.js')

router.get('/', async (req, res, next) => {
	try {
		// This will find all the stories written by users who don't share the userId
	const foundStories = await Story.find({$nor:[{user: req.session.userId}]}).populate('user') 

	res.render('story/index.ejs', {
		stories: foundStories
		})

	}catch(err){
		next(err)
	}
})


router.get('/:id', async (req, res, next) => {
	try {
		const foundStories = await Story.find({user: req.session.userId})

		res.render('story/show.ejs', {
			stories: foundStories
		})

	}catch(err){
		next(err)
	}
})




router.get('/create', async (req,res,next) => {
	try {

		res.render('story/new.ejs')


	}catch(err){
		next(err)
	}

})

router.get('/:id', async (req,res,next) => {
	try {

		const foundStory = await Story.findById(req.params.id)

		res.render('story/show.ejs', {
			story: foundStory
		})

	}catch(err){
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


router.post('/create', async (req,res,next) => {
	try {
		const newStory = {
		title: req.body.title,
		genre: req.body.genre,
		body: req.body.body,
		user: res.locals.userId
	}

	const createdStory = await Story.create(newStory)

	res.redirect('/stories')

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
		res.redirect('/users/' + req.session.userId + '/stories/' + req.params.id)
	}catch(err){
		next(err)
	}
})


router.delete('/:id', async (req,res,next) => {
	try {
		const deletedStory = await Story.findByIdAndRemove(req.params.storyId)
		res.redirect('/users/' + userId + '/stories')

	}catch(err){
		next(err)
	}
})




module.exports = router