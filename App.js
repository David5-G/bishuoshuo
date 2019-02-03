/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, SafeAreaView, StyleSheet,NetInfo,TouchableOpacity, Text, View, NativeModules } from 'react-native';
import codePush from 'react-native-code-push'
import Root from './src/root.js'
import { Provider } from 'mobx-react'
import Store from './src/store/index.js'


import JPushModule from 'jpush-react-native'
import SplashScreen from 'react-native-splash-screen'

type Props = {};
export default class App extends Component<Props> {

	constructor(props) {
		super(props)
		this.state = {
			updateText: '',
			isDownload: false,
			isUpdateFinished: false,
			connect: false,
		}
	}
	componentDidMount() {
		SplashScreen.hide();
		JPushModule.getRegistrationID((registrationId) => {
			console.log('registrationId-->', registrationId)
		});
		this._checkConnect() //绑定一个网络监测事件
		NetInfo.isConnected.fetch().done((isConnected) => {
			if (isConnected) {
				this.setState({connect: 1})
				this._hotUpdata()
			}
		})
	}
	componentWillMount() {
		NetInfo.removeEventListener('connectionChange')
	}
	_checkConnect () {
		NetInfo.addEventListener('connectionChange', (connectionInfo) => {
            if (connectionInfo.type === 'none') {
                this.setState({connect: 0})
            } else {
                this.setState({connect: 1})
            }
        })
	}
	_hotUpdata() {
		codePush.sync({ installMode: codePush.InstallMode.IMMEDIATE }, this.codePushStatusDidChange.bind(this));
	}
	codePushStatusDidChange(syncStatus) {
		console.log('codePush.SyncStatus-->', syncStatus)
		switch (syncStatus) {
			case codePush.SyncStatus.CHECKING_FOR_UPDATE:
				this.setState({ updateText: '检查更新' });
				break;
			case codePush.SyncStatus.DOWNLOADING_PACKAGE:
				this.setState({ isDownload: true, updateText: '下载更新包' });
				break;
			case codePush.SyncStatus.AWAITING_USER_ACTION:
				this.setState({ updateText: '等待用户动作' });
				break;
			case codePush.SyncStatus.INSTALLING_UPDATE:
				this.setState({ updateText: '正在安装更新' });
				break;
			case codePush.SyncStatus.UP_TO_DATE:
				this.setState({ updateText: '应用已是最新版本' }, () => {
					setTimeout(() => this.setState({ isUpdateFinished: true }), 100);
				});
				break;
			case codePush.SyncStatus.UPDATE_IGNORED:
				this.setState({ updateText: '您已取消更新' });
				break;
			case codePush.SyncStatus.UPDATE_INSTALLED:
				this.setState({ updateText: '更新已安裝,将会在下次启动应用时启用' },
					() => this.setState({ isUpdateFinished: true }));
				break;
			case codePush.SyncStatus.UNKNOWN_ERROR:
				this.setState({ updateText: '更新失败' },
					() => this.setState({ isUpdateFinished: true }));
				break;
			default:
		}
	}
	render() {
		const {connect, updateText, isUpdateFinished } = this.state
        if (!connect) {
            return (
                <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 18}}>网络不给力</Text>
                        <TouchableOpacity
                            style={{borderWidth: 1,marginTop:10,borderColor: '#999',borderRadius: 2,paddingLeft: 7,paddingRight: 7}}
                            onPress={() => {
                                NetInfo.isConnected.fetch().done((isConnected) => {
									console.log('isConnected-->',connect, isConnected)
									isConnected && this.setState({connect: connect+1})
								})
                            }}
                        >
                            <Text style={{fontSize: 16,lineHeight: 25,color: '#999'}}>重试</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
		}
		if (!isUpdateFinished) {
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ fontSize: 18 }}>{updateText}</Text>
				</View>
			)
		}
		return (
			<Provider {...Store} >
				<Root />
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
});
