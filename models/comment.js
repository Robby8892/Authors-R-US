const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
	text: {
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



const Comment = mongoose.model('Comment', commentSchema)



module.exports = Comment