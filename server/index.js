require('dotenv').config()
const Koa = require('koa')
const koaBody = require('koa-body')
const koaJson = require('koa-json')
const router = require('./routes')

const app = new Koa()

app.use(koaBody())
app.use(router.routes())
app.use(koaJson())

const port = process.env.SERVER_PORT || 3000
app.listen(port, () => {
  console.log(`server is running ${port} successfully.`)
})
