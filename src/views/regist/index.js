import React from 'react';
import { Alert, View, ActivityIndicator, TouchableOpacity, WebView, ScrollView, Button, StyleSheet, TextInput, Text } from 'react-native'
import { Container, Header, Content, Item,Icon as NeIcon, Input, Button as NeButton, Text as NeText } from 'native-base';

import { observer, inject } from 'mobx-react/native';
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
	})
	constructor(props) {
		super(props)
		this.state = {
			text: '',
			password: '',
			loading: false,
		}
	}
	async componentDidMount() {
        const { UserStore } = this.props
        let rcures = await UserStore.userGetCurrent()

        console.log('res-->', rcures)
		console.log('login--> componentDidMount')
	}
	componentWillUnmount() {
		console.log('login--> componentWillUnmount')
	}
	render() {
		const { MainStore, UserStore, navigation } = this.props
		const { text, password, loading } = this.state

		return (
			<Container style={styles.container}>
				<NavigationBar
					title={''}
					style={{}}
					leftButton={<Icon style={{paddingLeft:20,paddingRight:20}} onPress={()=> navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
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
						<NeIcon name={text.length === 11 ? 'checkmark-circle' : 'information-circle'} />
					</Item>
					<Item success={password.length >= 6}>
						<Input
							secureTextEntry
							onChangeText={(password) => this.setState({ password })}
							placeholder='请输入密码' />
						<NeIcon name={password.length >= 6 ? 'checkmark-circle' : 'information-circle'} />
					</Item>
					<View style={{ marginTop: 50 }}>
						<NeButton onPress={this._getRegist.bind(this)} block info={text && password ? false : true}>
							<NeText>注 册</NeText>
						</NeButton>
					</View>
				</Content>
			</Container>
		);
	}
	async _getRegist() {
		const { UserStore } = this.props
		const { text, password, loading } = this.state
		if (loading) return
		if (text.length <6 ) {
			Alert.alert('注册', '长度大于6位的账户名')
        }
        else if (password.length < 6) {
			Alert.alert('注册', '请输入长度大于6位的密码')
		} else {
            // this.setState({ loading: true })
            // userRegister
			const res = await UserStore.userRegister({ username: text, password })
            // this.setState({ loading: false })
            console.log('res-->', res)
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
