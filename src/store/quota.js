
import { observable, computed, useStrict,decorate, action } from 'mobx'
import { POST, GET } from '../utils/request.js'
import { Host,WallQuotaHost } from '../config'
useStrict

class QuotaStore {
    id = Math.random()
    // @observable GBIDX = [] //：全球股指
    // @observable GBIDX_QUOTAS = [] //：全球股指

    // @observable GBDC = [] //：数字货币
    // @observable GBDC_QUOTAS = [] //：数字货币

    // @observable CNFT = [] //：国内期货
    // @observable CNFT_QUOTAS = [] //：国内期货

    // @observable GBFT = [] //：国际期货(指数/商品/外汇)
    // @observable GBFT_QUOTAS = [] //：国际期货

    

    // // https://data.fk7h.com/yapi/hq/codesearch?keywords=&pidx=1&rout=GBIDX
    // // 查询品种列表
    // @action getVarietyList(params = {}) {
    //     // 必选 rout类型 说明 CNST ： 沪深
    //     // USST ：美股
    //     // HKST ： 港股
    //     // GBFSB ：外汇
    //     // GBCFD ： CFD
    //     // GBFT ：国际期货(指数/商品/外汇)
    //     // CNFT ：国内期货
    //     // GBDC ：数字货币
    //     // GBIDX ：全球股指
    //     return GET(Host + '/yapi/hq/codesearch/', params).then(res => {
    //         console.log('codesearch res-->',res.Obj.length)
    //         if (res.Code) {
    //             switch (params.rout) {
    //                 case 'GBIDX':
    //                     this.GBIDX = res.Obj
    //                     var symbols = ''
    //                     res.Obj.forEach((item) => symbols+=item.FullSymbol + ',')
    //                     console.log('symbols-->',symbols)
    //                     this.getVarietyQuota({symbols}).then(res => this.GBIDX_QUOTAS = res.Obj)
    //                     break;
    //                 case 'GBDC':
    //                     this.GBDC = res.Obj
    //                     var symbols = ''
    //                     res.Obj.forEach((item) => symbols+=item.FullSymbol + ',')
    //                     console.log('symbols-->',symbols)

    //                     this.getVarietyQuota({symbols}).then(res => this.GBDC_QUOTAS = res.Obj)
    //                     break;
    //                 case 'CNFT':
    //                     this.CNFT = res.Obj
    //                     var symbols = ''
    //                     res.Obj.forEach((item) => symbols+=item.FullSymbol + ',')
    //                     console.log('symbols-->',symbols)

    //                     this.getVarietyQuota({symbols}).then(res => this.CNFT_QUOTAS = res.Obj)
    //                     break;
    //                 case 'GBFT':
    //                     this.GBFT = res.Obj
    //                     var symbols = ''
    //                     res.Obj.forEach((item) => symbols+=item.FullSymbol + ',')
    //                     console.log('symbols-->',symbols)

    //                     this.getVarietyQuota({symbols}).then(res => this.GBFT_QUOTAS = res.Obj)
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         }
    //         return res
    //     })
    // }
    // @action getVarietyQuota (params={}) { // 取所有行情
    //     // https://data.fk7h.com/yapi/hq/hqbatchlist?symbols=CSE,DJI,CFFEXIC,
    //     return GET(Host + '/yapi/hq/hqbatchlist/', params).then(res => res)
    // }

    // 基金
    @observable fundList = []
    @action getFundList (params={}) { // 取所有行情
        // http://data.fk7h.com/yapi/Bond/fund_list?page=1&number=10&asc=1&sort=trade&type=etf_hq_fund
        // page1页码
        // number10每页数量 默认 10
        // asc1排序 0降序 1 升序
        // sorttrade排序 类型 （trade 最新价、pricechange 涨跌额、changepercent 涨跌幅、volume 成交量、amount 成交额、symbol 代码） 默认代码
        // typeetf_hq_fund 类型 （etf_hq_fund ETF基金行情、lof_hq_fund LOF基金行情） 默认etf_hq_fund ETF基金行情
        return GET(Host + '/yapi/Bond/fund_list/', params).then(res => {
            if (res.code === 1) {
                this.fundList = [...this.fundList,...res.data]
            }
            return res
        })
    }

    // wallstreet 行情列表
    @observable commodityList = []
    @action getQuotaList (params={}) { // 取所有行情

        // type: commodity
        // fields: prod_name,last_px,px_change,px_change_rate,price_precision,update_time
        // sort_type: pcp_incr

        return GET(WallQuotaHost + '/market/rank', params).then(res => {
            if (res.code === 20000) {
                this.commodityList = res.data.candle
            }
            return res
        })
    }
    
}

export default new QuotaStore()