module.exports = (req, res, next) => {
	if(!req.session.author) {
		res.redirect(`/users/${req.session.userId}`)
	}
}