import React from 'react';
import { StyleSheet } from 'react-native'
import { Container, Body, Content, List, Thumbnail, Button, ListItem, Text, Left, Right, Icon as NeIcon } from 'native-base'

import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import { observer, inject } from 'mobx-react/native'


@inject('UserStore') @observer export default class Userinfo extends React.Component {
	static navigationOptions = {
		title: 'Userinfo',
		header: null,
	}
	constructor(props) {
		super(props)
		this.state = {}
	}
	componentDidMount () {
		const { navigation } = this.props
		const { userInfo,isLogin } = this.props.UserStore
		if (!isLogin) {
			navigation.navigate('Login')
		}
	}
	render() {
		const { navigation } = this.props
		const { userInfo,isLogin } = this.props.UserStore
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
						<ListItem icon>
							<Body>
								<Text>昵称</Text>
							</Body>
							<Right>
								<Text>{userInfo.user_nickname}</Text>
								<NeIcon name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem icon>
							<Body>
								<Text>签名</Text>
							</Body>
							<Right>
								<Text>{userInfo.signature}</Text>
								<NeIcon name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem icon>
							<Body>
								<Text>性别</Text>
							</Body>
							<Right>
								<NeIcon name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem icon>
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
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
