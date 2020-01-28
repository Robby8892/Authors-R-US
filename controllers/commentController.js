const express = require('express')
const router = express.Router()

const Comment = require('../models/comment.js')
const Story = require('../models/story.js')


router.get('/:commentId/:storyId', async (req,res,next) => {
	try {

		const findStories = await Story.findById(req.params.storyId).populate('comments.user')


		const foundComment = findStories.comments.id(req.params.commentId)

		console.log(foundComment);

		res.render('comment/edit.ejs', {comment: foundComment})

	}catch(err){
		next(err)
	}

	})



router.post('/:storyId', async (req,res,next) => {
	try {
		const foundStory = await Story.findById(req.params.storyId)

		const userComment = {
			text: req.body.text,
			user: res.locals.userId
		}

		foundStory.comments.push(userComment)
		await foundStory.save()

		res.redirect('/stories/' + req.params.storyId)


	}catch(err){
		next(err)
	}

})


router.delete('/:storyId/:commentId', async (req,res,next) => {
	try {
		const story = await Story.findById(req.params.storyId)

			story.comments.id(req.params.commentId).remove()
			await story.save()


			res.redirect('/stories/' + req.params.storyId)


	}catch(err){
		next(err)
	}

	})


module.exports = router