import React from 'react';
import { View, Button, Alert, Dimensions, ImageBackground, SafeAreaView, TouchableOpacity, Text, WebView, ScrollView, Image, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Toast, Title, Content, Item, Input, Button as NeButton, Text as NeText } from 'native-base';

import { observer, inject } from 'mobx-react/native';

import Colors from '../../constants/Colors'
import NavigationBar from '../common/NavigationBar'
import MineList from './subPage/mineList.js'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import { width } from '../../constants/Scale'
@inject('MainStore', 'MediaStore', 'UserStore')
@observer
export default class Mine extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		headerTitle: '更多',
		headerLeft: (
			<Text onPress={() => navigation.navigate('Home')} style={{ marginLeft: 5, width: 30, textAlign: "center" }} >
				返回
            </Text>
		)
	})
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	_logout() {
		const { UserStore, navigation } = this.props

		if (UserStore.isLogin) {
			Alert.alert(
				'是否要退出？',
				'',
				[
					{ text: '取消' },
					{ text: '退出', onPress: () => UserStore.userLogout({}, { 'XX-Token': UserStore.token, 'XX-Device-Type': 'iphone', }) },
				],
				{ cancelable: false }
			)
		} else {
			navigation.navigate('Login')
		}
	}
	render() {
		const { isLogin, userInfo, token } = this.props.UserStore
		const { collection, articleCollection } = this.props.MediaStore
		const { navigation } = this.props
		return (
			<View style={styles.container}>
			
				{/* <NavigationBar
					title={''}
					style={{ color: Colors.headerText, fontSize: 20 }}
					titleLayoutStyle={{ fontSize: 30 }}
					rightButton={isLogin ? <Icon
						style={{ paddingLeft: 20, }}
						onPress={this._logout.bind(this)}
						name={isLogin ? 'ios-log-out' : 'ios-log-in'} size={28}
						color={Colors.headerText}
					/> : null}
				/> */}
				<ImageBackground style={{ width, paddingTop: 60, }} source={require('../../pics/mine2.png')}>
					<TouchableOpacity onPress={() => !isLogin && navigation.navigate('Login')} style={styles.avatar}>
						<View style={{}}>
							<Image
								style={{ width: 50, height: 50, borderRadius: 25, }}
								source={{ uri: userInfo.avatar ? userInfo.avatar : 'https://img.alicdn.com/tps/TB1ld1GNFXXXXXLapXXXXXXXXXX-200-200.png' }}
							/>
						</View>
						<View style={{}}>
							<Text style={{ lineHeight: 40, fontSize: 16, marginLeft: 20, color: '#fff' }}>{isLogin ? userInfo.user_nickname : '您好，请登录'}</Text>
						</View>
					</TouchableOpacity>
					<View style={{ flexDirection: 'row' }}>
						<TouchableOpacity onPress={() => navigation.navigate(isLogin ? 'Watch' : 'Login')} style={styles.itemWrap}>
							<Text style={styles.tip}>关注</Text>
							<Text style={styles.tipVal}>{isLogin ? collection.length : 0}</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigation.navigate(isLogin ? 'Collect' : 'Login')} style={styles.itemWrap}>
							<Text style={styles.tip}>收藏</Text>
							<Text style={styles.tipVal}>{isLogin ? articleCollection.length : 0}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								Toast.show({
									text: "订阅功能建设中",
									duration: 1000,
									position: "top"
								})
							}}
							style={styles.itemWrap}>
							<Text style={styles.tip}>订阅</Text>
							<Text style={styles.tipVal}>0</Text>
						</TouchableOpacity>
						<View style={[styles.itemWrap]}>
							<Text style={styles.tip}>积分</Text>
							<Text style={styles.tipVal}>{isLogin ? userInfo.score : 0}</Text>
						</View>
					</View>
				</ImageBackground>
				<ScrollView >
					<MineList navigation={navigation} />
					<TouchableOpacity
						onPress={this._logout.bind(this)}
						style={{marginLeft: 10,marginRight: 10,marginTop: 20}}>
						<LinearGradient
							colors={[Colors.bodyTextActive,Colors.bodyTextActive]}
							style={styles.linearGradient}>
							<Text style={styles.buttonText}>
								退出
							</Text>
						</LinearGradient>
					</TouchableOpacity>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	avatar: { flexDirection: 'row', paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, },
	itemWrap: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10,
	},
	tip: { lineHeight: 20, fontSize: 14, color: '#fff' },
	tipVal: { lineHeight: 25, fontSize: 18, color: '#fff' },
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 3
	},
	buttonText: {
		fontSize: 18,
		lineHeight: 25,
		textAlign: 'center',
		margin: 10,
		color:'#fff',
		backgroundColor: 'transparent',
	},
})
