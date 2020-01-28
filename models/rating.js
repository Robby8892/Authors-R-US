const mongoose = require('mongoose')

const ratingSchema = mongoose.Schema({
	vote: {
		type: Boolean,
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

const Rating = mongoose.model('Rating', ratingSchema)

module.exports = Rating