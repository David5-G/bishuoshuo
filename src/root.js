import React from 'react';
import { View,Text, Platform,StatusBar,AsyncStorage, NetInfo, StyleSheet, AppState, } from 'react-native';
import Route from './route/index.js'
import { observer, inject } from 'mobx-react/native';
import LoadingView from './views/common/Loading'

@inject('MainStore', 'UserStore', 'MediaStore')
@observer
export default class News extends React.Component {
    static navigationOptions = {
        title: 'news',
        token: 'default token'
    }
    constructor(props) {
        super(props)
        UserStore = this.props.UserStore
        MainStore = this.props.MainStore
        MediaStore = this.props.MediaStore
        navigation = this.props.navigation
        // const { MainStore, UserStore, navigation } = this.props
        this.state = {
            appState: AppState.currentState,
            loading: false,
        }
        this._handleAppStateChange = this._handleAppStateChange.bind(this)
        this._initStore = this._initStore.bind(this)
    }

    componentDidMount() {
        console.log('Root--> componentDidMount')
        AppState.addEventListener('change', this._handleAppStateChange);

        NetInfo.addEventListener('connectionChange', (connectionInfo) => {
            console.log('connectionInfo-->', connectionInfo)
        })
        this._initStore()
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }
    render() {
        const { loading, appState} = this.state
        return (
            <View style={styles.container}>
                <Text>appState-->{appState}</Text>
                <LoadingView show={loading} />
                {Platform.OS === 'ios' && <StatusBar hidden={false} barStyle="light-content" />}
                <Route />
            </View>
        )
    }
    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('appState--> 打开了app') //首次打开app不走这里
            this._initStore()
        } else {
            console.log('appState--> 关闭了app')
        }
        this.setState({ appState: nextAppState })
    }
    async _initStore() {
        // console.log('_initStore UserStore-->', UserStore)
        // console.log('_initStore MediaStore-->', MediaStore)
        // console.log('_initStore MediaStore.getBanners-->', MediaStore.getBanners)
        this.setState({ loading: true })
        const text = await AsyncStorage.getItem('username') || '17688739001'
        const password = await AsyncStorage.getItem('password') || '123qwe'
        const loginInfo = await UserStore.userLogin({ username: text, password, device_type: 'iphone' })
        const banners = await MediaStore.getBanners()
        this.setState({ loading: false })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
