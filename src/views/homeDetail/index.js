import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity,ActivityIndicator, ScrollView, Modal, FlatList } from 'react-native'
import NavigationBar from '../common/NavigationBar'
import Colors from '../../constants/Colors'
import { Flex, Icon, WingBlank, List, Badge, WhiteSpace, Tag, Button } from '@ant-design/react-native'
import { width } from '../../constants/Scale'
import { GET, POST } from '../../utils/request'
import reset from '../../styles'
import { observer, inject } from 'mobx-react/native'

const Item = List.Item
const Brief = Item.Brief

@inject('UserStore', 'MainStore')
@observer
export default class About extends React.Component {
	static navigationOptions = {
		title: 'About',
		header: null
	}
	constructor() {
		super(...arguments)
		this.state = {
			detailLoading: false,
			lines: 3,
			detail: null,

			commentLoading: false,
			comments: [],
			start: 0,
			count: 5,
			done: false,
			modelShow: false
		}
	}
	componentDidMount() {
		this._initData()
		this._getComments()
	}
	async _initData() {
		const { detailLoading } = this.state
		const { navigation } = this.props
		const { params } = navigation.state

		if (detailLoading) return
		this.setState({ detailLoading: true })

		const detail = await GET('https://m.douban.com/rexxar/api/v2/elessar/subject/' + params)

		if (!this) return
		this.setState({ detailLoading: false })
		detail && this.setState({ detail })
	}

