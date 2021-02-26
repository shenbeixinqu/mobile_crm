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

var token = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTQzNjQ2MTQsImlhdCI6MTYxNDMyODYxNCwiaXNzIjoiY3JtIiwiZGF0YSI6eyJpZCI6MTQwMzcsIm5hbWUiOiJcdThmNjZcdTY2NzYiLCJldG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnlYMmxrSWpveE5EQXpOeXdpYVhOeklqb2laWEp3SWl3aWFHVmhaR1Z5Y3lJNmV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOUxDSmxlSEFpT2pFMk1UUXpOVGN5Tmpjc0ltbGhkQ0k2TVRZeE5ETXlPRFEyTnl3aWRYTmxjbDl1WVcxbElqb2lYSFU0WmpZMlhIVTJOamMySW4wLmZGLWlsbHJsTlN6Mk83dlkwcC05NTBISURyZTMxS09nU3pxMDhqb3FsOE0iLCJjbG91ZF9pZCI6MiwidW5faWQiOjIsInVuX25hbWUiOiJcdTZjODhcdTk2MzNcdTc2ZDhcdTUzZTQiLCJkZV9pZCI6MTYzLCJkZV9uYW1lIjoiXHU1NTQ2XHU1MmExXHU0ZTAwXHU1MzNhXHU0ZThjXHU5MGU4IiwiZGVwYXJ0dHlwZSI6MTAsInBvc3RfbmFtZSI6IkNSTV9cdTU0NThcdTVkZTUiLCJsZXZlbCI6MCwic3VwZXJfaWQiOjgyNTIsImthIjowLCJpcCI6IjE3Mi4xOC4zLjE2MSIsImxhc3R0aW1lIjoxNjE0MzI4NjEzLCJwb3N0cyI6W3siaWQiOjAsImRuYW1lIjoiXHU1NTQ2XHU1MmExXHU0ZTAwXHU1MzNhXHU0ZThjXHU5MGU4IiwibmFtZSI6IkNSTV9cdTU0NThcdTVkZTUifV0sInBvd2VycyI6IjI5MzMyMDMwOTQxMTE4Mjg1MjYwMzMwOTE2MzY4OTk0Nzk3Njg3ODkwOTE5MzQ4MDg1MTY2OTQyMTE0MjM3MDc0MDA3Mzg5MzkxOTc4MTkyMDI3MjUwNzk1NTYyNDQ5MjgxMTcyNDI5MzM3OTE3NTQ3NzQ4MDkzNzQ4Mjc2NzMwOTMyMTc1NzEwOTg3NTU4MTMyNzc1OTcwMDIzNTA4MzQ2NzE3OTIyMjQ4MTYxNTYyMDY3ODIxMDkzODcwMDQ3NDIwMjc1MzcxNTg2NTI5MjM4MTY1MzY0OTgyODk1NTgwMTg2ODE1NTM2NjMyOTUyNjY0Mzc0NDY4NTU5ODMxNDYzMDcwNTczMjE0NTQ1NDY0ODU4ODI0NDgwNjAwMTE1NjQ4Mzc0OTAwNTY5NjI0MzE1Mjk5NTgwMjA2MTU5ODQ4MTcyOTI5NzgzMDM1MjU5NTI4MDEwNjgwMjI3Mzk1MzI4MzEzNTM5ODcwMzQwNTk5ODIzNjU4MDE0MjI3MDQ0MDYzNzY2NTY2NzAwOTI5MTQyMzg4NDY5NjU2NjYwMzI3NzkzMjEyNjA5MTMxMzA0NTk3NzAyNTY1NzQ4MzgyMDA1MzAxMTI3NjkzMTgzNzQ0NzA2MTk3Mzc4Nzg0NjUzMTczMDA3MDMzMDE4NjE5MTA1MzAxMzMwNjIwNjYwODM4NDIzNzkwOTczNjI3NzU2NDE5Mjk1MDI1OTQ0NDE5OTEyMTU2Mzg4NTk4NjUzMzA4NjUyNzA4MTI2MDMwMjY5MTg4MTQwMzMyMDAxOTQ4NDY3NzI1MzU5MjkxNzg4NDIxMTYyMjYzNTk2NTkxODE4MDk2MzAxNjQ0NjU0MTk2NDg3MTI0NTUxMDg0NDk2MzcwMjQxNjMzMTk5MDU5NjYxODk4NjE5NzUyNzQxODc3Mzg4OTc5MzUxMDY3NjQ1NDIyOTA3MTEwODc1MzQ0NjE1ODUwNTEyNDgyMjMwODc2NDg2ODc1OTA5MDIyMDI4OTg0MTc2MzY5MzE4OTc5MDQxNjc0MDI2NjYwMjYyNzQzNDY1MzA0NDg4NTAxNDQ5OTYxMDA0MzcwMjY4MzI4ODAyNjUzMDY1NDY0ODA3MzE3ODQ5MTI3ODkwNTE4ODk1MTIyOTk0MzE1NDU5NTg4MzQ5MTI3MjIxODA3OTA1MzE3ODIxNTAwODA0NDkzNzQ1MTY2NDQ5NDQ2MzQxODI2MDkzMTYyODc0ODAwMzUzMjgifX0.FZJcn_HBVJnGHGKSNCLTFEiiWrKFBYj5uG5-drETZmU"
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