import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'

import DrawerNavigationBar from '../common/DrawerHeader'
import Loading from '../common/Loading.js'

import Score from '../common/score.js'
import Colors from '../../constants/Colors'
import { observer, inject } from 'mobx-react/native'
import { List, Flex, Button, Icon, Badge, WingBlank, Tag, WhiteSpace, Toast, portal } from '@ant-design/react-native'
import { toJS } from 'mobx'
import Group from './subPage/group.js'
import reset from '../../styles'
import { width } from '../../constants/Scale.js'
const Item = List.Item
const Brief = Item.Brief
@inject('UserStore', 'MainStore')
@observer
export default class Music extends React.Component {
	static navigationOptions = {
		title: 'Music',
		header: null
	}
	constructor(props) {
		super(props)
		this.state = {
			loading: false
		}
	}
	componentDidMount() {
		// genres=1&platforms=94%2C17%2C96&q=&sort=rating
	}

	render() {
		const { navigation, MainStore } = this.props
		const { loading } = this.state
		return (
			<View style={styles.container}>
				<DrawerNavigationBar navigation={navigation} />
				<ScrollView>
					<WhiteSpace />
					<Item>
						<Flex justify='between'>
							<Text style={[reset.fs20, reset.lh30]}>华语经典歌曲</Text>
							<TouchableOpacity>
								<Text style={[reset.fs14, reset.lh30, { color: Colors.tintColor }]}>更多</Text>
							</TouchableOpacity>
						</Flex>
						<Group tag={'华语'} navigation={navigation} />
					</Item>
					<WhiteSpace />
					<Item>
						<Flex justify='between'>
							<Text style={[reset.fs20, reset.lh30]}>欧美经典歌曲</Text>
							<TouchableOpacity>
								<Text style={[reset.fs14, reset.lh30, { color: Colors.tintColor }]}>更多</Text>
							</TouchableOpacity>
						</Flex>
						<Group tag={'欧美'} navigation={navigation} />
					</Item>

					<View style={[reset.mt10, reset.pb40, reset.bgw]}>
						<Item>
							<Text style={[reset.fs20, reset.lh30]}>分类浏览</Text>
						</Item>
						<Flex justify='between'>
							<Item
								style={{ width: width / 2 }}
								arrow='horizontal'
								onPress={() => {
									navigation.navigate('MusicList', 'pop')
								}}
							>
								流行
							</Item>
							<Item
								style={{ width: width / 2 }}
								arrow='horizontal'
								onPress={() => {
									navigation.navigate('MusicList', 'rock')
								}}
							>
								摇滚
							</Item>
						</Flex>
						<Flex justify='between'>
							<Item
								style={{ width: width / 2 }}
								arrow='horizontal'
								onPress={() => {
									navigation.navigate('MusicList', 'folk')
								}}
							>
								民谣
							</Item>
							<Item
								style={{ width: width / 2 }}
								arrow='horizontal'
								onPress={() => {
									navigation.navigate('MusicList', 'indie')
								}}
							>
								独立
							</Item>
						</Flex>

						<Flex justify='between'>
							<Item
								style={{ width: width / 2 }}
								arrow='horizontal'
								onPress={() => {
									navigation.navigate('MusicList', 'chinese')
								}}
							>
								华语
							</Item>
							<Item
								style={{ width: width / 2 }}
								arrow='horizontal'
								onPress={() => {
									navigation.navigate('MusicList', 'western')
								}}
							>
								欧美
							</Item>
						</Flex>

						<Flex justify='between'>
							<Item
								style={{ width: width / 2 }}
								arrow='horizontal'
								onPress={() => {
									navigation.navigate('MusicList', 'japan')
								}}
							>
								日本
							</Item>
							<Item
								style={{ width: width / 2 }}
								arrow='horizontal'
								onPress={() => {
									navigation.navigate('MusicList', 'korean')
								}}
							>
								韩国
							</Item>
						</Flex>
					</View>
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
