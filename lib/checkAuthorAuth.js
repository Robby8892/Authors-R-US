
// module to prevent users w/out Author status from creating stories or viewing myStories
module.exports = (req, res, next) => {
	if(!req.session.author) {
		res.redirect(`/users/${req.session.userId}`)
		// req.session.message = 'You need to be an Author to access that apge'


		// Insert session message HERE

		res.redirect(`/users/${req.session.userId}`)
	} else {
		next()
	}
}