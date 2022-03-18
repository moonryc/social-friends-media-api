const router = require('express').Router()
const thoughtsRouter = require('./thoughts-routes')
const userRoutes = require('./user-routes')


router.use('/users',userRoutes)
router.use('/thoughts',thoughtsRouter)




module.exports = router