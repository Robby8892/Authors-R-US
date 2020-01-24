require('dotenv').config()

const express = require('express')

const app = express()

const PORT = process.env.PORT



























app.listen(PORT, () => {

	const  date = new Date

	console.log(`${date} Sever is running on ${PORT}`);

})