const express = require('express')
const router = express.Router()

const Rating = require('../models/rating')
const Story = require('../models/story')

// custom authorization middleware
const checkAuthorAuth = require('../lib/checkAuthorAuth.js')



router.post('/:storyId', async (req,res,next) => {
	try {
		const foundStory = await Story.findById(req.params.storyId).populate('ratings.user')

		// delete current user's vote to prevent from spamming multiple and to enable user to change vote freely
		await Story.findByIdAndUpdate( req.params.storyId, {$pull:{'ratings':{'user': req.session.userId}}})

		// boolean determined on button press
		let whichVote = undefined
		if (req.body.vote === 'true') {
			whichVote = true
		} else if (req.body.vote === 'false') { 
			whichVote = false
		}
		const userRating = {
			vote: whichVote,
			user: res.locals.userId
			}

		foundStory.ratings.push(userRating)
		await foundStory.save()

		res.redirect('/stories/' + req.params.storyId)
	}catch(err) {
		next(err)
	}
})



module.exports = router