module.exports = (req, res, next) => {
	if(req.session.author === false) {
		res.redirect(`/users/${req.session.userId}`)
		req.session.message = 'You need to be an Author to access that apge'

	} else {
		next()
	}
}