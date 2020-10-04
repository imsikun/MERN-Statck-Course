var express = require('express')
const { check, validationResult } = require('express-validator')
var router = express.Router()

//importing controllers
const { signup, signin, signout, isSignedIn } = require('../controllers/auth')

router.post(
  '/signup',
  [
    check('name')
      .isLength({ min: 3 })
      .withMessage('Name should be at least 3 characters'),
    check('email')
      .isEmail()
      .withMessage('Email is required'),
    check('password')
      .isLength({
        min: 4
      })
      .withMessage('Password should be at least 4 charaters')
  ],
  signup
)
router.post(
  '/signin',
  [
    check('email')
      .isEmail()
      .withMessage('Email is required'),
    check('password')
      .isLength({
        min: 4
      })
      .withMessage('Password field is required')
  ],
  signin
)

router.get('/signout', signout)

// router.get('/testroute', isSignedIn, (req, res) => {
//   res.send('A protected route')
// })

module.exports = router
