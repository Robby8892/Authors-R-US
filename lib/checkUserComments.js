
module.exports = (req, res, next) => {

const Story = require('../models/story.js')

	const findComments = Story.find()

	const userComments = []

	findComments.forEach((stories) => {
				
		stories.comments.forEach((comment) => {

			if(comment.user == req.session.userId) {
				userComments.push(comment)
			}

			if(userComments.length == 10) {
				const updateUser = User.findByIdAndUpdate(req.session.userId, {'author': true})
				updateUser.save()
			}
		})
	})

}