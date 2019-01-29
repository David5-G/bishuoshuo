import React from 'react';
import { StyleSheet, Modal, Alert,Dimensions, Platform,Picker, TouchableHighlight, View, SafeAreaView, StatusBar, NativeModules } from 'react-native'
import { Container, Body, Content, List, Toast, Textarea, Thumbnail, Button, ListItem, Item, Input, Text, Left, Right, Icon as NeIcon } from 'native-base'

import NavigationBar from '../common/NavigationBar'
import Loading from '../common/Loading'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import { observer, inject } from 'mobx-react/native'

const { StatusBarManager } = NativeModules
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 38 : StatusBarManager.HEIGHT
const deviceWidth = Dimensions.get("window").width;



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
			sex: 0,
			birthday: '',
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

		this.setState({
			user_nickname: userInfo.user_nickname,
			avatar: userInfo.avatar,
			signature: userInfo.signature,
			user_url: userInfo.user_url,
			sex: userInfo.sex || 0,
			birthday: userInfo.birthday,
		})
	}
	_setUserinfo(title = '') {
		const { modalVisible, loading } = this.state
		if (modalVisible || loading) return
		this.setState({ modalTitle: title, modalVisible: true, })
	}
	async _submitUserinfo() {
		const { user_nickname, avatar, signature, sex, birthday, modalVisible, loading, modalTitle } = this.state
		const { UserStore } = this.props
		let params = {}
		if (loading || !modalVisible) return
		this.setState({ loading: true })
		switch (modalTitle) {
			case 'user_nickname':
				params = { user_nickname }
				break;
			case 'signature':
				params = { signature }
				break;
			case 'birthday':
				params = { birthday }
				break;
			case 'user_url':
				params = { user_url }
				break;
			case 'sex':
				params = { sex }
				break;
			default:
				break;
		}
		const res = await UserStore.setUserInfo(params, { 'XX-Token': UserStore.token, 'XX-Device-Type': 'iphone' })
		console.log('res --> ', res)
		this.setState({
			modalVisible: false,
			loading: false,
			// user_nickname: '',
			// signature: '',
			// birthday: '',
			// user_url: '',
			// sex: 0,
		})
	}
	render() {
		const { navigation } = this.props
		const { userInfo, isLogin } = this.props.UserStore
		const { modalVisible, modalTitle, user_nickname, signature, loading,sex } = this.state
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
						<ListItem icon onPress={this._setUserinfo.bind(this, 'user_nickname')}>
							<Body>
								<Text>昵称</Text>
							</Body>
							<Right>
								<Text>{userInfo.user_nickname}</Text>
								<NeIcon name="arrow-forward" />
							</Right>
						</ListItem>

						{/* <ListItem icon onPress={this._setUserinfo.bind(this, 'birthday')}>
							<Body>
								<Text>生日</Text>
							</Body>
							<Right>
								<Text>{userInfo.birthday}</Text>
								<NeIcon name="arrow-forward" />
							</Right>
						</ListItem> */}

						<ListItem icon onPress={this._setUserinfo.bind(this, 'signature')}>
							<Body>
								<Text>签名</Text>
							</Body>
							<Right>
								<Text numberOfLines={1}>{userInfo.signature}</Text>
								<NeIcon name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem icon onPress={this._setUserinfo.bind(this, 'sex')}>
							<Body>
								<Text>性别</Text>
							</Body>
							<Right>
								{userInfo.sex===0?<Text>保密</Text>:null}
								{userInfo.sex===1?<Text>男</Text>:null}
								{userInfo.sex===2?<Text>女</Text>:null}
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
				<Modal
					animationType="slide"
					visible={modalVisible}
				>
					<View>
						<Loading show={loading} text={'保存中···'} />
						<NavigationBar
							title={nickNameTransfer(modalTitle)}
							leftButton={<Text style={{ paddingLeft: 20, paddingRight: 20, color: Colors.headerText }} onPress={() => {
								if (loading || !modalVisible) return
								this.setState({ modalVisible: false })
							}}>取消</Text>}
							rightButton={<Text style={{ color: Colors.headerText }} onPress={this._submitUserinfo.bind(this)}>完成</Text>}
						/>
						{
							modalTitle === 'user_nickname' ? <Item><Input autoFocus onChangeText={(user_nickname) => this.setState({ user_nickname })} value={user_nickname} placeholder="请输入新昵称" /></Item> : null
						}

						{
							modalTitle === 'signature' ? <Item><Textarea autoFocus onChangeText={(signature) => this.setState({ signature })} value={signature} placeholder="请输入新的签名" /></Item> : null
						}

						{
							modalTitle === 'user_url' ? <Item><Input autoFocus onChangeText={(user_url) => this.setState({ user_url })} value={user_url} placeholder="请输入新的个人网址" /></Item> : null
						}
						
						{
							modalTitle === 'sex' ? 
							<Picker
								style={{width: deviceWidth}}
								selectedValue={sex}
								onValueChange={(itemValue, itemIndex) => this.setState({sex: itemValue})}>
								<Picker.Item label="保密" value={0} />
								<Picker.Item label="男" value={1} />
								<Picker.Item label="女" value={2} />
							</Picker>
							: null
						}
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


const nickNameTransfer =  (name) => {
	if (name === 'user_nickname') {
		return '设置昵称'
	} else if (name === 'signature') {
		return '设置签名'
	} else if (name === 'birthday') {
		return '设置生日'
	} else if (name === 'sex') {
		return '设置性别'
	} else if (name === 'user_url') {
		return '设置首页'
	} else {
		return ''
	}
}