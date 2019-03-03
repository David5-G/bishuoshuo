
import { observable, computed, useStrict,decorate, action } from 'mobx'
import { POST, GET } from '../utils/request.js'
import { Host } from '../config'

const config = {
    movieHost: 'https://movie.douban.com',
    bookHost: 'https://read.douban.com',
    gameHost: 'https://www.douban.com',
    teamHost: 'https://m.douban.com',
}
class MainStore {
    id = Math.random()

    @observable hotMovies = []
    @observable hotTvs = []

    
    @action getTitle(title) {
        setTimeout(() => {
            this.title = title ? title : '请传参数' + Math.random()
        },1000)
    }

    @action getMovieList (params = {}) {
        // https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0
        return GET(config.movieHost + '/j/search_subjects',params).then(res => {
            console.log('hotTvsTab-->', res)
            if (!res.subjects) return
            if(params.type === 'movie') {
                this.hotMovies = res.subjects
            } else {

                this.hotTvs = res.subjects
            }
            return res
        }).catch(err => {
            return err
        })
    }

    // 图书
    @observable books = []
    @action getBooks (params = {}) {
        return GET(config.bookHost + '/j/index//charts',params).then(res => {
            console.log('book-->', res)
            res.list && (this.books = res.list)
            return res
        }).catch(err => {
            return err
        })
    }

    // 游戏
    @observable games = []
    @action getGames (params = {}) {
        // https://www.douban.com/j/ilmen/game/search?genres=1&platforms=94%2C17%2C96&q=&sort=rating
        return GET(config.gameHost + '/j/ilmen/game/search',params).then(res => {
            res.games && (this.games = res.games)
            return res
        }).catch(err => {
            return err
        })
    }

    // 大家说，小组
    @observable teamsBanner = []
    @observable teams = []
    @action getTeamsBanner (params = {
        ck: 'Kl55',
        for_mobile: 1,
    }) {
        // https://www.douban.com/j/ilmen/game/search?genres=1&platforms=94%2C17%2C96&q=&sort=rating
        return GET(config.teamHost + '/rexxar/api/v2/group/mixed_rec_groups',params).then(res => {
            res.mixed_rec_groups && (this.teamsBanner = res.mixed_rec_groups)
            return res
        }).catch(err => {
            return err
        })
    }

    @action getTeams (params = {
        ck: 'Kl55',
        for_mobile: 1,
    }) {
        // https://www.douban.com/j/ilmen/game/search?genres=1&platforms=94%2C17%2C96&q=&sort=rating
        return GET(config.teamHost + '/rexxar/api/v2/group/rec_groups_for_newbies',params).then(res => {
            res.rec_groups && (this.teams = res.rec_groups[0].classified_groups)
            return res
        }).catch(err => {
            return err
        })
    }

}

export default new MainStore()