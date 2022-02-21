import { rateLimit } from 'express-rate-limit'

const getAddress = (req) =>
  req.headers['cf-connecting-ip'] ||
  req.headers['x-forwarded-for'] ||
  req.ip ||
  '255.255.255.255'

const message = 'Too many requests, please try again later'

//Example of the limiter

// export const apiLimiter = rateLimit({
//   windowMs: 30 * 60 * 1000, // 30 minutes
//   max: 100, // Limit each IP to 100 requests per `window` (here, per 30 minutes)
//   message: message, //'Too many requests, please try again later'
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//   keyGenerator: getAddress,
// })

//States Endpoint Limiter

export const getStatesLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 300,
  statusCode: 429,
  message: message,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getAddress,
})

//Reviews Limiters

export const postReviewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30,
  statusCode: 429,
  message: message,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getAddress,
})

export const updateReviewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30,
  statusCode: 429,
  message: message,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getAddress,
})

export const getReviewsLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 300,
  statusCode: 429,
  message: message,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getAddress,
})

//Likes Limiters

export const postLikeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50,
  statusCode: 429,
  message: message,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getAddress,
})

export const deleteLikeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50,
  statusCode: 429,
  message: message,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getAddress,
})

export const getLikesLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 300,
  statusCode: 429,
  message: message,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getAddress,
})

//Routes or Places Limiters

export const postPlaceOrRouteLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30,
  message: message,
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getAddress,
})

export const getPlacesOrRoutesLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 300,
  message: message,
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getAddress,
})

export const getPlaceOrRouteLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 300,
  message: message,
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getAddress,
})

export const updatePlaceOrRouteLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30,
  message: message,
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getAddress,
})

//Users Limiters

export const getUsersLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 50,
  message: message,
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getAddress,
})

export const userSignupLimiter = rateLimit({
  windowMs: 12 * 60 * 60 * 1000, // 24 hours
  max: 10,
  message: message,
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getAddress,
})

export const userLoginLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 10,
  message: message,
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getAddress,
})

export const getUserLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 50,
  message: message,
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getAddress,
})

export const updateUserLimiter = rateLimit({
  windowMs: 12 * 60 * 60 * 1000, // 12 hours
  max: 10,
  message: message,
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getAddress,
})

export const getUserOpsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 200,
  message: message,
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getAddress,
})

// Troubleshooting Proxy Issues

// If you are behind a proxy/load balancer (usually the case with most hosting services, e.g. Heroku, Bluemix, AWS ELB, Nginx, Cloudflare, Akamai, Fastly, Firebase Hosting, Rackspace LB, Riverbed Stingray, etc.), the IP address of the request might be the IP of the load balancer/reverse proxy (making the rate limiter effectively a global one and blocking all requests once the limit is reached) or undefined. To solve this issue, add the following line to your code (right after you create the express application):

// app.set('trust proxy', numberOfProxies)
// Where numberOfProxies is the number of proxies between the user and the server. To find the correct number, create a test endpoint that returns the client IP:

// app.set('trust proxy', 1)
// app.get('/ip', (request, response) => response.send(request.ip))
// Go to /ip and see the IP address returned in the response. If it matches your IP address (which you can get by going to http://ip.nfriedly.com/ or https://api.ipify.org/), then the number of proxies is correct and the rate limiter should now work correctly. If not, then keep increasing the number until it does.

// For more information about the trust proxy setting, take a look at the official Express documentation.
