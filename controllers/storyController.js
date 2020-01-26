const express = require('express')
const router = express.Router()


const Story = require('../models/story.js')


router.get('/new', async (req,res,next) => {
	try {

		res.render('story/new.ejs')


	}catch(err){
		next(err)
	}

	})

















module.exports = router