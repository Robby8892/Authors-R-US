const express = require('express')
const router = express.Router()


const Story = require('../models/story.js')

router.get('/', async (req, res) => {
	const foundStories = await Story.find({}) 
	res.render('story/index.ejs', { stories: foundStories})
})

router.get('/new', async (req,res,next) => {
	try {

		res.render('story/new.ejs')


	}catch(err){
		next(err)
	}

	})

router.post('/', async(req, res, next) => {
	
	res.redirect('/stories')
})















module.exports = router