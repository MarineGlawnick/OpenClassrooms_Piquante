// Import 
const rateLimiter = require("express-rate-limit")

// Limit to only 5 requests per IP address every 10 secondes
const limiter = rateLimiter({
    max: 5,
    windowMS: 1000,
    message: "You can't make any more requests at the moment. Try again later"
})

module.exports = limiter;