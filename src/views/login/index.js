import React from 'react';
import { Alert, View, AsyncStorage, ActivityIndicator, TouchableOpacity, WebView, ScrollView, Button, StyleSheet, TextInput, Text } from 'react-native'
import { Container, Header,Left, Body, Right,Title,Icon as NeIcon, Content, Item, Input, Button as NeButton, Text as NeText } from 'native-base';
import { observer, inject } from 'mobx-react/native'
import LoadingView from '../common/Loading'
import Icon from 'react-native-vector-icons/Ionicons'

import NavigationBar from '../common/NavigationBar'
import Colors from '../../constants/Colors'
@inject('MainStore', 'UserStore')
@observer
export default class Login extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: '',
		header: null,
		// headerRight: (
		// 	<TouchableOpacity onPress={() => navigation.navigate('Regist')}>
		// 		<Text style={{ marginRight: 20, fontSize: 16, color: '#007bff' }}>注册</Text>
		// 	</TouchableOpacity>)
	})
	constructor(props) {
		super(props)
		this.state = {
			text: '',
			password: '',
			loading: false,
		}
		this._getDefaultAccount = this._getDefaultAccount.bind(this)
	}
	componentDidMount() {
		console.log('login--> componentDidMount')
		this._getDefaultAccount()
	}
	componentWillUnmount() {
		console.log('login--> componentWillUnmount')
	}
	render() {
		const { MainStore, UserStore, navigation } = this.props
		const { text, password, loading } = this.state

		var statusBar = {
            backgroundColor: '#333'
        }
		return (
			<Container style={styles.container}>
				<NavigationBar
					title={''}
					style={{}}
					leftButton={<Icon style={{paddingLeft:20,paddingRight:20}} onPress={()=> navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
					rightButton={<Text onPress={()=> navigation.navigate('Regist')} style={{color:Colors.headerText,fontSize:16,}}>注册</Text>}
				/>
				<LoadingView show={loading} />
				<Content style={{paddingLeft: 30, paddingRight: 30}}>
					<View><Text style={styles.title}>登录</Text></View>
					<Item success={text.length === 11}>
						<Input
							onChangeText={(text) => {
								this.setState({ text })
								AsyncStorage.setItem('username', text)
							}}
							maxLength={11}
							value={text}
							placeholder='请输入手机号' />
						<NeIcon name={text.length === 11 ? 'checkmark-circle' : 'information-circle'} />
					</Item>

					<Item success={password.length >= 6}>
						<Input
							secureTextEntry
							onChangeText={(password) => {
								this.setState({ password })
								AsyncStorage.setItem('password', password)
							}}
							value={password}
							placeholder='请输入密码' />
						<NeIcon name={password.length >= 6 ? 'checkmark-circle' : 'information-circle'} />
					</Item>

					<View style={styles.action}>
						<TouchableOpacity onPress={() => navigation.navigate('Findback')}>
							<NeText>忘记密码</NeText>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigation.navigate('Service')}>
							<NeText>联系客服</NeText>
						</TouchableOpacity>
					</View>
					<View style={{ marginTop: 50 }}>
						<NeButton block info={text && password ? false : true} onPress={this._getLogin.bind(this)}>
							<NeText>登 录</NeText>
						</NeButton>
					</View>
				</Content>
			</Container>
		);
	}
	async _getLogin() {
		const { MainStore, UserStore, navigation } = this.props
		const { text, password, loading } = this.state
		if (loading) return
		if (text.length !== 11) {
			Alert.alert('登录', '请输入正确的手机号码')
		} else if (password.length < 6) {
			Alert.alert('登录', '请输入正确的密码')
		} else {
			this.setState({ loading: true })
			const res = await UserStore.userLogin({ username: text, password, device_type: 'iphone' })
			this.setState({ loading: false })
			Alert.alert('登录', res.msg ? res.msg : '错误', [{ text: '确定', onPress: () => res.code === 1 && navigation.navigate('Home') }], { cancelable: false })
		}
	}
	async _getDefaultAccount() {
		const text = await AsyncStorage.getItem('username') || ''
		const password = await AsyncStorage.getItem('password') || ''
		this.setState({ text, password })
	}

}

/* */
const styles = StyleSheet.create({
	title: { fontSize: 30, height: 100, lineHeight: 100 },
	container: { flex: 1, backgroundColor: '#fff'},
	// verifi: {height: 40, borderColor: '#f4f4f4', borderBottomWidth: 1,paddingLeft:10},
	// password: { height: 40, borderColor: '#f4f4f4', marginTop: 20,borderBottomWidth: 1,paddingLeft:10},
	// flex: {flex: 1,flexDirection: 'row',justifyContent: 'space-between',},
	// flexWrap: {
	// 	marginTop: 20,
	// 	height: 40,
	// 	flexDirection: 'row',
	// 	justifyContent: 'space-between',
	// },
	action: {
		display: 'flex',
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderWidth: 0,
	}
});
