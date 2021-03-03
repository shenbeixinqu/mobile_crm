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

var token = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTQ3NjgwMzgsImlhdCI6MTYxNDczMjAzOCwiaXNzIjoiY3JtIiwiZGF0YSI6eyJpZCI6NTIsIm5hbWUiOiJcdTc2ZDhcdTUzZTRcdTZkNGJcdThiZDU1MiIsImV0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam8xTWl3aWFYTnpJam9pWlhKd0lpd2lhR1ZoWkdWeWN5STZleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjlMQ0psZUhBaU9qRTJNVFEzTmpBMk9EQXNJbWxoZENJNk1UWXhORGN6TVRnNE1Dd2lkWE5sY2w5dVlXMWxJam9pWEhVM05tUTRYSFUxTTJVMFhIVTJaRFJpWEhVNFltUTFOVElpZlEuX3BaWlVSN2Z4SXZZejFFamdfbnRvWXlBQS0zcG5VYzRsa2FaRlRnM2g3TSIsImNsb3VkX2lkIjoyLCJ1bl9pZCI6MiwidW5fbmFtZSI6Ilx1NmM4OFx1OTYzM1x1NzZkOFx1NTNlNCIsImRlX2lkIjoxMywiZGVfbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsImRlcGFydHR5cGUiOjEwLCJwb3N0X25hbWUiOiJcdTYwM2JcdTc2ZDEiLCJsZXZlbCI6NzcsInN1cGVyX2lkIjoxNywia2EiOjAsImlwIjoiMTcyLjE4LjMuMTI5IiwibGFzdHRpbWUiOjE2MTQ3MzIwMzYsInBvc3RzIjpbeyJpZCI6MCwiZG5hbWUiOiJcdTU5MjdcdTVlMDJcdTU3M2FcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn0seyJpZCI6MSwiZG5hbWUiOiJcdTU5MjdcdTViOWVcdTY1YmRcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn1dLCJwb3dlcnMiOiI5Mjk1MzY5NTkyNTkxOTMyOTAwNTc1MDgxMDMwMDk1MTAyODgxMzgxNDY3MTI2Mjk5MzA0NzAzNDA2OTEzNzcyMjY5OTUyMjg2ODgxNDIzODQyNzMzMDQ2MjU1NzAxNjk4OTUzMDU1NjQxMzU2OTc2OTU5NzU5OTg4NTE2Njk1OTkyODM2MjEyOTAxNzAzMTk3OTk1ODQ0MTY5ODE1NDkyNzYwNjA3NjU5NDQ4OTQ1NzI3NzUwMjU2MTAxMjY2OTcyNzc3MTEyNjQzNDA3MTM0NzM4Nzc1OTc5Mjg3MjA4ODM4NTAxMjAyNTI4NDg5NjczMjgwOTk4MDA3ODc1NjU2MzIyODc1MDk3NzM0MjI1OTY3MzE2ODQwODMxMDA5NTc4NTYyMDgxNjQ1NzYxNDE0Nzg5OTU0Mjg0OTg4MDA2NTgyNjM3NzQ4Njc1NzIxMjc0OTQyMDUzODQ2NzI0NjczMjc4MzkzMzIxMTAxNzIxNjQxNTM5MjA1MTUwOTg0MTQ3NjEzMDg5MTE1ODMxODAxMDE5NTk5MDQ2NjU5MjExNTM2MTU3MzM3NzQ0MjIyMjk2MzY0ODY3MTk3MTcyMzYxMzczOTU3MDUzNTQzNzQ4OTQ3NDQzNzUzMTUyNjk4ODk2Mzk3MDc0MDc3MDc0ODQyNDE4NjI0OTM1ODgzODEzMjkxMTU2MjE3NjAyOTI0NDg0NjkxOTY4NDQ2MzE0MjQzMjM4MTQ5NzU5MzUzMjcyNjU2MzI3NzE3MjU4NzI5NDMxNDkzODE1MTUyNDE2ODY4NDUzODM4OTQ4MzYwMDg5NjU1ODI3OTUyMTIxMTM4NjI1NjE4ODg5NzIwNTcxNjgxMjI2MTQ3NTk0MzUxNDk3ODc3NTM4MDY5OTQzNDgzNDI4MDg0MDkzMjc0NTgyNjczNTU5MzgwMjc2Mjg2Njk2MTYyNzgxOTY4NDEwNTU1MzUwNDQ0NDI5NDUyMDY4MjQ1ODEwMTg4MjU1ODg4MjA5NDk0NTU1NTI0NTE5MDk2MDEwNDkxNjUyNDMyODg4Njk2MTUzNTA1NTU2NzEzMzc5MDU3OTQ1NTAzODA5MzUyNDk5NjA2NzA2MDA0MjEzMzY1MTM4Mzk5OTExNzU5NjAyODgzNzk5NTA0NDAxNjA2NjUyNjkwODc1MzM0NzM2NjU0MTI0NjU5MjA0OTEyOTU4NTc5MzcwMjkyNzcyNTk4NDU3MTE3MDcwNDA2NDUwOCJ9fQ.RutVosX8Hwkg4ye8k8l8JmPTSnlB_zo5maeHsIQB9Cs"
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