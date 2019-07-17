const proxy = require('http-proxy-middleware')

module.exports = app => {
	app.use(proxy('/web', { target: 'http://vm3.busbox.com.cn:15000/hongkong-cms/' }))
}
