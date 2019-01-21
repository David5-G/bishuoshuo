
import { observable, computed, useStrict,decorate, action } from 'mobx'
import { Host } from '../config'
import { POST, GET } from '../utils/request.js'

//华尔街见闻
const wallHost = 'https://api-prod.wallstreetcn.com'

useStrict
class MediaStore {
    id = Math.random()
    @observable banners = []
    @observable wallNews = []

    @observable flashNews = []
    @observable importantNews = []
    @observable dubiwangNews = []

    // @action getBanners(params = {slide_id :1 }) {
    //     return GET(Host + '/yapi/slide/index/', params).then(res => {
    //         if (res.code === 1) {
    //             this.banners = res.data
    //         } else {
    //             this.banners = []
    //         }
    //         return res
    //     })
    // }

    @action getBanners(params = {}) {
        return GET(wallHost + '/apiv1/content/fabricate-articles', params).then(res => {
            if (res.code === 20000) {
                this.banners = res.data.items
            } else {
                this.banners = []
            }
            return res
        })
    }

    _cur = 'global' //记录home页面的选项卡
    @action getWallmain (params={}) {
        if (params.channel !== this._cur) this.wallNews = [] //tab发生改变后清空当前的新闻
        this._cur = params.channel
        
        return GET(wallHost + '/apiv1/content/fabricate-articles', params).then(res => {
            if (res.code === 20000) {
                this.wallNews = [...this.wallNews,...res.data.items]
                this.wallNews.forEach((item,i) => item.key = i)
            } else {
                this.wallNews = []
            }
            return res
        })
    }
    

    @action getFlashNews(params={}) {
        // pidx 1 必选 页码，每页最多10，排序是从当前往历史方向排，第一页是当前
        // ps10 必选 取 1 到 10， 只保留最近3天的信息数据
        // types1,9,8 可选 分类，逗号分割 （1宏观/2行业/3公司/4数据/5市场/6观点/7央行/8其他/9全球/10A股

        return GET(Host + '/yapi/hq/qnews/', params).then(res => {
            if (res.Code === 0) {
                res.Obj.forEach(item => {
                    item['tags'] = []
                    const TG = item['TG']
                    if (TG.indexOf('1') > -1) item['tags'].push('宏观');
                    if (TG.indexOf('2') > -1) item['tags'].push('行业');
                    if (TG.indexOf('3') > -1) item['tags'].push('公司');
                    if (TG.indexOf('4') > -1) item['tags'].push('数据');
                    if (TG.indexOf('5') > -1) item['tags'].push('市场');
                    if (TG.indexOf('6') > -1) item['tags'].push('观点');
                    if (TG.indexOf('7') > -1) item['tags'].push('央行');
                    if (TG.indexOf('8') > -1) item['tags'].push('其他');
                    if (TG.indexOf('9') > -1) item['tags'].push('全球');
                })
                this.flashNews = [...this.flashNews,...res.Obj]
            }
            return res
        })
    }

    @action getImportantNews(params={}){
        // http://data.fk7h.com/yapi/article/alistpage/?category=5&page=1
        // category 5 分类ID
        // page 1 page
        return GET(Host + '/yapi/article/alistpage/', params).then(res => {
            console.log('params-->',params)
            if (res.code === 1) {
                this.importantNews = [...this.importantNews,...res.data.data]
            }
            return res
        })
    }

    // 读币网 区块链新闻 http://data.fk7h.com/yapi/Dubiwang/blockchain?tid=0&page=1
    @action getDubiwangNews(params={}) {
        //tid 0 0 | 默认值 | 全部 1 | | 新闻热点 2 | | 行情分析 3 | | 链币世界 4 | | 全国政策 5 | | 读币专访
        //page 1 分页
        return GET(Host + '/yapi/Dubiwang/blockchain/', params).then(res => {
            if (res.code === 1) {
                this.dubiwangNews = [...this.dubiwangNews,...res.data]
            }
            return res
        })
    }




}

export default new MediaStore()