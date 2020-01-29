
// module to prevent users w/out Author status from creating stories or viewing myStories
module.exports = (req, res, next) => {
	if(!req.session.author) {

		// Insert session message HERE

		res.redirect(`/users/${req.session.userId}`)
	} else {
		next()
	}
}