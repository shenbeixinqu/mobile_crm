import request from './http.js'
const api = request
export function add(data){
	return api.request('/api/customer','post',data)
}