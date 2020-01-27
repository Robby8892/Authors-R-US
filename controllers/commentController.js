const express = require('express')
const router = express.Router()

const Comment = require('../models/comment.js')
const Story = require('../models/story.js')

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

			console.log(story);

			story.comments.id(req.params.commentId).remove()
			await story.save()


			res.redirect('/stories/' + req.params.storyId)


	}catch(err){
		next(err)
	}

	})


module.exports = router