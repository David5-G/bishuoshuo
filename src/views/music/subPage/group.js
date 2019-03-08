import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react/native'
import { View, Text, Button, WebView, ScrollView, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../../constants/Colors'
import { Badge } from '@ant-design/react-native'
import { barHeight, statusBarHeight, isIos, width } from '../../../constants/Scale'
import { toJS } from 'mobx'
import {GET } from '../../../utils/request'
@inject('MainStore')
@observer
export default class Block extends React.Component {
	static navigationOptions = {
		title: 'Block',
		header: null
	}
	static proptypes = {
		navigation: PropTypes.object.isRequired,
        MainStore: PropTypes.object.isRequired,
        tag: PropTypes.string.isRequired
	}
	constructor(props) {
		super(props)
		this.state = {
            loading: false,
            musics: [],
		}
	}
	componentDidMount() {
		this._loadMore()
	}
	async _loadMore() {
		const { loading } = this.state
		if (loading) return
        this.setState({ loading: true })
        const {tag} = this.props

        const res  = await GET('https://api.douban.com/v2/music/search?q='+ tag +'&count=15')
        this.setState({ loading: false,musics: res.musics })
        
	}

	render() {
		const { navigation } = this.props
		const { loading,musics } = this.state

		return (
			<View style={{}}>
				
				<ScrollView contentContainerStyle={{ marginLeft: 15 }} horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
					{musics.map((item, i) => {
						return (
							<TouchableOpacity key={i} style={styles.item} onPress={{}}>
								<View>
									<Badge text={item.rating.average}>
										<Image style={styles.img} source={{ uri: item.image }} />
									</Badge>
									<View style={{ width: (width - 40) / 3 }}>
										<Text numberOfLines={2} style={styles.title}>{item.title}</Text>
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
		marginRight: 20,
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
