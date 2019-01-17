import React from 'react';
import { View, Button, Dimensions, SafeAreaView,TouchableOpacity, Text, WebView, ScrollView, Image, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { Icon as Eicon } from 'expo'
import Colors from '../../constants/Colors'
import NavigationBar from '../common/NavigationBar'
import { LinearGradient } from 'expo';
import MineList from './subPage/mineList.js'
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
	componentDidMount() {
		console.log('mine--> componentDidMount')


		console.log('userInfo-->')
	}
	componentWillUnmount() {
		console.log('mine--> componentWillUnmount')
	}
	render() {
		const { title } = this.props.MainStore
		const { isLogin, userInfo } = this.props.UserStore
		const {navigation} = this.props
		return (
			<View style={styles.container}>
				<NavigationBar
					title={''}
					style={{ color: Colors.headerText, fontSize: 20 }}
					titleLayoutStyle={{ fontSize: 30 }}

					rightButton={
						<Eicon.Ionicons
							style={{ paddingLeft: 20, }}
							onPress={() => {
								if (isLogin) {
									Alert.alert('退出')
								} else {
									navigation.navigate('Login')
								}
							}}
							name={isLogin ? 'ios-log-out' : 'ios-log-in'} size={28}
							color={Colors.headerText}
						/>}
				/>
				<View style={{ backgroundColor: Colors.bodyTextActive, borderBottomEndRadius: 20, borderBottomStartRadius: 20, height: 100, }}>
				</View>
				<View style={styles.card}>
					<Image
						style={{ width: 50, height: 50, borderRadius: 27, position: 'relative', top: -25, left: (width - 40) / 2 - 27, backgroundColor: '#fff', borderWidth: 2, borderColor: Colors.bodyTextActive, }}
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
				<View style={{flexDirection: 'row', justifyContent: 'space-between',paddingLeft: 20,paddingRight: 20,marginTop: -50}}>
					<TouchableOpacity onPress={() => navigation.navigate('Login')}>
						<LinearGradient
							colors={['#ffba00','#ff9000']}
							start={{x: 0, y: 0}} end={{x: 1, y: 0}}
							style={{ padding: 10, alignItems: 'center', width: 150,borderRadius: 4,}}>
							<Text style={{backgroundColor: 'transparent', fontSize: 15, color: '#fff', }}>登录</Text>
						</LinearGradient>
					</TouchableOpacity>
					<TouchableOpacity  onPress={() => navigation.navigate('Regist')}>
						<LinearGradient
							colors={['#ff6c47','#ff3c4b']}
							start={{x: 0, y: 0}} end={{x: 1, y: 0}}
							style={{ padding: 10, alignItems: 'center', width: 150, borderRadius: 4,}}>
							<Text style={{backgroundColor: 'transparent',fontSize: 15,color: '#fff',}}>注册</Text>
						</LinearGradient>
					</TouchableOpacity>
				</View>
				<MineList />
			</View>
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
	}
})
