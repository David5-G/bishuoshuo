
import { observable, computed, useStrict,decorate, action } from 'mobx'
import { POST, GET } from '../utils/request.js'
import { Host } from '../config'
useStrict

class QuotaStore {
    id = Math.random()
    @observable GBIDX = [] //：全球股指
    @observable GBIDX_QUOTAS = [] //：全球股指

    @observable GBDC = [] //：数字货币
    @observable GBDC_QUOTAS = [] //：数字货币

    @observable CNFT = [] //：国内期货
    @observable CNFT_QUOTAS = [] //：国内期货

    @observable GBFT = [] //：国际期货(指数/商品/外汇)
    @observable GBFT_QUOTAS = [] //：国际期货

    

    // https://data.fk7h.com/yapi/hq/codesearch?keywords=&pidx=1&rout=GBIDX
    // 查询品种列表
    @action getVarietyList(params = {}) {
        // 必选 rout类型 说明 CNST ： 沪深
        // USST ：美股
        // HKST ： 港股
        // GBFSB ：外汇
        // GBCFD ： CFD
        // GBFT ：国际期货(指数/商品/外汇)
        // CNFT ：国内期货
        // GBDC ：数字货币
        // GBIDX ：全球股指
        return GET(Host + '/yapi/hq/codesearch/', params).then(res => {
            console.log('codesearch res-->',res.Obj.length)
            if (res.Code) {
                switch (params.rout) {
                    case 'GBIDX':
                        this.GBIDX = res.Obj
                        var symbols = ''
                        res.Obj.forEach((item) => symbols+=item.FullSymbol + ',')
                        console.log('symbols-->',symbols)
                        this.getVarietyQuota({symbols}).then(res => this.GBIDX_QUOTAS = res.Obj)
                        break;
                    case 'GBDC':
                        this.GBDC = res.Obj
                        var symbols = ''
                        res.Obj.forEach((item) => symbols+=item.FullSymbol + ',')
                        console.log('symbols-->',symbols)

                        this.getVarietyQuota({symbols}).then(res => this.GBDC_QUOTAS = res.Obj)
                        break;
                    case 'CNFT':
                        this.CNFT = res.Obj
                        var symbols = ''
                        res.Obj.forEach((item) => symbols+=item.FullSymbol + ',')
                        console.log('symbols-->',symbols)

                        this.getVarietyQuota({symbols}).then(res => this.CNFT_QUOTAS = res.Obj)
                        break;
                    case 'GBFT':
                        this.GBFT = res.Obj
                        var symbols = ''
                        res.Obj.forEach((item) => symbols+=item.FullSymbol + ',')
                        console.log('symbols-->',symbols)

                        this.getVarietyQuota({symbols}).then(res => this.GBFT_QUOTAS = res.Obj)
                        break;
                    default:
                        break;
                }
            }
            return res
        })
    }
    @action getVarietyQuota (params={}) { // 取所有行情
        // https://data.fk7h.com/yapi/hq/hqbatchlist?symbols=CSE,DJI,CFFEXIC,
        return GET(Host + '/yapi/hq/hqbatchlist/', params).then(res => res)
    }

    
}

export default new QuotaStore()