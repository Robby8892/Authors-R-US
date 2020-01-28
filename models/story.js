const mongoose = require('mongoose')

const Comment = require('./comment')

const Rating = require('./rating')

const storySchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	genre: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		default: Date.now()
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	comments: [Comment.schema],
	ratings: [Rating.schema]
})

const Story = mongoose.model('Story', storySchema)

module.exports = Story