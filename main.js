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

var token = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTM3ODMyMjcsImlhdCI6MTYxMzc0NzIyNywiaXNzIjoiY3JtIiwiZGF0YSI6eyJpZCI6NTIsIm5hbWUiOiJcdTc2ZDhcdTUzZTRcdTZkNGJcdThiZDU1MiIsImV0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam8xTWl3aWFYTnpJam9pWlhKd0lpd2lhR1ZoWkdWeWN5STZleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjlMQ0psZUhBaU9qRTJNVE0zTnpVNE9UWXNJbWxoZENJNk1UWXhNemMwTnpBNU5pd2lkWE5sY2w5dVlXMWxJam9pWEhVM05tUTRYSFUxTTJVMFhIVTJaRFJpWEhVNFltUTFOVElpZlEuYWVoLXV4bjluNndLQ2ZFUVVqUnJPMFd4NV9wX19fN0xDR285c3JxVHNLMCIsImNsb3VkX2lkIjoyLCJ1bl9pZCI6MiwidW5fbmFtZSI6Ilx1NmM4OFx1OTYzM1x1NzZkOFx1NTNlNCIsImRlX2lkIjoxMywiZGVfbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsImRlcGFydHR5cGUiOjEwLCJwb3N0X25hbWUiOiJcdTYwM2JcdTc2ZDEiLCJsZXZlbCI6NzcsInN1cGVyX2lkIjoxNywia2EiOjAsImlwIjoiMzYuMTI4LjEyNi44NSIsImxhc3R0aW1lIjoxNjEzNzQ3MjI1LCJwb3N0cyI6W3siaWQiOjAsImRuYW1lIjoiXHU1OTI3XHU1ZTAyXHU1NzNhXHU5MGU4IiwibmFtZSI6Ilx1NjAzYlx1NzZkMSJ9LHsiaWQiOjEsImRuYW1lIjoiXHU1OTI3XHU1YjllXHU2NWJkXHU5MGU4IiwibmFtZSI6Ilx1NjAzYlx1NzZkMSJ9XSwicG93ZXJzIjoiMTc0Mjg4MTc5ODYxMDk4NzQxODg1NzcyNzczNjc5OTE1NjE5OTQ4ODM5OTM5NzAyNzU0MDg5NTc0Njk4MTc3NDI5NjU4NzQzNjA5MTk2MjQ3OTI1NzM0MDk1NTA2MjA2Njc5NzA2NzYxOTU3MTQ2MzY1Mzk0OTE2NDM2MjIzNDg0MDQzNTgzMTU0Njk4MDMwMjgwMzg5NDc3NTkwMjU4MTM2MjUzNTcyODczMTM4NjkxMTE0OTM1Mjk3OTk2Njg5MjcyNTk5Mzg0Nzc5NDczMzE0NzIzMTI3NTIxNDQxNzMxMjE5Mjg0NDc0MDM4ODM3NjAzOTQyNjUxOTQ5MDQxMDI5NDEzMjg3MDgyNzMwNDU5NzkxMTcxMzgxMTA4OTQyMDg3MjE3NDAyODY1MzU2MTMwMzkyNzk3MzE5MDU3MDEyMTk3ODI0ODE2OTg5ODU1NzE5Mjg5MDAzNzUwMDU2ODI2NzMxOTMxOTk4NjI1MTEwNjE5MzY4Mjg0MzM2ODI3OTM4NTQ5NjkxNzE1NTQ1Nzc2ODQ4MjMyMzkzMDUwMTkyMDQ3NTMxNDEyNTg2MjcyMjQ5NzU2NDkxNzc2Mzg5OTgzMTg5ODY1NDMyMDY0NjI0NTc0NDc2Mzc4NDA5NDk5OTc2NzgzOTIzNzU5MTAwOTQyODUzODM4MDQ1NzYwMDI4MTU0NDM5NzM2NTg1NzY2MjU3NzMzMjU1MzY3MjM0NjUzNDc4MDQwODY0NzgyNjEwMDY3MzMyMjI1NjIwODU0MDg4MTQzMjMyNzk2MjIxMjIzMjg0Njg1MzY3MzY5MjQ3MTM4MzQxMjI4NDY5Mjg5NTc0NzI0NDg1NzM0MTAwMTYxNTk0NDIwODk3MTg5MTIxODIwMjI2MTg3MzE3NjM3Njc4Nzc5NjE2ODIwMTQyODEyNDc5MTE0MjMwNjAwNzEwMDkwMzU0ODc1NjIzNTE3NTIwMTUzNjU4OTMyNjAyODYxODA0MDA1MjYyOTU4NzMzMDYxNDg5NzU5MDUzNDk1NDYwOTIxNzM2MTk1ODgwODAwNzA3NzI5MTY3MzAwNjUxNTM5NTI5NzM5NTg0Mzk4NTkwMTc1MTUwMTg0NDAxNjE3MTM3ODIzNjAxMTI2MTUzNjA4Njc3ODg5NTQzNzAzNDYxMzQ5Njc5ODMzMzc3NjgzOTg1OTQwNzQ0MTcxNTI3OTU4NTY3NDMxNTk4NTc2NTI3ODEyMzI2ODUwNTIifX0.0FVLcRnZ06i4YedAJbdo-SO5TvkRIUY6rH4rWYZCOFk"
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