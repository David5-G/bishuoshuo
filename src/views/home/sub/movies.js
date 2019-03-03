import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react/native'
import { View, Text, Button, WebView, ScrollView, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../../constants/Colors'
import { Badge } from '@ant-design/react-native'
import { barHeight, statusBarHeight, isIos, width } from '../../../constants/Scale'
import { toJS } from 'mobx'

@inject('MainStore')
@observer
export default class Block extends React.Component {
	static navigationOptions = {
		title: 'Block',
		header: null
	}
	static proptypes = {
		navigation: PropTypes.object.isRequired,
		MainStore: PropTypes.object.isRequired
	}
	constructor(props) {
		super(props)
		this.state = {
			done: false,
			loading: false,

			type: 'movie',
			movieTag: '热门',
			page_limit: 50,
			page_start: 0,
			categrayMovie: ['热门', '最新', '豆瓣高分', '冷门佳片', '华语', '欧美', '韩国', '日本']
		}
	}
	componentDidMount() {
		this._loadMore()
	}
	async _loadMore() {
		const { type, movieTag, page_limit, page_start, done, loading } = this.state
		if (loading || done) return
		this.setState({ loading: true })
		const res = await MainStore.getMovieList({
			page_start,
			page_limit,
			type,
			tag: movieTag
		})
		if (res && res.subjects && res.subjects.length) {
			this.setState({ page_start: page_start + page_limit })
		} else {
			this.setState({ done: true })
		}
		this.setState({ loading: false })
	}

	render() {
		const { navigation } = this.props
		const { categrayMovie, movieTag, loading } = this.state

		return (
			<View style={{}}>
				<Text style={{ fontSize: 18, marginLeft: 15, lineHeight: 40 }}>最近热门电影</Text>
				<View style={{ flexDirection: 'row', marginLeft: 15 }}>
					{categrayMovie.map((item, i) => {
						return (
							<TouchableOpacity
								key={i}
								onPress={() => {
									if (loading) return
									this.setState({ movieTag: item }, () => {
										this._loadMore()
									})
								}}
							>
								<Text key={i} style={[styles.navItem, item === movieTag && styles.navItemActive]}>
									{item}
								</Text>
							</TouchableOpacity>
						)
					})}
				</View>
				<ScrollView contentContainerStyle={{ marginLeft: 15 }} horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
					{MainStore.hotMovies.map((item, i) => {
						return (
							<TouchableOpacity key={i} style={styles.item} onPress={() => navigation.navigate('HomeDetail',item.id)}>
								<View>
									<Badge text={item.is_new ? 'new' : ''}>
										<Image style={styles.img} source={{ uri: item.cover }} />
									</Badge>
									<View style={{ width: (width - 40) / 3 }}>
										<Text style={styles.title}>{item.title}</Text>
										<Text style={styles.rate}>{item.rate}</Text>
									</View>
								</View>
							</TouchableOpacity>
						)
					})}
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	item: {
		width: 120,
		marginRight: 12,
		paddingTop: 10,
		paddingBottom: 10
	},
	img: {
		width: 120,
		height: (120 * 2867) / 2048,
		borderRadius: 2
	},
	tag: {
		width: 13,
		height: 13,
		marginRight: 5,
		marginTop: 3
	},
	title: {
		fontSize: 13,
		lineHeight: 20,
		color: '#37a',
		marginRight: 2
	},
	rate: {
		fontSize: 13,
		lineHeight: 20,
		color: '#e09015'
	},
	navItem: { marginRight: 5, fontSize: 15, color: Colors.bodyTextGray, lineHeight: 25 },
	navItemActive: {
		fontSize: 15,
		color: Colors.bodyTextDark
	}
})
