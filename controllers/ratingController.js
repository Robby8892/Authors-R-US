const express = require('express')
const router = express.Router()

const Rating = require('../models/rating')
const Story = require('../models/story')

router.post('/:storyId', async (req,res,next) => {
	try {
		const foundStory = await Story.findById(req.params.storyId).populate('ratings.user')

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

		console.log('\nthis is the rating: ');
		console.log(userRating);
		console.log('\nthis is the rating.vote type: ');
		console.log(typeof userRating.vote);

		// next: 

		// prevent user from clicking button more than once based on userId == user._id??
		// Add logic in client side js to display number of up/down votes based on number of tru/ false 
		//booleans in Story.ratings...:
		// i.e.: 
		// let upVote = 0
		// let downVote = 0
		// foundStory.ratings.forEach((rating) => {
		// 	if (req.body.vote === true) {
		// 		upVote += 1
		// 	}
		// 	if (req.body.vote === false) {
		// 		downVote += 1
		// 	}
		// })

		foundStory.ratings.push(userRating)
		await foundStory.save()

		// console.log('\nthis is the story:');
		// console.log(foundStory);

		res.redirect('/stories/' + req.params.storyId)
	}catch(err){
		next(err)
	}
})




module.exports = router