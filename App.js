/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {
	Platform,
	SafeAreaView,
	StyleSheet,
	NetInfo,
	TouchableOpacity,
	Text,
	View,
    NativeModules,
    ProgressBarAndroid,
    ProgressViewIOS,
} from 'react-native'
import codePush from 'react-native-code-push'
import Root from './src/root.js'
import {Provider} from 'mobx-react'
import Store from './src/store/index.js'
import { isIos, width } from './src/constants/Scale.js'
import JPushModule from 'jpush-react-native'
import SplashScreen from 'react-native-splash-screen'
import Colors from './src/constants/Colors.js';

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			updateText: '',
			isDownload: false,
			isUpdateFinished: false,
			connect: true,
			hotUpdatePrecent: 0
		}
	}
	componentDidMount() {
        
		JPushModule.getRegistrationID(registrationId => {
			console.log('registrationId-->', registrationId)
		})
		this._checkConnect() //绑定一个网络监测事件
		NetInfo.isConnected.fetch().done(isConnected => {
			if (isConnected) {
				this.setState({connect: 1})
				this._hotUpdata()
			} else {
				this.setState({connect: 0})
			}
		})
	}
	componentWillMount() {
		
		NetInfo.removeEventListener('connectionChange')
	}
	_checkConnect() {
		NetInfo.addEventListener('connectionChange', connectionInfo => {
			if (connectionInfo.type === 'none') {
				this.setState({connect: 0})
			} else {
				this.setState({connect: 1})
			}
		})
	}
	_hotUpdata() {
		codePush.sync(
			{installMode: codePush.InstallMode.IMMEDIATE},
			this.codePushStatusDidChange.bind(this),
			this.codePushDownloadDidProgress.bind(this)
		)
	}
	codePushStatusDidChange(syncStatus) {
		switch (syncStatus) {
			case codePush.SyncStatus.CHECKING_FOR_UPDATE:
				this.setState({updateText: '检查更新'})
				break
			case codePush.SyncStatus.DOWNLOADING_PACKAGE:
				this.setState({isDownload: true, updateText: '下载更新包...'})
				break
			case codePush.SyncStatus.AWAITING_USER_ACTION:
				this.setState({updateText: '等待用户动作'})
				break
			case codePush.SyncStatus.INSTALLING_UPDATE:
				this.setState({updateText: '正在安装更新'})
				break
			case codePush.SyncStatus.UP_TO_DATE:
				this.setState({updateText: '应用已是最新版本'}, () => {
					setTimeout(() => {
                        this.setState({isUpdateFinished: true})
                        SplashScreen.hide()
					}, 100)
				})
				break
			case codePush.SyncStatus.UPDATE_IGNORED:
				this.setState({updateText: '您已取消更新'})
				break
			case codePush.SyncStatus.UPDATE_INSTALLED:
				this.setState(
					{updateText: '更新已安裝,将会在下次启动应用时启用'},
					() => {
                        this.setState({isUpdateFinished: true})
                        SplashScreen.hide()
                    }
				)
				break
			case codePush.SyncStatus.UNKNOWN_ERROR:
				this.setState({updateText: '更新失败'}, () =>
                    this.setState({isUpdateFinished: true})
                    SplashScreen.hide()
				)
				break
			default:
		}
	}
	codePushDownloadDidProgress(progress) {
        const hotUpdatePrecent = parseFloat(progress.receivedBytes / progress.totalBytes).toFixed(2)
        if (this.currProgress >= 1) {

        } else {
            this.setState({hotUpdatePrecent})
        }
	}
	render() {
		const {connect, updateText, isUpdateFinished, hotUpdatePrecent } = this.state

		if (!connect) {
			return (
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#2F4F4F'
					}}
				>
					<View style={{alignItems: 'center'}}>
						<Text style={{fontSize: 18, color: '#fff'}}>
							网络不给力
						</Text>
						<TouchableOpacity
							style={{
								borderWidth: 1,
								marginTop: 10,
								borderColor: '#e0e0e0',
								borderRadius: 2,
								paddingLeft: 7,
                                paddingRight: 7,
                                
							}}
							onPress={() => {
								NetInfo.isConnected
									.fetch()
									.done(isConnected => {
										isConnected &&
											this.setState({
												connect: connect + 1
											})
									})
							}}
						>
							<Text
								style={{
									fontSize: 14,
									lineHeight: 25,
									color: '#fff'
								}}
							>
								重试
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			)
		}
		if (!isUpdateFinished) {
			return (
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#2F4F4F'
					}}
				>
					<Text style={{fontSize: 18, color: '#fff'}}>
                        {updateText}
					</Text>
                    <View style={{width,justifyContent: 'center',alignItems: 'center'}}>
                        {updateText==='下载更新包...'&&(
                            isIos ? 
                            <ProgressViewIOS
                                style={{
                                    marginTop: 20,
                                    height: 10,
                                    width: width - 100,
                                    backgroundColor: '#999',
                                    borderRadius: 10,
                                }}
                                progressColor={'#89C0FF'}
                                progress={hotUpdatePrecent}
                            /> : 
                            <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={hotUpdatePrecent} />
                        )}
                    </View>
				</View>
			)
		}
		return (
			<Provider {...Store}>
				<Root />
			</Provider>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	}
})
