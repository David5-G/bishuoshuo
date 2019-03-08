/**
 * @format
 */

import React from 'react'
import { View, Text, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Flex, Icon, Button } from '@ant-design/react-native'
import { Picker } from 'native-base'
import NavigationBar from '../common/NavigationBar'
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
			verbose: typeList[cur].verbose
		})

		this.setState({ loading: false, imgUri: books.list[cur].works.cover })
	}
	render() {
		const { navigation, MainStore } = this.props
		const { typeList, cur, loading, imgUri } = this.state

		return (
			<View style={styles.container}>
				<NavigationBar
					childView={
						<Flex justify='between'>
							<Icon name={'bars'} color={'#fff'} onPress={() => navigation.openDrawer()} />
							<Image
								style={{ width: 48, height: 22 }}
								source={{
									uri:
										'data:image/png;base64,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'
								}}
							/>
						</Flex>
					}
				/>
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
							textStyle={{ color: '#5cb85c' }}
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
