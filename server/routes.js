const Router = require('koa-router')
const Controller = require('./controllers')
const router = new Router({
  prefix: '/api',
})

router.post('/register', Controller.register)
router.get('/login', Controller.login)
router.delete('/user/:username', Controller.deleteUser)

module.exports = router
