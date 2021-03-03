// Imports
var router = require("express").Router();

// Base endpoint
router.get("/", (req, res) => {
	res.send("Welcome to our api.")
})

// Get a random number
router.get("/random-number", (req, res) => {
	let number = Math.floor(Math.random()*(100-1+1)+1)
	res.json({number: number})
})

// Export the JS file
module.exports = router;