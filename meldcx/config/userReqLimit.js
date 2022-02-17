const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 120 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 10 requests per `window` (here, per 120 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: true, // Disable the `X-RateLimit-*` headers
});

module.exports = limiter;
