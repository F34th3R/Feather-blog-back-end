const jwt = require('jsonwebtoken')

const tokenVerify = req => {
  if (req.token_expired) {
    throw new Error('Token expired! 😢')
  }
  if (!req.isAuth) {
    throw new Error('Unauthenticated! 💔')
  }
}

const authMiddleware = (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    req.isAuth = false
    return next()
  }

  const token = authHeader.split(' ')
  if (!token || token === '') {
    req.isAuth = false
    return next()
  }

  if (token[0] !== 'Bearer') {
    req.isAuth = false
    return next()
  }

  let decodedToken
  try {
    decodedToken = jwt.verify(token[1], process.env.TOKEN_KEY)
  } catch (err) {
    req.token_expired = true
    req.isAuth = false
    return next()
  }

  if (!decodedToken) {
    req.isAuth = false
    return next()
  }

  req.isAuth = true
  req.userId = decodedToken.userId
  next()
}

exports.authMiddleware = authMiddleware
exports.tokenVerify = tokenVerify
