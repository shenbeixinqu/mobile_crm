import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

//多级联动
import LbPicker from '@/components/lb-picker'
Vue.component("lb-picker", LbPicker)

// 底部footer
import FootPart from '@/components/footer.vue'
Vue.component('foot-part',FootPart)

// 基础url
var baseUrl = 'http://61.161.147.138:8098'
Vue.prototype.$burl = baseUrl
// 基础图片URL
Vue.prototype.$imgurl = 'http://61.161.147.138:8098'

var token = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTQzNDAwNjYsImlhdCI6MTYxNDMwNDA2NiwiaXNzIjoiY3JtIiwiZGF0YSI6eyJpZCI6NTIsIm5hbWUiOiJcdTc2ZDhcdTUzZTRcdTZkNGJcdThiZDU1MiIsImV0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam8xTWl3aWFYTnpJam9pWlhKd0lpd2lhR1ZoWkdWeWN5STZleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjlMQ0psZUhBaU9qRTJNVFF6TXpJM01qQXNJbWxoZENJNk1UWXhORE13TXpreU1Dd2lkWE5sY2w5dVlXMWxJam9pWEhVM05tUTRYSFUxTTJVMFhIVTJaRFJpWEhVNFltUTFOVElpZlEuenQwMFQ1VGR6cUlFN3ZxN1QwTVlnbThfY3NjaFhJZlpaWHpwMEFwZVl4VSIsImNsb3VkX2lkIjoyLCJ1bl9pZCI6MiwidW5fbmFtZSI6Ilx1NmM4OFx1OTYzM1x1NzZkOFx1NTNlNCIsImRlX2lkIjoxMywiZGVfbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsImRlcGFydHR5cGUiOjEwLCJwb3N0X25hbWUiOiJcdTYwM2JcdTc2ZDEiLCJsZXZlbCI6NzcsInN1cGVyX2lkIjoxNywia2EiOjAsImlwIjoiMTcyLjE4LjMuMTYxIiwibGFzdHRpbWUiOjE2MTQzMDQwNjQsInBvc3RzIjpbeyJpZCI6MCwiZG5hbWUiOiJcdTU5MjdcdTVlMDJcdTU3M2FcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn0seyJpZCI6MSwiZG5hbWUiOiJcdTU5MjdcdTViOWVcdTY1YmRcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn1dLCJwb3dlcnMiOiI5Mjk1MzY5NTkyNTkxOTMyOTAwNTc1MDgxMDMwMDk1MTAyODgxMzgxNDY3MTI2Mjk5MzA0NzAzNDA2OTEzNzcyMjY5OTUyMjg2ODgxNDIzODQyNzMzMDQ2MjU1NzAxNjk4OTUzMDU1NjQxMzU2OTc2OTU5NzU5OTg4NTE2Njk1OTkyODM2MjEyOTAxNzAzMTk4MDE5MTA2Nzk3NzIxNTAxOTMxNjgxMzI3MTYzNDc4ODY1MjYwMTI5MjM4ODIyNjAyMjI0NTY3MTMzNjM2NjI0NzYxNjEwNjQwMjM3Njc4MTc1NTI3MTU2MDk1NDMxMzU3ODAwMzgwNTc1Mjc4MTYxMjc3MDU5ODE1MjY1NDA4MzMzOTQ2NDQwMTQ1NTc5NzY4MjgzNzM3Njg0MDQ0Njg2MDI5NTE4ODExNDI3MDA1MzIzNzc1MzQ1NzYxMDI4NDMzNzQ4MjM2MTk4NzIxMjU0NDIxNTM2OTcyNzkzMDM2OTkxMDAxNzQyNjAxNzIyNjc3Mjg1MjA3ODE4OTIwODUzNjQxMzQwNTQwMDcyNTM3NjA3ODU5OTkyMjE4MDU5NjAxODAyODk0ODc1OTM3MDQzNDM1Njg3OTQ2MDUzNjcxODY1MTI0OTM1MDYxNTk3NDcwOTQyODE0ODQ0NTM1NzkzNjcyNzA4NjA5OTEyNTM1NzkxNDE3NDE3NTQxMzEwMDc2NDMxMDE3ODI5NTQ1ODE1NDY0MzE2MzU4NjcxNzM3MjA4NjUzOTE3MzgxMjk5NDUzNzE1NjgzNDIzMjg5NzQ5OTUzNzExOTcwMjU4NTk4NDYwNDA5MjgwODAzMTU3MDc3NDg2ODg1NTcyMDMwNzkxMTk3MDI1NTY4OTM5ODYzMTAzMzk1MjM4OTE5ODM2MTU5Nzc5NTI5MDk3NTg3Njk2Mzc0Nzc3NTAzMzgxMDk0MjI1NjI2NTAyMTk2MDc4NzQ2NDUxNjE1MDg5MjY1NzA0NTc4OTEzMDMyMzU5NDAxNjk1NTk4NzkzNTQ0NzM5OTE4MDA5MTU0Mzg0ODU3NjUzMDI1ODMwOTA3NTY0MTA3MzI5MDM5NTY5MjgyNjQ3NjkxMjA1ODAzNTk5Mjg0MjY4MzI3ODIxNjk4NTQ1NjcyMTE4NzQzNDY1NjY4Nzk2MjEwNDE3NDA1NDMzNDU2OTE1NzcwMDA1MDUzMjcxMDE4OTYxOTY0MDgzNjMxMTkzNjE5MTg3OTYyMjQyNjYyMCJ9fQ.HpfDoOuIUBYORj-6LN8ofOj48i5ovK7R8LQgr5WAXLs"
Vue.prototype.$token = token

const app = new Vue({
    ...App
})
app.$mount()

export default {
	config: {
		baseUrl: baseUrl,
		header: {
			'Content-Type': 'application/json;charset=UTF-8',
			'Content-Type': 'application/x-www-form-urlencoded',
			// "Authorization": 'JWT ' + getToken()
			
		},
		data: {},
		method: "GET",
		dataType: "json",/* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
		
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		if (!options) {
			options = {}
		}
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method
		
		return new Promise((resolve, reject) => {
			let _config = null
			options.complete = (response) => {
				let statusCode = response.statusCode
				response.config = _config
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				if (statusCode === 200) {
					resolve(response);
				} else {
					reject(response)
				}
			}
			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()
			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}
			_reqlog(_config)
			uni.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}