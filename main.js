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

var token = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTQwNzY5NjUsImlhdCI6MTYxNDA0MDk2NSwiaXNzIjoiY3JtIiwiZGF0YSI6eyJpZCI6NTIsIm5hbWUiOiJcdTc2ZDhcdTUzZTRcdTZkNGJcdThiZDU1MiIsImV0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam8xTWl3aWFYTnpJam9pWlhKd0lpd2lhR1ZoWkdWeWN5STZleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjlMQ0psZUhBaU9qRTJNVFF3TmprMk1qWXNJbWxoZENJNk1UWXhOREEwTURneU5pd2lkWE5sY2w5dVlXMWxJam9pWEhVM05tUTRYSFUxTTJVMFhIVTJaRFJpWEhVNFltUTFOVElpZlEuM210VmZwcGszYzUzbVFVM3ppNXVTT1VFYUJkMkdldXBzYi1vdGZrZVFvMCIsImNsb3VkX2lkIjoyLCJ1bl9pZCI6MiwidW5fbmFtZSI6Ilx1NmM4OFx1OTYzM1x1NzZkOFx1NTNlNCIsImRlX2lkIjoxMywiZGVfbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsImRlcGFydHR5cGUiOjEwLCJwb3N0X25hbWUiOiJcdTYwM2JcdTc2ZDEiLCJsZXZlbCI6NzcsInN1cGVyX2lkIjoxNywia2EiOjAsImlwIjoiMTcyLjE4LjMuMTI5IiwibGFzdHRpbWUiOjE2MTQwNDA5NjMsInBvc3RzIjpbeyJpZCI6MCwiZG5hbWUiOiJcdTU5MjdcdTVlMDJcdTU3M2FcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn0seyJpZCI6MSwiZG5hbWUiOiJcdTU5MjdcdTViOWVcdTY1YmRcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn1dLCJwb3dlcnMiOiIxNzQyODgxNzk4NjEwOTg3NDE4ODU3NzI3NzM2Nzk5MTU2MTk5NDg4Mzk5Mzk3MDI3NTQwODk1NzQ2OTgxNzc0Mjk2NTg3NDM2MDkxOTYyNDc5MjU3MzQwOTU1MDYyMDY2Nzk3MDY3NjE5NTcxNDYzNjUzOTQ5MTY0MzYyMjM0ODQwNDM1ODMxNTQ2OTgwMzAyODAzODk0Nzc1OTAyNTgxMzYyNTM1NzI4NzMxMzg2OTExMTQ5MzUyOTc5OTY2ODkyNzI1OTkzODQ3Nzk0NzMzMTQ3MjMxMjc1MjE0NDE3MzEyMTkyODQ0NzQwMzg4Mzc2MDM5NDI2NTE5NDkwNDEwMjk0MTMyODcwODI3MzA0NTk3OTExNzEzODExMDg5NDIwODcyMTc0MDI4NjUzNTYxMzAzOTI3OTczMTkwNTcwMTIxOTc4MjQ4MTY5ODk4NTU3MTkyODkwMDM3NTAwNTY4MjY3MzE5MzE5OTg2MjUxMTA2MTkzNjgyODQzMzY4Mjc5Mzg1NDk2OTE3MTU1NDU3NzY4NDgyMzIzOTMwNTAxOTIwNDc1MzE0MTI1ODYyNzIyNDk3NTY0OTE3NzYzODk5ODMxODk4NjU0MzIwNjQ2MjQ1NzQ0NzYzNzg0MDk0OTk5NzY3ODM5MjM3NTkxMDA5NDI4NTM4MzgwNDU3NjAwMjgxNTQ0Mzk3MzY1ODU3NjYyNTc3MzMyNTUzNjcyMzQ2NTM0NzgwNDA4NjQ3ODI2MTAwNjczMzIyMjU2MjA4NTQwODgxNDMyMzI3OTYyMjEyMjMyODQ2ODUzNjczNjkyNDcxMzgzNDEyMjg0NjkyODk1NzQ3MjQ0ODU3MzQxMDAxNjE1OTQ0MjA4OTcxODkxMjE4MjAyMjYxODczMTc2Mzc2Nzg3Nzk2MTY4MjAxNDI4MTI0NzkxMTQyMzA2MDA3MTAwOTAzNTQ4NzU2MjM1MTc1MjAxNTM2NTg5MzI2MDI4NjE4MDQwMDUyNjI5NTg3MzMwNjE0ODk3NTkwNTM0OTU0NjA5MjE3MzYxOTU4ODA4MDA3MDc3MjkxNjczMDA2NTE1Mzk1Mjk3Mzk1ODQzOTg1OTAxNzUxNTAxODQ0MDE2MTcxMzc4MjM2MDExMjYxNTM2MDg2Nzc4ODk1NDM3MDM0NjEzNDk2Nzk4MzMzNzc2ODM5ODU5NDA3NDQxNzE1Mjc5NTg1Njc0MzE1OTg1NzY1Mjc4MTIzMjY4NTA1MiJ9fQ.Dm32WzgJxtlA3VD1apPFLwDx4VSpL__YKelVmnOfq3A"
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