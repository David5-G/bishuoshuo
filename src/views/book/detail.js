import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Modal, FlatList } from 'react-native'
import NavigationBar from '../common/NavigationBar'
import Colors from '../../constants/Colors'
import { Flex, Icon, WingBlank, List, Badge, WhiteSpace,portal, Toast, Tag, Modal as AntModal, Button, Card, TabBar, ActivityIndicator } from '@ant-design/react-native'
import { width } from '../../constants/Scale'
import { GET, POST } from '../../utils/request'
import reset from '../../styles'
import { observer, inject } from 'mobx-react/native'

const Item = List.Item
const Brief = Item.Brief

@inject('UserStore', 'MainStore')
@observer
export default class BookDetail extends React.Component {
	static navigationOptions = {
		title: 'BookDetail',
		header: null
	}
	constructor() {
		super(...arguments)
		this.state = {
			bookLoading: false,
			book: [],
			introduce: { agent: {}, highlights: [], tags: [] },
			comments: { data: [] },

			start: 0,
			limit: 10,
			total: 10,
			bookDone: false,
			active: 1,

			modelShow: false
		}
		this.params = this.props.navigation.state.params.replace('column', 'column_v2')
	}
	async componentDidMount() {
		await this._getIntroduce()
		await this._getBook()
		// this._getBook()
	}
	async _getBook() {
		let { bookLoading, start, bookDone, limit, total } = this.state
		if (bookLoading || bookDone) return
		this.setState({ bookLoading: true, done: false })
		let book = await GET('https://read.douban.com/j' + this.params + 'chapters', {
			start,
			limit,
			latestFirst: 0
		})
		// https://read.douban.com/j/column_v2/8270063/chapters?start=0&limit=10&latestFirst=0
		if (!this) return
		let { list } = book
		if (!list.length) {
			this.setState({ bookDone: true })
		}
		list = [...this.state.book, ...list]
		this.setState({ book: list, total: book.total, start: start + limit, bookLoading: false })
	}
	async _getIntroduce() {
		let introduce = await GET('https://read.douban.com/j' + this.params)
		this.setState({ introduce })
	}
	async _getComments(id) {
        const key = Toast.info('收取中...')
		this.setState({ bookLoading: true })
		let comments = await GET('https://read.douban.com/j/article_v2/'+id+'/comment?limit=10&start=0')
		this.setState({ bookLoading: false, comments ,modelShow : true})
        portal.remove(key)
	}
	render() {
		const { navigation } = this.props
		const { bookLoading, bookDone, modelShow, book, introduce, start, total, limit, active, comments } = this.state
		// const { list, fullName, background, channel } = book
		return (
			<View style={styles.container}>
				<NavigationBar
					childView={
						<Flex justify='between'>
							<Flex.Item>
								<Icon name={'arrow-left'} color={'#fff'} onPress={() => navigation.goBack()} />
							</Flex.Item>
							<Flex.Item>
								<Text style={[reset.fs20, reset.tc, reset.cw]}>{introduce.title}</Text>
							</Flex.Item>
							<Flex.Item>
								<Text style={[reset.tr]} />
							</Flex.Item>
						</Flex>
					}
				/>
				{bookLoading && <ActivityIndicator text={'正翻阅书架...'} />}
				<TabBar unselectedTintColor='#949494' tintColor='#33A3F4' barTintColor='#f5f5f5'>
					<TabBar.Item title='简介' icon={<Icon name='minus-square' />} selected={active === 1} onPress={() => this.setState({ active: 1 })}>
						<ImageBackground resizeMode={'cover'} style={{ flex: 1, width }} source={{ uri: introduce.banner }}>
							<WingBlank style={[{ flex: 1, justifyContent: 'space-around' }]}>
								<Text style={[reset.lh50, reset.fs25, reset.tc]}>{introduce.title}</Text>
								<View>
									<Flex justify='center' style={[]}>
										<Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: introduce.agent.picture }} />
										<Text style={[reset.ml30, reset.fs25]}>{introduce.agent.name}</Text>
									</Flex>
									<View style={[reset.mt20]}>
										{introduce.highlights.map((item, i) => {
											return (
												<Text style={[reset.fs16, reset.lh25]} key={i}>
													{item}
												</Text>
											)
										})}
									</View>
								</View>
								<Flex justify='center'>
									{introduce.tags.map((item, i) => {
										return (
											<Tag key={i} size={'lg'}>
												{item.name}
											</Tag>
										)
									})}
								</Flex>
								<WingBlank>
									<Flex justify='between'>
										<Brief>{introduce.wordCount}</Brief>
										<Flex justify='end'>
											<Brief>{introduce.subscriberNum + ' 订阅'}</Brief>
											<Brief style={{ marginLeft: 20 }}>{introduce.readCount + ' 阅读'}</Brief>
										</Flex>
									</Flex>
								</WingBlank>
							</WingBlank>
						</ImageBackground>
					</TabBar.Item>
					<TabBar.Item icon={<Icon name='menu-unfold' />} title='阅读' badge={total} selected={active === 2} onPress={() => this.setState({ active: 2 })}>
						<FlatList
							overScrollMode={'never'}
							overScroll={'never'}
							data={book}
							renderItem={this._renderItemView.bind(this)}
							keyExtractor={this._keyExtractor} //唯一的key
							// ListHeaderComponent={channel === 'global' ?  <Banners navigation={navigation} />: null}
							ListFooterComponent={this._renderFooter.bind(this)}
							onEndReached={this._getBook.bind(this)}
							onEndReachedThreshold={1}
						/>
					</TabBar.Item>
				</TabBar>
				<Modal visible={modelShow}>
					<NavigationBar
						childView={
							<Flex justify='between'>
								<Flex.Item>
									<Text />
								</Flex.Item>
								<Flex.Item>
									<Text style={[reset.fs20, reset.tc, reset.cw]}>最新评论</Text>
								</Flex.Item>
								<Flex.Item>
									<Text style={[reset.tr]}>
										<Icon name={'arrow-down'} color={'#fff'} onPress={() => this.setState({ modelShow: false })} />
									</Text>
								</Flex.Item>
							</Flex>
						}
					/>
					<WingBlank>
						<WhiteSpace />
						<ScrollView>
							{comments.data.map((item, i) => {
								return (
									<View key={i} style={[reset.mb20]}>
										<Flex justify='start' align='start'>
											<Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{ uri: item.author_picture }} />
											<View style={[reset.ml5, { width: width - 75 }]}>
												<Flex justify='start'>
													<Text style={[reset.fs20, reset.lh40]}>{item.author_name}</Text>
													<Text style={[reset.fs18, reset.lh40]}>{item.created_time}</Text>
												</Flex>
												<Text style={[reset.lh25, reset.fs16, reset.tj, reset.cg, reset.mt5]}>{item.text}</Text>
											</View>
										</Flex>
									</View>
								)
							})}
						</ScrollView>
					</WingBlank>
				</Modal>
			</View>
		)
	}

	_renderItemView({ item }) {
		return (
			<Item
				onPress={() => {
					AntModal.alert(item.title, item.abstract, [{ text: '查看评论', onPress: () => this._getComments(item.id) }, { text: '点赞', onPress: () => Toast.success('点赞成功', 1) }, { text: '关闭' }])
				}}
				wrap
				extra=''
				multipleLine
				align='top'
			>
				{item.title}
				<Brief numberOfLines={2} style={[reset.tj, reset.mt5]}>
					{item.abstract}
				</Brief>
				<Card.Footer
					style={[reset.mt10]}
					content={item.onSaleTime}
					extra={
						<Flex justify='end' align='center'>
							<Icon size={18} name={'read'} />
							<Brief style={[reset.ml5]}>{item.commentCount}</Brief>
							<Icon size={17} name={'message'} style={[reset.ml10]} />
							<Brief style={[reset.ml5]}>{item.commentCount}</Brief>
						</Flex>
					}
				/>
			</Item>
		)
	}
	_renderFooter() {
		const { bookDone, bookLoading } = this.state

		if (bookDone) {
			return (
				<View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start' }}>
					<Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5 }}>没有更多了</Text>
				</View>
			)
		} else if (bookLoading) {
			return (
				<View style={styles.footer}>
					<ActivityIndicator />
				</View>
			)
		} else {
			return null
		}
	}
	_keyExtractor(item, index) {
		return index.toString()
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
