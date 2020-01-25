const mongoose = require('mongoose')

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
	}

})

const Story = mongoose.model('Story', storySchema)

module.exports = Story