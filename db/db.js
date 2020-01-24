const mongoose = require('mongoose')

const mongdbURI = process.env.MONGODB_URI

mongoose.connect(mongdbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: true

})

mongoose.connection.on('connected', () => {

	console.log('You\'re connected to the database');
})

mongoose.connection.on('disconnected', () => {

	console.log('You\'re disconnected to the database');
})

mongoose.connection.on('error', (err) => {

	console.log('Here is the error, with the database');
	console.log(err);
})