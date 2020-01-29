
// module to prevent client from not visiting other pages if not logged in
module.exports = (req, res, next) => {
	if(!req.session.loggedIn) {

		// insert session message HERE

		res.redirect('/')
	} else {
		next()
	}
}