import React from 'react';
import { StyleSheet, Modal,Platform, TouchableHighlight, View, SafeAreaView, StatusBar, NativeModules } from 'react-native'
import { Container, Body, Content, List, Thumbnail, Button, ListItem, Item ,Input, Text, Left, Right, Icon as NeIcon } from 'native-base'

import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import { observer, inject } from 'mobx-react/native'

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 38 : StatusBarManager.HEIGHT;



@inject('UserStore') @observer export default class Userinfo extends React.Component {
	static navigationOptions = {
		title: 'Userinfo',
		header: null,
	}
	constructor(props) {
		super(props)
		this.state = {
			modalVisible: false,
			loading: false,
			modalTitle: '',
			

			user_nickname: '',
			avatar: '',
			signature: '',
			user_url: '',
			sex: null,
			birthday: '',
			user_email: '',
		}
		// @action setUserInfo(params = {}, header = {}) { //查找用户信息
		// user_nickname mm 用户昵称 【参数名参与更改时,不论参数值是否为空都会更改】
		// avatar 20181015\cbae14e740a24cb826f6972150babe8e.jpg 用户头像【参数名参与更改时,不论参数值是否为空都会更改】
		// signature 开开心心又一天 个性签名【参数名参与更改时,不论参数值是否为空都会更改】
		// user_url https://www.eolinker.com 用户个人网址【参数名参与更改时,不论参数值是否为空都会更改】
		// sex 1 性别;0:保密,1:男,2:女 【参数名参与更改时,不论参数值是否为空都会更改】
		// birthday 19990909 生日 【参数名参与更改时,不论参数值是否为空都会更改】
	}
	componentDidMount() {
		const { navigation } = this.props
		const { userInfo, isLogin } = this.props.UserStore
		if (!isLogin) {
			navigation.navigate('Login')
		}
	}
	_setUserinfo (title='') {
		const { modalVisible,loading } = this.state
		console.log(modalVisible,  loading)
		if (modalVisible || loading) return
		this.setState({modalTitle: title,modalVisible: true,})
	}
	_submitUserinfo () {
		const { user_nickname,avatar,signature,sex,birthday,user_email,loading,modalTitle } = this.state
		const { setUserInfo,token } = this.props.UserStore
		let params = {}

		console.log(modalVisible,  loading)

		this.setState({loading: true})
		switch (modalTitle) {
			case 'user_nickname':
				params = {user_nickname}
				break;
			case 'signature':
				params = {signature}
				break;
			case 'birthday':
				params = {birthday}
				break;
			case 'user_url':
				params = {user_url}
				break;
			case 'user_email':
				params = {user_email}
				break;
			default:
				break;
		}
		if (loading) return
		setUserInfo(params,{'XX-Token':token,'XX-Device-Type': 'iphone'}).then(res => {
			this.setState({loading: false})
			console.log( 'setUserInfo-->', res)
			this.setState({modalVisible: false})
		})
	}
	render() {
		const { navigation } = this.props
		const { userInfo, isLogin } = this.props.UserStore
		const { modalVisible,modalTitle, user_nickname } = this.state
		return (
			<Container style={styles.container}>
				<NavigationBar
					title={'个人信息'}
					style={{}}
					leftButton={<Icon style={{ paddingLeft: 20, paddingRight: 20 }} onPress={() => navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
				/>
				<Content>
					<List>
						<ListItem style={{ borderBottomWidth: 0 }}>
							<Left>
								<Thumbnail square style={{ width: 40, height: 40 }} source={{ uri: userInfo.avatar ? userInfo.avatar : 'https://img.alicdn.com/tps/TB1ld1GNFXXXXXLapXXXXXXXXXX-200-200.png' }} />
							</Left>
							<Right>
								<NeIcon name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem itemDivider></ListItem>
						<ListItem icon onPress={this._setUserinfo.bind(this,'user_nickname')}>
							<Body>
								<Text>昵称</Text>
							</Body>
							<Right>
								<Text>{userInfo.user_nickname}</Text>
								<NeIcon name="arrow-forward" />
							</Right>
						</ListItem>

						<ListItem icon onPress={this._setUserinfo.bind(this,'birthday')}>
							<Body>
								<Text>生日</Text>
							</Body>
							<Right>
								<Text>{userInfo.birthday}</Text>
								<NeIcon name="arrow-forward" />
							</Right>
						</ListItem>

						<ListItem icon onPress={this._setUserinfo.bind(this,'signature')}>
							<Body>
								<Text>签名</Text>
							</Body>
							<Right>
								<Text>{userInfo.signature}</Text>
								<NeIcon name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem icon >
							<Body>
								<Text>性别</Text>
							</Body>
							<Right>
								<NeIcon name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem icon onPress={this._setUserinfo.bind(this,'user_email')}>
							<Body>
								<Text>邮箱</Text>
							</Body>
							<Right>
								<Text>{userInfo.user_email}</Text>
								<NeIcon name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem icon>
							<Body>
								<Text>手机号</Text>
							</Body>
							<Right>
								<Text>{userInfo.mobile}</Text>
								<NeIcon active name="arrow-forward" />
							</Right>
						</ListItem>

						<ListItem icon>
							<Body>
								<Text>注册时间</Text>
							</Body>
							<Right>
								<Text>{new Date(userInfo.create_time).toDateString()}</Text>
								<NeIcon active name="arrow-forward" />
							</Right>
						</ListItem>
					</List>
				</Content>
				<Button onPress={() => this.setState({ modalVisible: true })}><Text>click</Text></Button>
				<Modal
					animationType="slide"
					visible={modalVisible}
					onRequestClose={() => {
						alert("Modal has been closed.");
					}}
				>
					<View>
						<NavigationBar
							title={modalTitle}
							leftButton={<Text style={{ paddingLeft: 20, paddingRight: 20 , color:Colors.headerText }} onPress={() => this.setState({modalVisible: false})}>取消</Text>}
							rightButton={<Text style={{ color:Colors.headerText}} onPress={this._submitUserinfo.bind(this)}>确定</Text>}
						/>
						<Item><Input onChangeText={(user_nickname) => this.setState({user_nickname}) } value={user_nickname} placeholder="请输入新昵称" /></Item>
					</View>
				</Modal>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
