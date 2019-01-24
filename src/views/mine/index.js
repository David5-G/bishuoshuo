import React from 'react';
import { View, Button, Alert, Dimensions, SafeAreaView, TouchableOpacity, Text, WebView, ScrollView, Image, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Title, Content, Item, Input, Button as NeButton, Text as NeText } from 'native-base';

import { observer, inject } from 'mobx-react/native';

import Colors from '../../constants/Colors'
import NavigationBar from '../common/NavigationBar'
import MineList from './subPage/mineList.js'
import Icon from 'react-native-vector-icons/Ionicons'
const width = Dimensions.get('window').width

@inject('MainStore', 'UserStore')
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
			symbol: 'BSESN'
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
		const { navigation } = this.props
		return (
			<ScrollView style={styles.container}>
				<NavigationBar
					title={''}
					style={{ color: Colors.headerText, fontSize: 20 }}
					titleLayoutStyle={{ fontSize: 30 }}
					rightButton={isLogin ? <Icon
						style={{ paddingLeft: 20, }}
						onPress={this._logout.bind(this)}
						name={isLogin ? 'ios-log-out' : 'ios-log-in'} size={28}
						color={Colors.headerText}
					/> : null}
				/>
				<View style={{ backgroundColor: Colors.bodyTextActive, borderBottomEndRadius: 20, borderBottomStartRadius: 20, height: 100, }}>
				</View>
				<View style={styles.card}>
					<Image
						style={{ width: 50, height: 50, borderRadius: 25, position: 'relative', top: -25, left: (width - 40) / 2 - 27, backgroundColor: '#fff', borderWidth: 2, borderColor: Colors.bodyTextActive, }}
						source={{ uri: userInfo.avatar ? userInfo.avatar : 'https://img.alicdn.com/tps/TB1ld1GNFXXXXXLapXXXXXXXXXX-200-200.png' }}
					/>
					<Text style={{ fontSize: 16, marginTop: -10, textAlign: 'center' }}>您好，{isLogin ? userInfo.user_nickname : '游客'}</Text>
					<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, paddingBottom: 10, }}>
						<View style={{ width: 100 }}>
							<Text style={{ lineHeight: 25, fontSize: 16, color: '#ff3c4b' }}>{isLogin ? userInfo.score : '0.00'}</Text>
							<Text style={{ lineHeight: 25, fontSize: 16 }}>我的积分</Text>
						</View>
						<View style={{ width: 100 }}>
							<Text style={{ lineHeight: 25, fontSize: 16, color: '#febb02' }}>{isLogin ? userInfo.coin : '0.00'}</Text>
							<Text style={{ lineHeight: 25, fontSize: 16 }}>我的金币</Text>
						</View>
					</View>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, marginTop: -50 }}>
					<NeButton
						onPress={() => {
							navigation.navigate('Login')
						}}
						style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginRight: 10, }}>
						<NeText>登录</NeText>
					</NeButton>
					<NeButton
						onPress={() => navigation.navigate('Regist')}
						style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginLeft: 10, }}>
						<NeText>注册</NeText>
					</NeButton>
				</View>
				<MineList navigation={navigation} />
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	card: {
		width: width - 40,
		top: -70,
		left: 20,
		right: 20,
		position: 'relative',
		backgroundColor: '#fff',
		borderRadius: 6,
		zIndex: 100,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 0 },
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 5
	},
	buttonText: {
		fontSize: 18,
		fontFamily: 'Gill Sans',
		textAlign: 'center',
		margin: 10,
		color: '#ffffff',
		backgroundColor: 'transparent',
	},
})