	async _getComments() {
		console.log('_getComments-->')
		const { navigation } = this.props
		const { params } = navigation.state
		const { commentLoading, start, count, done, comments } = this.state
		if (commentLoading || done) return
		this.setState({ commentLoading: true })
		const res = await GET('https://api.douban.com/v2/movie/subject/' + params + '/comments', {
			apikey: '0b2bdeda43b5688921839c8ecb20399b',
			start,
			count
		})
		if (res && res.comments) {
			this.setState({ comments: comments.length ? [...comments, ...res.comments] : res.comments, start: start + count })
			if (res.comments.length === 0) {
				this.setState({ done: true })
			}
		}
		this.setState({ commentLoading: false })
	}
	render() {
		const { navigation } = this.props
		const { detailLoading, detail, lines, comments, modelShow } = this.state

		console.log('comments-->', comments)
		if (!detail || !comments) {
			return (
				<View>
					<NavigationBar
						childView={
							<Flex justify='between'>
								<Icon name={'arrow-left'} color={'#fff'} onPress={() => navigation.goBack()} />
							</Flex>
						}
					/>
					<View>
						<Text>加载中...</Text>
					</View>
				</View>
			)
		}

		let des = detail.desc.match(/<div[^>]*>([\s\S]*)<\/div>/g)
		des = des[0].replace(/<\/?.+?\/?>/g, '')
		return (
			<View style={styles.container}>
				<NavigationBar
					childView={
						<Flex justify='between'>
							<Icon name={'arrow-left'} color={'#fff'} onPress={() => navigation.goBack()} />
						</Flex>
					}
				/>
				<ScrollView>
					<View style={[reset.bgw,reset.pb20]}>
						<WingBlank>
							<WhiteSpace />
							<Flex justify='start' align='start'>
								<Flex.Item style={{ marginRight: 10 }}>
									<Text style={{ fontSize: 20, lineHeight: 25 }}>
										{detail.title}({detail.extra.year})
									</Text>
									<Brief>{detail.extra.short_info}</Brief>
									<WhiteSpace />
									<Flex justify='start' wrap='wrap'>
										{detail.tags.map((item, i) => (
											<Tag key={i}>{item.name}</Tag>
										))}
									</Flex>
								</Flex.Item>
								<Badge>
									<Image style={{ width: 100, height: 138 }} source={{ uri: detail.cover_img.url }} />
								</Badge>
							</Flex>
						</WingBlank>
					</View>
					<TouchableOpacity
						onPress={() => {
							this.setState({ lines: lines === 0 ? 3 : 0 })
						}}
					>
						<View style={[reset.bgw, reset.mt5, reset.pb20]}>
							<WingBlank>
								<WhiteSpace />
								<Text style={[reset.fs25, reset.lh30, reset.bgw, reset.mt10]}>剧情简介</Text>
								<Icon name='down' />
								<Text numberOfLines={lines} style={{ lineHeight: 25, fontSize: 16, marginTop: 5 }}>
									{des}
								</Text>
							</WingBlank>
						</View>
					</TouchableOpacity>
					<WhiteSpace />
					<View style={[reset.bgw]}>
						<WingBlank>
							<Text style={[reset.fs20, reset.lh40, reset.bgw, reset.mt5]}>热门评论</Text>
							{comments.map((item, i) => {
                                
                                if (i >=5 ) return null
                                const { author, content, rating, useful_count, created_at } = item
								return (
									<View key={i} style={[reset.mb20]}>
										<Flex justify='start' align='start'>
											<Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{ uri: author.avatar }} />
											<View style={[reset.ml5, { width: width - 75 }]}>
												<Flex justify='start'>
													<Text style={[reset.fs20, reset.lh40]}>{author.name}</Text>
													<Text style={[reset.fs18, reset.lh40]}>{rating.value}</Text>
												</Flex>
												<Text style={[reset.lh25, reset.cg, reset.fs16]}>{created_at}</Text>
												<Text style={[reset.lh25, reset.fs16, reset.tj, reset.cg, reset.mt5]}>{content}</Text>
												<Flex justify='start' style={[reset.mt10]}>
													<Icon name={'like'} />
													<Text style={[reset.ml5, reset.cg]}>{useful_count}</Text>
												</Flex>
											</View>
										</Flex>
									</View>
								)
							})}
							<Button style={[reset.mb50]} type={'ghost'} onPress={() => this.setState({ modelShow: true })}>
								查看全部评论
							</Button>
						</WingBlank>
					</View>
				</ScrollView>
				<Modal animationType='slide' transparent={false} visible={modelShow}>
					<NavigationBar
						childView={
							<Flex justify='between'>
								<Flex.Item>
									<Text />
								</Flex.Item>
								<Flex.Item>
									<Text style={[reset.fs20, reset.tc, reset.cw]}>全部评论</Text>
								</Flex.Item>
								<Flex.Item>
									<Text style={[reset.tr]}>
										<Icon name={'arrow-down'} color={'#fff'} onPress={() => this.setState({ modelShow: false })} />
									</Text>
								</Flex.Item>
							</Flex>
						}
					/>
					<View style={[reset.bgw,reset.pb50,]}>
						<WingBlank>
							<FlatList
								overScrollMode={'never'}
								overScroll={'never'}
								data={comments}
								renderItem={this._renderItemView.bind(this)}
								keyExtractor={this._keyExtractor} //唯一的key
								// ListHeaderComponent={channel === 'global' ?  <Banners navigation={navigation} />: null}
								ListFooterComponent={this._renderFooter.bind(this)}
								onEndReached={this._getComments.bind(this)}
								onEndReachedThreshold={1}
							/>
						</WingBlank>
					</View>
				</Modal>
			</View>
		)
	}

	_renderItemView({ item }) {
        const { author, content, rating, useful_count, created_at } = item
        console.log('_renderItemView-->',item)
		return (
			<View style={[reset.mb20]}>
				<Flex justify='start' align='start'>
					<Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{ uri: author.avatar }} />
					<View style={[reset.ml5, { width: width - 75 }]}>
						<Flex justify='start'>
							<Text style={[reset.fs20, reset.lh40]}>{author.name}</Text>
							<Text style={[reset.fs18, reset.lh40]}>{rating.value}</Text>
						</Flex>
						<Text style={[reset.lh25, reset.cg, reset.fs16]}>{created_at}</Text>
						<Text style={[reset.lh25, reset.fs16, reset.tj, reset.cg, reset.mt5]}>{content}</Text>
						<Flex justify='start' style={[reset.mt10]}>
							<Icon name={'like'} />
							<Text style={[reset.ml5, reset.cg]}>{useful_count}</Text>
						</Flex>
					</View>
				</Flex>
			</View>
		)
	}
	_renderFooter() {
		const { done, commentLoading } = this.state

		if (done) {
			return (
				<View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start' }}>
					<Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5 }}>没有更多评论了</Text>
				</View>
			)
		} else if (commentLoading) {
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
		flex: 1,
		paddingBottom: 40
	}
})
