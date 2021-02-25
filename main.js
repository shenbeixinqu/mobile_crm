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

var token = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTQyNDk1MTAsImlhdCI6MTYxNDIxMzUxMCwiaXNzIjoiY3JtIiwiZGF0YSI6eyJpZCI6NTIsIm5hbWUiOiJcdTc2ZDhcdTUzZTRcdTZkNGJcdThiZDU1MiIsImV0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam8xTWl3aWFYTnpJam9pWlhKd0lpd2lhR1ZoWkdWeWN5STZleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjlMQ0psZUhBaU9qRTJNVFF5TkRJeE5qY3NJbWxoZENJNk1UWXhOREl4TXpNMk55d2lkWE5sY2w5dVlXMWxJam9pWEhVM05tUTRYSFUxTTJVMFhIVTJaRFJpWEhVNFltUTFOVElpZlEuNUFLblFRTmxfU0pYcnpmUEdhOVRqMXg0dnpyV0ZWajZid21WWm5aby1ZSSIsImNsb3VkX2lkIjoyLCJ1bl9pZCI6MiwidW5fbmFtZSI6Ilx1NmM4OFx1OTYzM1x1NzZkOFx1NTNlNCIsImRlX2lkIjoxMywiZGVfbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsImRlcGFydHR5cGUiOjEwLCJwb3N0X25hbWUiOiJcdTYwM2JcdTc2ZDEiLCJsZXZlbCI6NzcsInN1cGVyX2lkIjoxNywia2EiOjAsImlwIjoiMTcyLjE4LjMuMTYxIiwibGFzdHRpbWUiOjE2MTQyMTM1MDgsInBvc3RzIjpbeyJpZCI6MCwiZG5hbWUiOiJcdTU5MjdcdTVlMDJcdTU3M2FcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn0seyJpZCI6MSwiZG5hbWUiOiJcdTU5MjdcdTViOWVcdTY1YmRcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn1dLCJwb3dlcnMiOiI4NzE0NDA4OTkzMDU0OTM3MDk0Mjg5MTMwNzc2NzY0NjQ1NDQ0MzEyNzY5NjA4NjYzMDE1MTc5NzQwNzY1MTU3MDQxMjMxOTEzNzgxNzEyODIwMTU5MzEyNjUxMjQ4Mzg3MTEyMzMwNTA4NzQxMjAxNDYxNzA4MjQ0MTE3NjQzMDMzMzgyMjA4MTg5NTM2OTA5NDUxODg4MDk0NDgxMzk4NzIwNTE3MzU2NTE5NDI4OTgwODU1MTQ0MTM5OTE3NDM5NTA0NTQyNjU3MDU1OTIwNTgwMzcxMTY3MjY5NjI0MTczMTE2NjczMjk3NzcyOTIwODYyMjI4MzQ2MDQyMDQwMzk5MTU1MzM4Mjc2MTM0MDExMzcxMjY2MzM3ODgxODExNDAyNjA2NzI2MTMyMTM0ODk2MjA5NDg3MDc1MDQ5OTQ1MjkzNzE1MTIyODcwNDE3NTYyMjE2MTczOTcxOTk3NTc2NzIxOTQ4NTQxNTA2NTQ2MDQ0MDIzODQxMzA5MDM0NDExMzQ5NzE5OTAzNTk4NDgzOTQ3MTI1NDQ2OTU0NTcxMjE5NDAwNzE3OTcyNjM3NDI5Njg5NTU0MDgwMzYwMTgxMTU4ODM1MjYzMjk5NTgxOTYxNTIxMjAxNjM4ODMwMjczNzgyMjQ4NTYzMjc0OTI3OTkxNzAzOTU4NDU1MjkwMTg2Mzk2NTc3NDA4OTAxMzU2MTQxODI3ODM2Mjc5MzkwODkyODY0MDk1OTk1NTgxMzU0NDMxNzc5OTY4NTkyMDE5ODMwNDI3NDU5MjgyMTkwMDEwMDUyMDk5MTg5NjA3NTc0Nzc0Njc0NTcwNjg3NjU5NzA5MjI2MzAxMzAyODQyMzYxNjgwOTg0NDMxOTQxODUwNTk0Mjg2ODE2MjM0MzQxMjk1MDk1OTU4NDkwNjY1NzAyMzg1ODI3NzA1NDA5NDM0NjAzNDY2NTE5NTkzMjk3OTQ1MjE5MTM2NDc3ODEwMzY2NDgwNjE1NjEwMTE2NTE2NDc4MDYwMjc2NDM5OTgzMTQ0MDk1Njg1ODQ5Nzc2MjkxMzAwMDU5OTE3MzgwNDg4MTg4MTY5OTQ5OTYwNDU3OTA2NjkxNzk4NTYzOTU2NzUwMDgzNTMzNTQwNTI2NTQxMDA5OTkyODcyMDg2NTE2MDkwMTQxNDg1ODIwMTIzMTY0NDE1MzI2NzI3NDY3ODAyNjQ3OTIwNDAyMTcyOTMxMjI5MjczMjkyNCJ9fQ.qkxVjUTWyvIaOnEVoOeCzMdRPdpBGaj_L3lBrN0RkE8"
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