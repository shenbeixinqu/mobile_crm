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

 // var token = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTY2Njg4OTIsImlhdCI6MTYxNjYzMjg5MiwiaXNzIjoiY3JtIiwiZGF0YSI6eyJpZCI6NTIsIm5hbWUiOiJcdTc2ZDhcdTUzZTRcdTZkNGJcdThiZDU1MiIsImV0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam8xTWl3aWFYTnpJam9pWlhKd0lpd2lhR1ZoWkdWeWN5STZleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjlMQ0psZUhBaU9qRTJNVFkyTmpFMk56Y3NJbWxoZENJNk1UWXhOall6TWpnM055d2lkWE5sY2w5dVlXMWxJam9pWEhVM05tUTRYSFUxTTJVMFhIVTJaRFJpWEhVNFltUTFOVElpZlEuUjdrTjAwSVNZbmhFRUFnZ1dsY2FFd0N3UEpOMVhhakhGWjIwdEZKRHBwVSIsImNsb3VkX2lkIjoyLCJ1bl9pZCI6MiwidW5fbmFtZSI6Ilx1NmM4OFx1OTYzM1x1NzZkOFx1NTNlNCIsImRlX2lkIjoxMywiZGVfbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsImRlcGFydHR5cGUiOjEwLCJwb3N0X25hbWUiOiJcdTYwM2JcdTc2ZDEiLCJsZXZlbCI6NzcsInN1cGVyX2lkIjoxNywia2EiOjIsImlwIjoiMTcyLjE4LjMuMTI5IiwibGFzdHRpbWUiOjE2MTY2MzI4OTAsInBvc3RzIjpbeyJpZCI6MCwiZG5hbWUiOiJcdTU5MjdcdTVlMDJcdTU3M2FcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn0seyJpZCI6MSwiZG5hbWUiOiJcdTU5MjdcdTViOWVcdTY1YmRcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn1dLCJwb3dlcnMiOiIxOTAzNjkxNjkyNTYyODI3ODU4MDM3ODAxNzc3ODEwOTIzNzA4MTc1NTM2MjU2NDc1MDA1Mzc4MzgxNzEwNjM1OTc0MzMxOTYxMjA0ODYxNjgzNTE3NzY1NjA1OTMxMDU3MTEwNjM4MjU5OTA3MzIzNjA4OTE1MDQ5MjU0NjI5OTIyNDAzMDM5ODU0NTc3MTk4NjM1MTU0MjgxMjY4OTY3NTg2NDgwMjk3NDE5MzM3MDc1OTc1OTgyMjIxNTQ0MzE1NjM3OTAxODc2OTYxNDYzMDQ3ODY5Mzk5NDYyODk5MTg5NTc4NjYzMzc5MTQzNzYxNjI3MTY0MjgwOTk0OTMwNjY0OTQ1MDMwNTQ1MDQ0NjgzODk0OTQwOTM5MDU1NDQ5MzM0OTM2MzIxNTE5NzYzNjEzMjkzNjk0NTQ2MDIzMDU2MjYxMzAwNDQwOTYyNzA2NzM5OTQ2OTkwNDQzNDM4NDg1NDY2MDA2NzYwNzIyNjg1NDg5Njc0NDA0NjIxODYxNTU1MjIxMzU0ODEyODk3MjcxNTk2ODcxNDg2Mzc1NDgyNzU4ODgxMDE0ODU5MjQ3OTQ0NzU4NTU2ODY0NzI2MjMxMzcxMTM5MzY1OTgxNjc2NzExNTU3NDQ5NDUxODA5ODA4ODU1MjY1NzM2OTAwODc2OTM4NjcyODc0MzkyODM4OTYwOTU1NDgyNzI5NDIxMDUzNzAzMDc3NjQzNzAzOTcyMDAwNDQ0NDEwNDA0MzA0OTk2OTA4MDEzMjA0NzExMTY5NDA3MTEzNDU5MTg5NzA2NTIxOTA2MjUwNTMxODgzNzY5MTU3MjY3NTU4MjU3ODI0NTI5ODU2NTA1Mjc3NDI3MzE3NzgwNTkxMDYzMjkwMDc4NzczOTA5MDYxMjA4MTM4MTEyNDExNDYzNDMyODA1NzE4NzYzMDM4NDg3NzIwNDA3OTg0OTE1ODkzMTkzOTQzOTQ0MDAxNTkyNDUwMzM2OTI0Njg1MDk2ODU1MDAwNzU5ODU1MjI3MTY2NjkyODMxODM4MDY0MzM4Nzc4ODcyNTA3NDczMDUzMzk0MjU3NDAxMjc3OTcwNjg4NTQyOTk1NDcyNjIxOTk3NjAwMjkyNjQ3NTkzNDc4OTA5MzUxMDY5ODYyNzgwMjI2ODUxMjY2ODU2OTMxNzk3MjA2MTI3OTQ0OTIzMzE1NjM0Nzk3NTM1NDcxMjY5MjYxNDA0NjI1NzYzNTI4MzE5OTU5MDAifX0.qffXuWrHBd-2nKxQu6_beX4VzDLq1VavJQa5cwKNXgc"
 // Vue.prototype.$token = token

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