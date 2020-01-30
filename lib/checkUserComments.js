
module.exports = async (req, res, next) => {

	const Story = require('../models/story.js')

	if(!req.session.author) {

		const findComments = await Story.find()

		const userComments = []

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
					req.session.author = findUser.author
					next()
				}
			})
		})
	} else {
		next()
	}
}