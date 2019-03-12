/**
 * @format
 */

import React from 'react'
import { View, Text, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Flex, Icon, Button } from '@ant-design/react-native'
import { Picker } from 'native-base'
import DrawerNavigationBar from '../common/DrawerHeader'
import Loading from '../common/Loading.js'

import Colors from '../../constants/Colors'
import { observer, inject } from 'mobx-react/native'
import reset from '../../styles'
import { toJS } from 'mobx'
import { width } from '../../constants/Scale'
const typeList = [
	{
		type: 'unfinished_column',
		title: '长篇连载榜',
		tip: '作品三日内有更新，按周热度排行',
		index: 'featured',
		verbose: 1
	},
	{
		type: 'long_finalized',
		title: '长篇完本榜',
		tip: '十万字以上完本，按周热度排行',
		index: 'featured',
		verbose: 1
	},
	{
		type: 'intermediate_finalized',
		title: '中篇榜',
		tip: '十万字以下完本，按周热度排行',
		index: 'featured',
		verbose: 1
	},
	{
		type: 'new_column',
		title: '长篇连载新作榜',
		tip: '作品三日内有更新且上架不到一月，按阅读数排行',
		index: 'featured',
		verbose: 1
	},
	{
		type: 'unfinished_column',
		title: '女性・长篇连载榜',
		tip: '作品三日内有更新，按周热度排行',
		index: 'womens_fiction',
		verbose: 1
	},
	{
		type: 'long_finalized',
		title: '女性・长篇完本榜',
		tip: '十万字以上完本，按周热度排行',
		index: 'womens_fiction',
		verbose: 1
	},
	{
		type: 'intermediate_finalized',
		title: '女性・中篇榜',
		tip: '十万字以下完本，按周热度排行',
		index: 'womens_fiction',
		verbose: 1
	},
	{
		type: 'new_column',
		title: '女性・长篇连载新作榜',
		tip: '作品三日内有更新且上架不到一月，按阅读数排行',
		index: 'womens_fiction',
		verbose: 1
	},
	{
		type: 'unfinished_column',
		title: '悬疑・长篇连载榜',
		tip: '作品三日内有更新，按周热度排行',
		index: 'mystery_fiction',
		verbose: 1
	},
	{
		type: 'long_finalized',
		title: '悬疑・长篇完本榜',
		tip: '十万字以上完本，按周热度排行',
		index: 'mystery_fiction',
		verbose: 1
	}
]

@inject('UserStore', 'MainStore')
@observer
export default class Book extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		drawerLabel: '图书',
		drawerIcon: ({ tintColor }) => <Icon name='md-menu' size={24} color='#fff' />
	})
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			cur: 0,
			typeList,
			imgUri: 'https://img3.doubanio.com/f/ark/7a86d428c3b93940a3c733baeb8b228d16b30d16/pics/ranking/bg-mystery_fiction-long_finalized.png'
		}
	}
	componentDidMount() {
		this._initData()
	}
	async _initData() {
		const { loading, typeList, cur } = this.state
		const { MainStore } = this.props
		if (loading) return
		this.setState({ loading: true })
		const books = await MainStore.getBooks({
			type: typeList[cur].type,
			index: typeList[cur].index,
			verbose: typeList[cur].verbose,
		})

		this.setState({ loading: false, imgUri: books.list[cur].works.cover })
	}
	render() {
		const { navigation, MainStore } = this.props
		const { typeList, cur, loading, imgUri } = this.state

		return (
			<View style={styles.container}>
                <DrawerNavigationBar navigation={navigation} />
                <Loading show={loading} />
				<ImageBackground style={{ width, height: 100 }} source={{ uri: imgUri }}>
					<View style={[reset.pd20]}>
						<Text style={[reset.cw, reset.fs20, reset.lh30]}>{typeList[cur].title}</Text>
						<Text style={[reset.cw, reset.fs16, reset.lh25]}>{typeList[cur].tip}</Text>
					</View>
				</ImageBackground>

				<View style={[reset.row, reset.bgw, reset.bb1, reset.bc]}>
					<Flex justify='start'>
						<Picker
							mode='dropdown'
							textStyle={{ color: Colors.tintColor }}
							itemStyle={{
								backgroundColor: '#fff',
								marginLeft: 0,
								paddingLeft: 10
							}}
							headerBackButtonText='取消'
							itemTextStyle={{ color: '#788ad2' }}
							style={{}}
							selectedValue={this.state.cur}
							onValueChange={i => {
								if (loading) return
								this.setState({ cur: i }, () => this._initData())
							}}
						>
							{typeList.map((item, i) => {
								return <Picker.Item key={i} label={item.title} value={i} />
							})}
						</Picker>
						<Icon name={'down-square'} color={Colors.tintColor} />
					</Flex>
				</View>

				<ScrollView style={{ width }}>
					{MainStore.books.map((item, i) => {
						const { works } = item
						console.log(toJS(works.url))
						const { abstract, author, averageRating, editorHighlight, cover, highlightTags, id, kinds, title, wordCount, wordCountUnit } = works
						return (
							<TouchableOpacity onPress={() => navigation.navigate('BookDetail', works.url)} key={i} style={[reset.mb5, reset.bgw, reset.pd10, { width }]}>
								<View style={[reset.lh20, styles.flag, reset.br2]}>
									<Text style={[reset.tc, { color: '#fff' }]}>No.{i + 1}</Text>
								</View>
								<View style={[reset.row, { width: width - 20 }]}>
									<Image style={[reset.br4, { width: 80, height: 120 }]} source={{ uri: cover }} />
									<View style={[reset.ml10, reset.br1, reset.bc]}>
										<Text style={[reset.fs20]}>{title}</Text>
										<Text style={[reset.fs16, reset.mt5, reset.lh25, reset.tip]}>{author.map(item => item.name + ' ')}</Text>
										<Text style={[reset.fs16, reset.lh25, reset.tip]}>{highlightTags.map(item => item.name + ' ')}</Text>
										<Text numberOfLines={2} style={[reset.fs16, reset.lh25, reset.tip, { width: width - 170 }]}>
											{editorHighlight}
										</Text>
									</View>
									<View
										style={[
											{
												width: 50,
												alignSelf: 'center',
												flex: 1
											}
										]}
									>
										<Text style={[reset.tip, reset.tc]}>想看</Text>
									</View>
								</View>
								<View style={[reset.mt5, { width: width - 20 }]}>
									<Text style={[reset.br2, reset.lh40, reset.bgg, reset.fs16, reset.pl10, reset.tip]}>
										约 {(wordCount / 10000).toFixed(2)}万{wordCountUnit}
									</Text>
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
	flag: {
		backgroundColor: 'tomato',
		width: 40,
		fontSize: 10,
		marginBottom: 5
	}
})
