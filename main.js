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

var token = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTQzNTQ3MDAsImlhdCI6MTYxNDMxODcwMCwiaXNzIjoiY3JtIiwiZGF0YSI6eyJpZCI6NDgsIm5hbWUiOiJcdTk2NDhcdTY2MjVcdTgyYjEiLCJldG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnlYMmxrSWpvME9Dd2lhWE56SWpvaVpYSndJaXdpYUdWaFpHVnljeUk2ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5TENKbGVIQWlPakUyTVRRek5EY3pOVFFzSW1saGRDSTZNVFl4TkRNeE9EVTFOQ3dpZFhObGNsOXVZVzFsSWpvaVhIVTVOalE0WEhVMk5qSTFYSFU0TW1JeEluMC5nUjVsajMxTFhhd0ZRTWlacGlLX0lKbjRZVXVPZHVhWEg1TGMxeFFTaGFzIiwiY2xvdWRfaWQiOjIsInVuX2lkIjoyLCJ1bl9uYW1lIjoiXHU2Yzg4XHU5NjMzXHU3NmQ4XHU1M2U0IiwiZGVfaWQiOjE1MywiZGVfbmFtZSI6Ilx1NTU0Nlx1NTJhMVx1NGUwMFx1NTMzYVx1NGUwMFx1OTBlOCIsImRlcGFydHR5cGUiOjEwLCJwb3N0X25hbWUiOiJDUk1fXHU1NDU4XHU1ZGU1IiwibGV2ZWwiOjAsInN1cGVyX2lkIjoxMTgxNiwia2EiOjAsImlwIjoiMTcyLjE4LjMuMTYxIiwibGFzdHRpbWUiOjE2MTQzMTg3MDAsInBvc3RzIjpbeyJpZCI6MCwiZG5hbWUiOiJcdTU1NDZcdTUyYTFcdTRlMDBcdTUzM2FcdTRlMDBcdTkwZTgiLCJuYW1lIjoiQ1JNX1x1NTQ1OFx1NWRlNSJ9XSwicG93ZXJzIjoiMjkzMzE3NTM5MTc1MTY5NzQwNTU1MTMwMDgxMDU2Njc1MTgzNzg4ODY1Nzk3OTczNDMxOTEwMTk3NTY4MzcwNjI2NTE0MDM0MDY5OTgwMzgxMjc1NzAzODQzNTA2NzA0MjQyNjk0MjkxMTQyMTc2ODQ0MjEzMDY3Mjg2Njg5OTY3MDM1ODQwNTIzOTMwODcwNzU3MDAxOTkwNjQyNzI1NjQwNDU0MTYzMTQ0MTM5NjMzOTU5NjMwNjY4OTU3OTkwNTYyMjYwNzA0MjczOTY5NTc0Nzk4NTM3NTY0OTI4MzU4Njc4NTIyOTAwNTcyMTY3ODE0MDcwMjU5NzQ3MzA2OTk2OTIwMTEyODY1MjI2MDg0OTI1MTMxMzMwMzI2NDkwNTY1NjA0MzkyNzU5NDcwMjY5ODEzNTk0NDMyNzU1NDAzMzI4Nzg4NTYwNDkyMTQ1Njg5MzQ2NjM3OTE3NjAzNTgwMDI5MjU4NDk1MDQ2MDM0MTk3NTE2ODkwMjA4Nzg1NTI4MDU1NzEwOTQ0NTk1MDI5NjU1MDEwODE0NjE4NTU5NjkwMjU5Nzg2MDAyMzE5Mzk2NTc1NzI3MjY3NDAzNDIzNzc2NzAyOTUxOTMxNDEwODE3MTg0ODM4NzY3Njg1OTQ5NTAzNzg1NDk4MzY1NzQ1MzA4NTk1NTg3OTg2Njc1NDUwNjM0MDM5Mzc3MjgwMzE3NDA5NjA0NjU0OTEzNjI0Nzg4MjUzOTI5MjI2MDU4NjUyMTY1MDY2MzUwMTg3OTYzMzM1MTE1NjQ4NjA2MDUxMDEwMDQ4MzY1ODU5ODYzODI1MDYwNTY1Nzk2MDM1NTcwOTI3MjE4NTA1NTQ1MjE1MDg5NDU4NTEwNzk5MzExNjQxNTY3MDQwNTExNTY4NTM0MTk2MjUzMDMwNDk1NzgyMzk0MjMyOTg0OTM1OTg2ODI2NzM5OTIzOTE0MzUzMTQ2NTM4MDQ3NjYzODExNzE3ODczNzM5NzY1NTY4Njk5MDk5MjYxNTAwODAwMTk3Nzk0ODc3NDE1MzE5MTAwMDMyNjkwMjI5MTAwMjAyNzgzNjcxNTI2NjE2MDc4Mjg3ODc3NTczMDE2NjA2MjM4MzA2MDY4MTExNTkwNDg3NDY1MDgwMjEyODk3MzE2ODkzMDk0MDgxNTIyNzU3NDQ2MzYyNzc2MzU1MjM3NDc4OTg3NDQyNzU5MTQyNzc3ODc3NDkyOTMyMzAzMDUyOCJ9fQ.UMZ3fHIL-obAJK_sdhMGeDw2dw-r8rFatm4w7flxWUs"
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