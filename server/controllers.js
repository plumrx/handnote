const { join } = require('path')
const crypto = require('crypto')
const level = require('level')
const userDB = level(join(__dirname, 'database/user'))

module.exports = {
  async register (ctx) {
    return new Promise((resolve, reject) => {
      let { username, password } = ctx.request.body
      if (!username || !password) return reject([400, '用户名或密码必须存在'])
      if (!username.match(/^\w+$/)) return reject([400, '用户名只能是英文、数字或字母'])
      userDB.get(username)
        .then(() => reject([422, '已存在的用户名']))
        .catch(err => {
          if (!err.message.match(/Key not found/)) {
            console.error(err)
            return reject([500, err.message])
          }
          password = hash(password + username)
          userDB.put(username, JSON.stringify({ password, createdAt: +new Date() }))
            .then(() => resolve())
        })
    })
      .then(({ username, password }) => {
        ctx.status = 201
        ctx.cookies.set('handnote_username', username)
        ctx.cookies.set('handnote_access_token', password)
        ctx.body = { username, accessToken: password }
      })
      .catch(err => ctx.throw(...err))
  },

  async login (ctx) {
    return new Promise((resolve, reject) => {
      let { username, password } = ctx.request.query
      if (!username || !password) return reject([400, '用户名或密码必须存在'])
      if (!username.match(/^\w+$/)) return reject([400, '用户名只能是英文、数字或字母'])
      userDB.get(username)
        .then(user => {
          user = JSON.parse(user)
          password = hash(password + username)
          console.log(password, user.password)
          if (user.password !== password) return reject([400, '密码错误'])
          resolve({ username, password })
        })
        .catch(err => {
          if (err.message.match(/Key not found/)) return reject([400, '用户不存在'])
          console.error(err)
          return reject([500, err])
        })
    })
      .then(({ username, password }) => {
        ctx.status = 200
        ctx.cookies.set('handnote_username', username)
        ctx.cookies.set('handnote_access_token', password)
        ctx.body = { username, accessToken: password }
      })
      .catch(err => ctx.throw(...err))
  },

  async deleteUser (ctx, next) {
    return new Promise((resolve, reject) => {
      const { username } = ctx.params
      const { password, supertoken } = ctx.query
      if (!username) return reject([400, '请输入用户名'])
      if (!username.match(/^\w+$/)) return reject([400, '用户名只能是英文、数字或字母'])
      if (supertoken) {
        if (supertoken !== process.env.ADMIN_TOKEN) return reject([400, '管理员密码错误'])
        // 管理员密码验证通过
      } else if (!password) {
        return reject([400, '请输入密码'])
      } else {
        userDB.get(username)
          .then(user => {
            user = JSON.parse(user)
            if (user.password !== hash(username + password)) return reject([400, '密码错误'])
          })
      }
      userDB.del(username)
        .then(() => resolve())
    })
      .then(() => {
        ctx.status = 204
      })
      .catch(err => ctx.throw(...err))
  },
}

function hash (password) {
  const hmac = crypto.createHmac('sha256', 'ILoveMRX!')
  hmac.update(password)
  return hmac.digest('hex')
}
