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

var token = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTQxNjMyNTYsImlhdCI6MTYxNDEyNzI1NiwiaXNzIjoiY3JtIiwiZGF0YSI6eyJpZCI6NTIsIm5hbWUiOiJcdTc2ZDhcdTUzZTRcdTZkNGJcdThiZDU1MiIsImV0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam8xTWl3aWFYTnpJam9pWlhKd0lpd2lhR1ZoWkdWeWN5STZleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjlMQ0psZUhBaU9qRTJNVFF4TlRVNU1UVXNJbWxoZENJNk1UWXhOREV5TnpFeE5Td2lkWE5sY2w5dVlXMWxJam9pWEhVM05tUTRYSFUxTTJVMFhIVTJaRFJpWEhVNFltUTFOVElpZlEuYnNWeHdWdXU5NWJsLVlZV3hFVTI5U1d4ZnFsTHpGcVd1djR2SmU3VFpKQSIsImNsb3VkX2lkIjoyLCJ1bl9pZCI6MiwidW5fbmFtZSI6Ilx1NmM4OFx1OTYzM1x1NzZkOFx1NTNlNCIsImRlX2lkIjoxMywiZGVfbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsImRlcGFydHR5cGUiOjEwLCJwb3N0X25hbWUiOiJcdTYwM2JcdTc2ZDEiLCJsZXZlbCI6NzcsInN1cGVyX2lkIjoxNywia2EiOjAsImlwIjoiMTcyLjE4LjMuMTYxIiwibGFzdHRpbWUiOjE2MTQxMjcyNTQsInBvc3RzIjpbeyJpZCI6MCwiZG5hbWUiOiJcdTU5MjdcdTVlMDJcdTU3M2FcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn0seyJpZCI6MSwiZG5hbWUiOiJcdTU5MjdcdTViOWVcdTY1YmRcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn1dLCJwb3dlcnMiOiI4NzE0NDA4OTkzMDU0OTM3MDk0Mjg5MTMwNzc2NzY0NjQ1NDQ0MzEyNzY5NjA4NjYzMDE1MTc5NzQwNzY1MTU3MDQxMjMxOTEzMjg4NDk0NzUwMTQyMTQ0MjA4NTAxODA4ODg1NzY5MjEwOTYwNzY5NjMwNTcwMDk3MTUwODcwMzUzODgzODg4MDkyOTc1NzY1NjEwNTE5MjE0NzgzODE5ODk2NTAzMzc2NDU5OTg1NTI0MDA5MTM5MTY1MTE2NjAzNzA5MDk3MTk4ODcwNTczNTA4NjMyMDg4OTUzNjMzNTY5MjM2ODI4OTc3MzYxNzczMTkzMzY2OTIwMTA5MjM5OTMxNjUzNTkzMzc4MDkyMjgwOTU5OTAwMjQ2NzkzODI3MDE0ODUwNTI0OTc5MjI1MjU5NTE2NTM1NDgyMzcyNjUwNzU3MjU3NjA3MTI2OTY0ODU4MTUyNTY4NzcxNjYzMjczMjQ0NDY1NDk2NTIwOTU0ODM0Njk3NzU5MTIzMTYzNDk4Mjg1MjMyODQ4Njk3NDQ4Nzg1OTUxMjg1NDc0NjI5NDQ4OTkwNDQxODQ2ODIyMjQ0MjU5OTQyNDkxMzkwMzY2NDczOTY0NjA4Mjc3ODc1MzUzMzk0NjMxMjM0Mzk4MTUzNDUwNzg4MjEzOTYyMzUyNzg5NTMxOTY2MjQ1OTAxNTExNjgyMzMwNTU0OTIwODI2MjEyODI4NTQzNzgxNzM4NDA2ODI0ODgwMTc1NzM5MDcyNjEzNDEzNzU3NDMwNjY3NzM5NTk2NTEwODQxNzA4MzkwNzUyMDUyMTg4MDU3NDkwOTE2ODAxNzQzMzAyNDY3Njg5MjY0MDIxODk0Mzc5OTIzNzMyMDA4MzI2MTExMzA5NjYzOTIzOTM1NzcwNzQyOTA4MTUyMjEwMTY2MDcwODkxNDc1NjY5MTMzMzIzNzg3Njk0MTUzNjQ4NDAyNzY0NjY4NjY4NzU4ODUzMDU3Mjg2ODY2NzkyMzIyOTM5NDEzNzU0OTExMzUwNzIwMDUzNzk3MTc2MzMwMTQ4OTc3NjgxMTg3ODM2ODI1NzE1OTQxMzA0NTYyMDI0MzY5MzY2NzQ3OTg5MDYxOTIwNTQ1OTkwNjU1OTAxNzU1ODMwMjU3NTAzNTIyMjMzNjY2ODY3NzM3MTc3MjM0NTMwNDU2ODUxODk3OTkzNDI1NTYwNDcwMzUwMTY0MDg2MjAyMzI4NjI4ODgwOTk4MCJ9fQ.e2zHI4WexrM8bL250vyaXHk7kbtXHg4xOH7jqnY-dfM"
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