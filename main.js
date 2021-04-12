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

// var token = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTc5ODgwNjIsImlhdCI6MTYxNzk1MjA2MiwiaXNzIjoiY3JtIiwiZGF0YSI6eyJpZCI6NTIsIm5hbWUiOiJcdTc2ZDhcdTUzZTRcdTZkNGJcdThiZDU1MiIsImV0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam8xTWl3aWFYTnpJam9pWlhKd0lpd2lhR1ZoWkdWeWN5STZleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjlMQ0psZUhBaU9qRTJNVGM1T0RBNE1EZ3NJbWxoZENJNk1UWXhOemsxTWpBd09Dd2lkWE5sY2w5dVlXMWxJam9pWEhVM05tUTRYSFUxTTJVMFhIVTJaRFJpWEhVNFltUTFOVElpZlEuMmNTS292WThsQ0Y3cnhMM1h5RnVRdDJxUVVsUm80cEV4b19EbGowUWJaNCIsImNsb3VkX2lkIjoyLCJ1bl9pZCI6MiwidW5fbmFtZSI6Ilx1NmM4OFx1OTYzM1x1NzZkOFx1NTNlNCIsImRlX2lkIjoxMywiZGVfbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsImRlcGFydHR5cGUiOjEwLCJwb3N0X25hbWUiOiJcdTYwM2JcdTc2ZDEiLCJsZXZlbCI6NzcsInN1cGVyX2lkIjoxNywia2EiOjIsImlwIjoiMTcyLjE4LjMuMTI5IiwibGFzdHRpbWUiOjE2MTc5NTIwNjAsInBvc3RzIjpbeyJpZCI6MCwiZG5hbWUiOiJcdTU5MjdcdTVlMDJcdTU3M2FcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn0seyJpZCI6MSwiZG5hbWUiOiJcdTU5MjdcdTViOWVcdTY1YmRcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn1dLCJwb3dlcnMiOiI5Mjk1MzY5NTkyNTkxOTMyOTAwNTc1MDgxMDMwMDk1MTAyODgxMzgxNDY3MTI2Mjk5MzA0NzAzNDA2OTEzNzcyMjY5OTU3NjczNDgwMzcyNTIzNTY4NjY1NjM4NjY0NzAzOTcxMTc1ODAwNzEzMTQ4NzYzMTc1NzI4Mjk2NzE5Njg3MTU2MDk0MTQ0ODA4ODA0MTk5MTY4OTczNjM5Njg5NDI1Mjg4NTQ4NjUwNzUyNDI4NTg1OTIwODkyNzk0OTczNDM1NDQzMzA0OTc3NjIwODkxODI5OTYwOTkyNTkwNjc4MjQwOTczODQ1NDM3MDgwODA2MjUxMDk1MzAwNDk1Mzk4NTk4Mzc3NTQ3MzExMDMzMzE2Mzc2OTY2NTgzMDcyMDQzNDczMTcwNDA1MTkzNjU5MjQyOTQ1ODE0Mjk5MzEzNDY5MDk3MjgxODgyNzQwMjU1Mzc0MTA3OTc1NzEyOTkwNDc4MTQ5NzM3NjkxNzY4OTkyNDU3Mzk2OTQyMzQ2MTYxMzczNzM4MDkwOTczMDI2NTAyNDU1NTY4ODE1NTkxMzk4MTAwMDcyOTU4NTQxNTAzNDY1MjMwODQxMzY0MTUyMzI0NDMzOTIwODE0MDUwMzMwMDcwNzI5NjM2ODkzMjQzNzI5NzA1MzY3MjQ3MDU5OTQ1OTg2Nzk5OTUwMTM3MjY4NzQ1NTc3NTMwNTEyMjIzMjEyNzE5NDQ1MjcxOTIyMzQ2MDQ4MzkzNzEwMTYzNDkzMzY3NDM5NTU5NjExNDYxODEwMjE3MzE4MTgxNzEyMDg3ODYxNjc5Njg1MzA1MDAxMDY3MjI2NjIxNDM2MDY2MjM3NzYxNDE3OTY4OTk4NDY3Njc4NzI4NjQxODI1MjE4ODczMDgxOTg2NTQwNjAwNzAxNTk3OTUxNjgxNjg3NjAwNDIxNDM4NjM0MjA3ODk0MjEwNzE0NDUwODk0NTM1Mzk0OTc2MjM0MDQ5MTEwMzQ0MDI0NjE1MjMzMDI1NzYyNjA4MzE5ODU4NTk4ODY1ODA3Njg5NjE1Njg0NzA3NDExMTgyNTA1MTQ0Nzk1OTc3MDEzODM0MDQxMzM2NTE0NjE4MTU4Njc0OTM1MTc5MDI4ODg3NjkwODY1ODk0NzM0ODM5MDY3MzMzNzcyMjM2MzgyMjQ0NDg4MTk2NDc5MDk4NTA3NjgwODU1ODU3ODM4MTg4NzUxNDE4NzMxNjUwMTU0Nzg0MzU4MCJ9fQ.hHMJpElrtHrMC-1jUtC-Xu7hhyD8RjY6eFJPOAXa0_Y"
//  Vue.prototype.$token = token

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