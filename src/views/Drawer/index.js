import React from 'react'
import { View, Text, Button, WebView, ScrollView, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Colors from '../../constants/Colors'
import { Grid, Icon as Aicon } from '@ant-design/react-native'
export default class DrawerNav extends React.Component {
	static navigationOptions = {
		title: 'DrawerNav',
		header: null
	}
	constructor(props) {
		super(props)
		this.state = {}
	}
	componentDidMount() {}
	componentWillUnmount() {}
	render() {
		const { navigation } = this.props
		return (
			<View style={styles.container}>
				<ImageBackground style={{ width: 300, height: 200 }} source={{ uri: 'http://img.hb.aicdn.com/eee4c4d35b3f94e82d2dc696408f0c6a17261fb26bf9-QM1MDD_fw658' }} />
				<ScrollView>
					<View style={[styles.div, styles.pt]}>
						<TouchableOpacity style={styles.line} onPress={() => navigation.navigate('Home')}>
							<Aicon style={styles.icon} name={'play-circle'} />
							<Text style={styles.text}>电影</Text>
							<Text style={styles.tip}>影院热映</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.line} onPress={() => navigation.navigate('Book')}>
							<Aicon style={styles.icon} name={'project'} />
							<Text style={styles.text}>图书</Text>
							<Text style={styles.tip}>沉迷文学</Text>
						</TouchableOpacity>

                        <TouchableOpacity style={styles.line} onPress={() => navigation.navigate('Game')}>
							<Aicon style={styles.icon} name={'codepen'} />
							<Text style={styles.text}>游戏</Text>
							<Text style={styles.tip}>欢迎来到神秘海域</Text>
						</TouchableOpacity>

                        <TouchableOpacity style={styles.line} onPress={() => navigation.navigate('Team')}>
							<Aicon style={styles.icon} name={'deployment-unit'} />
							<Text style={styles.text}>大家说</Text>
							<Text style={styles.tip}>志趣相投</Text>
						</TouchableOpacity>

                        <TouchableOpacity style={styles.line}  onPress={() => navigation.navigate('Program')}>
							<Aicon style={styles.icon} name={'code-sandbox'} />
							<Text style={styles.text}>应用</Text>
							<Text style={styles.tip}>一起玩手机</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.line} onPress={() => navigation.navigate('Music')}>
							<Aicon style={styles.icon} name={'sound'} />
							<Text style={styles.text}>音乐</Text>
							<Text style={styles.tip}>新歌，潮歌</Text>
						</TouchableOpacity>

					</View>

					<View style={[styles.div, styles.pt]}>
						<TouchableOpacity style={styles.line} onPress={() => navigation.navigate('About')}>
							<Aicon style={styles.icon} name={'copyright'} />
							<Text style={styles.text}>关于</Text>
							<Text style={styles.tip}>关于我们</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.line}>
							<Aicon style={styles.icon} name={'dashboard'} />
							<Text style={styles.text}>设置</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.bodyBackground
	},
	div: {},
	line: {
		flexDirection: 'row',
		alignItems: 'center',
		lineHeight: 45,
		height: 45,
		paddingLeft: 20,
		borderBottomWidth: 1,
		backgroundColor: '#fff',
		borderColor: Colors.bodyBackground
	},
	icon: {
		fontSize: 24
	},
	pt: {
		marginBottom: 10
	},
	text: {
		fontSize: 18,
		marginLeft: 10
	},
	tip: {
		fontSize: 12,
		marginLeft: 10,
		marginTop: 5,
		color: Colors.bodyTextGray,
	}
})
