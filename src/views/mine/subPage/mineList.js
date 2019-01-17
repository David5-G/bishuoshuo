import React from 'react';
import { View, Text, WebView, ScrollView,TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Header, Content, List,Button as NeButton, ListItem, Text as NeText, Icon as NeIcon, Left, Body, Right, Switch } from 'native-base';
import { observer, inject } from 'mobx-react/native'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../../constants/Colors';

@inject('UserStore')
@observer
export default class MineList extends React.Component {
	static navigationOptions = {
		title: 'MineList',
	};
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	componentDidMount() {
	}
	componentWillUnmount() {
	}
	render() {
		const {userInfo, isLogin} = this.props.UserStore
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={() => {}}>
					<View style={styles.item}>
						<View style={{flexDirection: 'row'}}>
							<Icon style={styles.iconL} name={'logo-octocat'} size={24} color={Colors.bodyTextActive}  />
							<Text style={styles.text}>个人信息</Text>
						</View>
						<Icon style={styles.iconR} name={'ios-arrow-forward'} color={Colors.bodyTextGray} size={18}  />
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {}}>
					<View style={[styles.item,{borderBottomWidth: 0,borderColor: 'red'}]}>
						<View style={{flexDirection: 'row'}}>
							<Icon style={styles.iconL} name={'ios-filing'} size={24} color={Colors.bodyTextActive}  />
							<Text style={styles.text}>用户反馈</Text>
						</View>
						<Icon style={styles.iconR} name={'ios-arrow-forward'} color={Colors.bodyTextGray} size={18}  />
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => {}}>
					<View style={[styles.item,{marginTop: 10}]}>
						<View style={{flexDirection: 'row'}}>
							<Icon style={styles.iconL} name={'ios-school'} size={24} color={Colors.bodyTextGray}  />
							<Text style={styles.text}>小课堂</Text>
						</View>
						<Icon style={styles.iconR} name={'ios-arrow-forward'} color={Colors.bodyTextGray} size={18}  />
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => {}}>
					<View style={[styles.item]}>
						<View style={{flexDirection: 'row'}}>
							<Icon style={styles.iconL} name={'md-chatboxes'} size={24} color={Colors.bodyTextGray}  />
							<Text style={styles.text}>联系我们</Text>
						</View>
						<Icon style={styles.iconR} name={'ios-arrow-forward'} color={Colors.bodyTextGray} size={18}  />
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => {}}>
					<View style={[styles.item]}>
						<View style={{flexDirection: 'row'}}>
							<Icon style={styles.iconL} name={'ios-mail-unread'} size={24} color={Colors.bodyTextGray}  />
							<Text style={styles.text}>消息中心</Text>
						</View>
						<Icon style={styles.iconR} name={'ios-arrow-forward'} color={Colors.bodyTextGray} size={18}  />
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => {}}>
					<View style={[styles.item]}>
						<View style={{flexDirection: 'row'}}>
							<Icon style={styles.iconL} name={'md-git-network'} size={24} color={Colors.bodyTextGray}  />
							<Text style={styles.text}>分享好友</Text>
						</View>
						<Icon style={styles.iconR} name={'ios-arrow-forward'} color={Colors.bodyTextGray} size={18}  />
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => {}}>
					<View style={[styles.item,{borderBottomWidth: 0}]}>
						<View style={{flexDirection: 'row'}}>
							<Icon style={styles.iconL} name={'ios-man'} size={24} color={Colors.bodyTextGray}  />
							<Text style={styles.text}>关于我们</Text>
						</View>
						<Icon style={styles.iconR} name={'ios-arrow-forward'} color={Colors.bodyTextGray} size={18}  />
					</View>
				</TouchableOpacity>
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
		
	},
	item: {
		paddingLeft: 20,
		paddingRight: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#ffff',
		borderColor: Colors.borderGray,
		borderBottomWidth: 1,
		backgroundColor: '#fff',
	},
	text: {lineHeight: 50,fontSize: 16,marginLeft: 10,color: Colors.bodyTextDark},
	iconL: {
		marginTop: 13,
		width: 25,
	},
	iconR: {
		marginTop: 13,
	},
});
