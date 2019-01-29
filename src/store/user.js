
import { observable, computed, useStrict, decorate, action } from 'mobx'
import { AsyncStorage, Alert } from 'react-native';
import { POST, GET } from '../utils/request.js'
import { Host } from '../config'

useStrict
class UserStore {
    id = Math.random()
    @observable token = ''
    @observable userInfo = {}
    @computed get isLogin() { return this.token }
    @action userRegister(params = {}) { //注册
        // username13922120454
        // 手机或邮箱 必填
        // password 123123
        // 密码 必填
        // verification_code 22037
        return POST(Host + '/api/user/public/register', params).then(res => res)
    }
    @action userLogin(params = {}) { //登录
        // username admin
        // password qwe123
        // device_type iphone

        return POST(Host + '/api/user/public/login', params).then(res => {
            if (res.code === 1) {
                this.userInfo = res.data.user
                this.token = res.data.token
                AsyncStorage.setItem('token', this.token)
                AsyncStorage.setItem('username', params.username)
                AsyncStorage.setItem('password', params.password)
                this.userUserInfo({}, { 'XX-Token': this.token, 'XX-Device-Type': 'iphone', })
            } else {
                this.userInfo = {}
                this.token = ''
                AsyncStorage.setItem('token', '')
                AsyncStorage.removeItem('username')
                AsyncStorage.removeItem('password')
            }
            return res
        })
    }
    @action userUserInfo(params = {}, header = {}) { //查找用户信息
        // XX-Tokene 6a879a3ba87340c8c7e767c2e296702819471e2292855f9d52c71950c1a1dd6
        // XX-Device-Type iphone
        return GET(Host + '/api/user/profile/userInfo', params, header).then(res => {
            if (res.code === 1) {
                this.userInfo = res.data
            } else {
                this.userInfo = {}
                this.token = ''
                AsyncStorage.removeItem('token')
                AsyncStorage.removeItem('password')
            }
            return res
        })
    }
    // 更新用户信息
    @action setUserInfo(params = {}, header = {}) { //查找用户信息
        // user_nicknamemm 用户昵称 【参数名参与更改时,不论参数值是否为空都会更改】
        // avatar20181015\cbae14e740a24cb826f6972150babe8e.jpg 用户头像【参数名参与更改时,不论参数值是否为空都会更改】
        // signature开开心心又一天 个性签名【参数名参与更改时,不论参数值是否为空都会更改】
        // user_urlhttps://www.eolinker.com 用户个人网址【参数名参与更改时,不论参数值是否为空都会更改】
        // sex1 性别;0:保密,1:男,2:女 【参数名参与更改时,不论参数值是否为空都会更改】
        // birthday19990909 生日 【参数名参与更改时,不论参数值是否为空都会更改】
        return POST(Host + '/api/user/profile/userInfo', params, header).then(res => {
            this.userUserInfo({}, { 'XX-Token': this.token, 'XX-Device-Type': 'iphone', })
            return res
        })
    }

    @action userFindback(params = {}, header = {}) {
        return POST(Host + '/api/user/public/passwordReset', params, header).then(res => {
            if (res.code === 1) {
                AsyncStorage.setItem('username', params.username)
                AsyncStorage.setItem('password', params.password)
            }
            return res
        })
    }

    @action userLogout(params = {}, header = {}) { //退出登录

        // XX-Token 9ccf9beac642504ea2086886c2fb14ac6822dec8609e6e3bcc3d021ebd2a5f45
        // XX-Device-Type iphone
        return POST(Host + '/api/user/public/logout', params, header).then(res => {
            Alert.alert(res.msg)
            this.userUserInfo({}, { 'XX-Token': this.token, 'XX-Device-Type': 'iphone', })
            return res
        })
    }
    @action userVerificationCode(params = {}) {
        return GET(Host + '/api/user/verification_code/send_code', params).then(res => res)
    }
}

export default new UserStore()