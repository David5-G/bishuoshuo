import React from 'react';
import { Alert, View, ActivityIndicator, TouchableOpacity, WebView, ScrollView, Button, StyleSheet, TextInput, Text } from 'react-native'
import { Container, Header, Content, Item, Input, Icon, Button as NeButton, Text as NeText } from 'native-base';

import { observer, inject } from 'mobx-react/native';
import LoadingView from '../common/Loading'

import { Icon as Eicon } from 'expo'
import NavigationBar from '../common/NavigationBar'
import Colors from '../../constants/Colors'

@inject('MainStore', 'UserStore')
@observer
export default class Login extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: '',
		header: null,
	})
	constructor(props) {
		super(props)
		this.state = {
			text: '',
			password: '',
			verification_code: '',
			loading: false,
		}
	}
	componentDidMount() {
		console.log('login--> componentDidMount')
	}
	componentWillUnmount() {
		console.log('login--> componentWillUnmount')
	}
	render() {
		const { MainStore, UserStore, navigation } = this.props
		const { text, password, verification_code, loading } = this.state

		return (
			<Container style={styles.container}>
				<NavigationBar
					title={''}
					style={{}}
					leftButton={<Eicon.Ionicons style={{paddingLeft:20,paddingRight:20}} onPress={()=> navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
					rightButton={<Text onPress={()=> navigation.navigate('Login')} style={{color:Colors.headerText,fontSize:16,}}>登录</Text>}
				/>
				<Content style={{paddingLeft: 30, paddingRight: 30,paddingBottom:20,}}>
					<LoadingView show={loading} />
					<View><Text style={styles.title}>注册</Text></View>
					<Item success={text.length === 11}>
						<Input
							onChangeText={(text) => this.setState({ text })}
							maxLength={11}
							placeholder='请输入手机号' />
						<Icon name={text.length === 11 ? 'checkmark-circle' : 'information-circle'} />
					</Item>
					<Item success={text.length === 11}>
						<Input
							maxLength={6}
							onChangeText={(verification_code) => this.setState({ verification_code })}
							placeholder='请输入验证码' />
						<Icon name={verification_code.length === 6 ? 'checkmark-circle' : 'information-circle'} />
						<NeText onPress={this._getCode.bind(this)}>点击获取</NeText>
						{/* <NeButton
							transparent
							success={text.length === 11}
							dark={text.length !== 11}
							style={{ marginTop: 2 }}
							onPress={() => {}}>
							<NeText>获取验证码</NeText>
						</NeButton> */}
					</Item>
					<Item success={password.length >= 6}>
						<Input
							secureTextEntry
							onChangeText={(password) => this.setState({ password })}
							placeholder='请输入密码' />
						<Icon name={password.length >= 6 ? 'checkmark-circle' : 'information-circle'} />
					</Item>
					<View style={{ marginTop: 50 }}>
						<NeButton onPress={this._getRegist.bind(this)} block info={text && password && verification_code ? false : true}>
							<NeText>注 册</NeText>
						</NeButton>
					</View>
				</Content>
				<View style={styles.footer}>
                    <NeText>如遇问题请</NeText>
                    <TouchableOpacity onPress={()=> navigation.navigate('Service')}>
                        <NeText style={styles.service}>联系客服</NeText>
                    </TouchableOpacity>
                </View>
			</Container>
		);
	}
	async _getCode() {
		const { MainStore, UserStore } = this.props
		const { text, password, verification_code, loading } = this.state
		if (loading) return
		if (text.length !== 11) {
			// Alert.alert('获取验证码','请输入正确的手机号码',[{ text: '确定', onPress: () => console.log('OK Pressed') },],{ cancelable: false })
			Alert.alert('获取验证码', '请输入正确的手机号码')
			return
		}
		this.setState({ loading: true })
		const res = await UserStore.userVerificationCode({ username: text })
		this.setState({ loading: false })
		Alert.alert('获取验证码', res.msg ? res.msg : '错误')
	}
	async _getRegist() {
		const { MainStore, UserStore } = this.props
		const { text, password, verification_code, loading } = this.state

		if (loading) return
		if (text.length !== 11) {
			Alert.alert('注册', '请输入正确的手机号码')
		} else if (verification_code.length !== 6) {
			Alert.alert('注册', '请输入正确的验证码')
		} else if (password.length < 6) {
			Alert.alert('注册', '请输入长度大于6位的密码')
		} else {
			this.setState({ loading: true })
			const res = await UserStore.userRegister({ username: text, password, verification_code })
			this.setState({ loading: false })
			Alert.alert('注册', res.msg ? res.msg : '错误', [{
				text: '确定', onPress: () => {
					if (res.code === 1) {
						this.props.navigation.navigate('Login')
					}
				}
			}])

		}
	}

}

/* */
const styles = StyleSheet.create({
	title: { fontSize: 30, height: 100, lineHeight: 100 },
	container: { flex: 1, backgroundColor: Colors.bodyBackground,},
	footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: 48,
    },
    service: {
        color: Colors.bodyTextActive,
        marginLeft: 10,
    },
});
