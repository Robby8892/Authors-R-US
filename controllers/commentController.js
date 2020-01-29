const express = require('express')
const router = express.Router()

const Comment = require('../models/comment.js')
const Story = require('../models/story.js')
const User = require('../models/user.js')

// custom authorization middleware
const checkAuthorAuth = require('../lib/checkAuthorAuth.js')





router.get('/:commentId/:storyId', async (req,res,next) => {
	try {

		const foundStory = await Story.findById(req.params.storyId).populate('comments.user')


		const foundComment = foundStory.comments.id(req.params.commentId)



		res.render('comment/edit.ejs', {
			comment: foundComment, 
			story: foundStory
		})

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

// we will want to make this custom middleware so that  we aren't having this much code on our commentController &
// our userController 
		if(!req.session.author) {

			const findComments = await Story.find()

			const userComments = []

			console.log(findComments);

			findComments.forEach( async (stories) => {

				stories.comments.forEach( async (comment) => {


					if(comment.user == req.session.userId) {
						userComments.push(comment)

						const userTotalComments = userComments.length

					}

					if(userComments.length == 10) {

						const updateAsAuthor = {
							author: true 
						}

						const findUser = await User.findByIdAndUpdate(req.session.userId, updateAsAuthor)
						console.log(findUser);
						req.session.author = findUser.author
					}
				})
			})
		}


		res.redirect('/stories/' + req.params.storyId)


	}catch(err){
		next(err)
	}

})


router.delete('/:storyId/:commentId', async (req,res,next) => {
	try {
		const foundStory = await Story.findById(req.params.storyId)

		foundStory.comments.id(req.params.commentId).remove()
		await foundStory.save()


		res.redirect('/stories/' + req.params.storyId)


	}catch(err){
		next(err)
	}

})

router.put('/:commentId/:storyId', async (req,res,next) => {
	try {

		const foundStory = await Story.findById(req.params.storyId).populate('comments.user')

		const foundComment = foundStory.comments.id(req.params.commentId)

		foundComment.text = req.body.text
		
		await foundStory.save()

		res.redirect('/stories/' + req.params.storyId)

	}catch(err){
		next(err)
	}

})


module.exports = router