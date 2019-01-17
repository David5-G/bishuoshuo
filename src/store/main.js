
import { observable, computed, useStrict,decorate, action } from 'mobx'
useStrict

class MainStore {
    id = Math.random()
    @observable title = "store title"
    @observable finished = false

    @action getTitle(title) {
        setTimeout(() => {
            this.title = title ? title : '请传参数' + Math.random()
        },1000)
    }
}

export default new MainStore()