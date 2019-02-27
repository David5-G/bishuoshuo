import { observable, computed, useStrict, decorate, action } from 'mobx'
import { AsyncStorage, Alert } from 'react-native'
import { POST, GET } from '../utils/request.js'
import { Host } from '../config'
import AV from 'leancloud-storage'
import { resolve } from 'uri-js'

try {
	AV.init('nwU47QsDDqMH0pFWGGfV2l4K-gzGzoHsz', '8EB5r9kuxN9gdOUQeRAzA7TR')
} catch (error) {}

var user = new AV.User()

class UserStore {
	id = Math.random()
	@observable userInfo = {}
	@computed get isLogin() {
		return this.userInfo
	}
	@action userGetCurrent() {
		console.log(
			AV.User.current(
				success => {
					console.log('success-->', success)
				},
				error => {
					alert(JSON.stringify(error))
				}
			)
		)
	}
	@action userRegister(params = {}) {
		//注册
		user.setUsername(params.username)
		user.setPassword(params.password)
		// user.setEmail(email)
		return user.signUp().then(
			success => {
				console.log('success-->', success)
				return success
			},
			error => {
                console.log('error-->', error)
				return error
			}
		)
	}
	@action userLogin(params = {}) {
		return AV.User.logIn(params.username, params.password).then(
			success => {
                console.log('success-->', success)
                return success
			},
			error => {
                console.log('error-->', error)
                return error
			}
		)
	}
}

export default new UserStore()
