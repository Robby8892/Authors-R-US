const express = require('express')
const router = express.Router()

const Rating = require('../models/rating')
const Story = require('../models/story')

router.post('/:storyId', async (req,res,next) => {
	try {
		const foundStory = await Story.findById(req.params.storyId)

		// boolean determined on button press
		let whichVote = false
		if (req.body.vote === 'true') {
			whichVote = true
		} else {
			whichVote = false
		}
		const userRating = {
			vote: whichVote,
			user: res.locals.userId
		}

		// console.log('\nthis is the rating:');
		// console.log(userRating);
		// console.log(typeof userRating.vote);

		// next: 

		// prevent user from clicking button more than once based on userId == user._id??

		// Add logic in client side js to display number of up/down votes based on number of tru/ false 
		//booleans in Story.ratings...:
		// i.e.: 
		// let result = 0
		// Story.ratings.forEach((rating) => {
			// if (true){
				// result += 1
			// }
		// })

		foundStory.ratings.push(userRating)
		await foundStory.save()

		console.log('\nthis is the story:');
		console.log(foundStory);

		res.redirect('/stories/' + req.params.storyId)
	}catch(err){
		next(err)
	}
})




module.exports = router