
import { observable, computed, useStrict,decorate, action } from 'mobx'
import { POST, GET } from '../utils/request.js'
import { Host } from '../config'
function jsonp1(res) {
    console.log('jsonp1-->', res)
}
class MainStore {
    id = Math.random()
    @observable subjects = {
        title: '',
        subjects: [],
    }

    @action getTitle(title) {
        setTimeout(() => {
            this.title = title ? title : '请传参数' + Math.random()
        },1000)
    }

    @action getHomePage (params = {}) {
        // https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items?os=ios&callback=jsonp1&start=0&count=8&loc_id=108288&_=0
        return GET('https://api.douban.com/v2/movie/in_theaters',params).then(res => {
            if (!res.subjects) return
            this.subjects = res || {}
            console.log('subjects-->', res)
            return res
        }).catch(err => {
            return err
        })
    }
}

export default new MainStore()