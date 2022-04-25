import axios from 'axios'

const NODE_ENV = process.env.NODE_ENV
let baseUrl = ''

if (NODE_ENV === 'development') {
	baseUrl = 'https://127.0.0.1:3000'
} else if (NODE_ENV === 'production') {
	baseUrl = 'https://fyang.fun:3000'
}

const instance = axios.create({
	baseURL: baseUrl
})


export {
	instance,
	baseUrl
}
