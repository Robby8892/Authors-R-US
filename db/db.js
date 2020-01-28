const mongoose = require('mongoose')

// Story seed-data modules
const Story = require('../models/story')
const storyData = require('../seed-data/storydata.js')

// User seed-data modules
const User = require('../models/story')
	//insert seeded user module

const mongdbURI = process.env.MONGODB_URI


mongoose.connect(mongdbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
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


// Inserted seed-data
// User.insertMany( ,() => {
// 	console.log('');
// })

// Story.insertMany(storyData, (err, data) => {
	// console.log(storyData);
// })
