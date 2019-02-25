import React from 'react'
import {
	View,
	Text,
	Alert,
	WebView,
	ScrollView,
	TouchableOpacity,
    StyleSheet,
    Share,
} from 'react-native'
import {
	Container,
	Header,
	Content,
	List,
	Button as NeButton,
	ListItem,
	Text as NeText,
	Icon as NeIcon,
	Left,
	Body,
	Right,
	Switch
} from 'native-base'
import { observer, inject } from 'mobx-react/native'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../../constants/Colors'

import ShareUtil from '../../../utils/UmengShareUtil.js'
import SharePlatform from '../../../utils/UmengSharePlatform.js'

@inject('UserStore')
@observer
export default class MineList extends React.Component {
	static navigationOptions = {
		title: 'MineList'
	}
	constructor(props) {
		super(props)
		this.state = {}
	}
	componentDidMount() {}
    componentWillUnmount() {}
    async onShare() {
        try {
          const result = await Share.share({
            message:
              'React Native | A framework for building native apps using React',
          })
    
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };
    
	render() {
		const { userInfo, isLogin } = this.props.UserStore
		const { navigation } = this.props
		return (
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => navigation.navigate('Userinfo')}
				>
					<View style={[styles.item, styles.border]}>
						<View style={{ flexDirection: 'row' }}>
							<Text style={styles.text}>个人信息</Text>
							<Text style={styles.tip}>修改个人信息</Text>
						</View>
						<Icon
							style={styles.iconR}
							name={'ios-arrow-forward'}
							color={Colors.bodyTextGray}
							size={18}
						/>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate('Feedback')}
				>
					<View style={[styles.item]}>
						<View style={{ flexDirection: 'row' }}>
							<Text style={styles.text}>用户反馈</Text>
						</View>
						<Icon
							style={styles.iconR}
							name={'ios-arrow-forward'}
							color={Colors.bodyTextGray}
							size={18}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate('Teach')}>
					<View style={[styles.item, styles.border, styles.space]}>
						<View style={{ flexDirection: 'row' }}>
							<Text style={styles.text}>小课堂</Text>
							<Text style={styles.tip}>了解小知识</Text>
						</View>
						<Icon
							style={styles.iconR}
							name={'ios-arrow-forward'}
							color={Colors.bodyTextGray}
							size={18}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => navigation.navigate('Service')}
				>
					<View style={[styles.item, styles.border]}>
						<View style={{ flexDirection: 'row' }}>
							<Text style={styles.text}>联系我们</Text>
						</View>
						<Icon
							style={styles.iconR}
							name={'ios-arrow-forward'}
							color={Colors.bodyTextGray}
							size={18}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => {}}>
					<View style={[styles.item, styles.border]}>
						<View style={{ flexDirection: 'row' }}>
							<Text style={styles.text}>消息中心</Text>
						</View>
						<Icon
							style={styles.iconR}
							name={'ios-arrow-forward'}
							color={Colors.bodyTextGray}
							size={18}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => {
						ShareUtil.shareboard(
							'原油期货天天赚，',
							'https://img.alicdn.com/tfs/TB1nl3daYGYBuNjy0FoXXciBFXa-228-80.jpg',
							'https://www.baidu.com',
							'分享好友',
							[0,1,2,3,4,5,6],
							(code, message) => {
								Alert.alert(code,message)
							}
						)
					}}
				>
					<View style={[styles.item]}>
						<View style={{ flexDirection: 'row' }}>
							<Text style={styles.text}>分享好友</Text>
						</View>
						<Icon
							style={styles.iconR}
							name={'ios-arrow-forward'}
							color={Colors.bodyTextGray}
							size={18}
						/>
					</View>
				</TouchableOpacity>

                <TouchableOpacity
					onPress={this.onShare}
				>
					<View style={[styles.item]}>
						<View style={{ flexDirection: 'row' }}>
							<Text style={styles.text}>share</Text>
						</View>
						<Icon
							style={styles.iconR}
							name={'ios-arrow-forward'}
							color={Colors.bodyTextGray}
							size={18}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.space}
					onPress={() => navigation.navigate('About')}
				>
					<View style={[styles.item, { borderBottomWidth: 0 }]}>
						<View style={{ flexDirection: 'row' }}>
							<Text style={styles.text}>关于</Text>
						</View>
						<Icon
							style={styles.iconR}
							name={'ios-arrow-forward'}
							color={Colors.bodyTextGray}
							size={18}
						/>
					</View>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 10
	},
	item: {
		paddingLeft: 20,
		paddingRight: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#ffff',

		backgroundColor: '#fff'
	},
	text: { lineHeight: 50, fontSize: 17, marginLeft: 10, color: '#111' },
	tip: {
		color: Colors.raise,
		fontSize: 12,
		lineHeight: 50,
		marginLeft: 10
	},
	iconR: {
		marginTop: 13
	},
	border: {
		borderColor: Colors.borderGray,
		borderBottomWidth: 1
	},
	space: {
		marginTop: 10
	}
})
