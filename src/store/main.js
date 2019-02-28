
import { observable, computed, useStrict,decorate, action } from 'mobx'
import { POST, GET } from '../utils/request.js'
import { Host } from '../config'

class MainStore {
    id = Math.random()
    @observable subjects = {
        title: '',
        subjects: [],
    }
    @observable weekJects = {
        title: '',
        subjects: [],
    }
    @observable city = '北京'
    @observable apikey = '0b2bdeda43b5688921839c8ecb20399b'

    @action changeCity (city) {
        this.city = city
    }
    @action getTitle(title) {
        setTimeout(() => {
            this.title = title ? title : '请传参数' + Math.random()
        },1000)
    }

    @action getHotPlay (params = {}) {

        // https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items?os=ios&callback=jsonp1&start=0&count=8&loc_id=108288&_=0
        return GET('https://api.douban.com/v2/movie/in_theaters',params).then(res => {
            if (!res.subjects) return
            this.subjects = res || {}
            return res
        }).catch(err => {
            return err
        })
    }

    @action getMouth (params = {}) {
        // https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items?os=ios&callback=jsonp1&start=0&count=8&loc_id=108288&_=0
        return GET('https://api.douban.com/v2/movie/weekly',params).then(res => {
            console.log('getMouth----->', res)
            if (!res.subjects) return
            res.subjects.forEach((el,i) => res.subjects[i] = res.subjects[i].subject);
            this.weekJects = {
                title: '币说本周口碑榜',
                subjects: res.subjects
            }
            return res
        }).catch(err => err)
    }

    @action getTop (params = {}) {
        return GET('https://api.douban.com/v2/movie/top250',params).then(res => {

            console.log('top')
            // if (!res.subjects) return
            // res.subjects.forEach((el,i) => res.subjects[i] = res.subjects[i].subject);
            // this.weekJects = {
            //     title: '币说本周口碑榜',
            //     subjects: res.subjects
            // }
            return res
        }).catch(err => err)
    }
}

export default new MainStore()