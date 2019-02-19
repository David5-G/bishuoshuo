import React from 'react';
import { View,Text, Platform,StatusBar, WebView, AsyncStorage,NativeModules, StyleSheet, AppState, } from 'react-native';
import { Root } from "native-base";
import Route from './route/index.js'
import { observer, inject } from 'mobx-react/native';
import LoadingView from './views/common/Loading'
import {isIos} from './constants/Scale.js'
import NavigationBar from './views/common/NavigationBar'

@inject('MainStore', 'UserStore', 'MediaStore')
@observer
export default class News extends React.Component {
    static navigationOptions = {
        title: 'news',
        token: 'default token',
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
        AppState.addEventListener('change', this._handleAppStateChange);
        this._initStore()

        if (!isIos) {
            try {
                NativeModules.ContextBridge.getStore(res => {
                    console.log('android-->', res)
                })
            } catch (error) {
                
            }
        }
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }
    render() {
        const { loading , appState} = this.state
        return (
            <Root style={styles.container}>
                <LoadingView show={loading} />
                <StatusBar hidden={false} barStyle="light-content" />
                <Route />
            </Root>
        )
    }
    
    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this._initStore()
        } else {
            
        }
        this.setState({ appState: nextAppState })
    }
    async _initStore() {
        const {loading } = this.state
        if (loading) return
        this.setState({ loading: true })
        const text = await AsyncStorage.getItem('username') || ''
        const password = await AsyncStorage.getItem('password') || ''
        if (text && password) {
            await UserStore.userLogin({ username: text, password, device_type: 'iphone' })
        }
        const banners = await MediaStore.getBanners()
        this.setState({ loading: false })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
