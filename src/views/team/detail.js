import React from 'react'
import { View, Text, ScrollView, StyleSheet, Modal, Image, FlatList, TouchableOpacity } from 'react-native'
import NavigationBar from '../common/NavigationBar'
import Colors from '../../constants/Colors'
import { observer, inject } from 'mobx-react/native'
import { List, Flex, Button, Icon, Card, Badge, WingBlank, ActivityIndicator, Tag, WhiteSpace, Toast, portal, TabBar } from '@ant-design/react-native'
import reset from '../../styles'
import { toJS } from 'mobx'
import { GET } from '../../utils/request'
import { width } from '../../constants/Scale'
const Item = List.Item
const Brief = Item.Brief
@inject('UserStore', 'MainStore')
@observer
export default class Team extends React.Component {
	static navigationOptions = {
		title: 'Team',
		header: null
	}
	constructor() {
		super(...arguments)
		this.state = {
			loading: false,
			item: this.props.navigation.state.params,
			desc: { owner: {}, latest_members: [] },
			active: 1,

			topicLoading: false,
			topicStart: 0,
			topicCount: 10,
			topicDone: false,
			topic: [],
			cur: { author: {}, size: {}, photos: [] },
            showModal: false,
            

            commentsLoading: false,
            comments: [],
            commentsDone: false,
            commentsStart: 0,
            commentsCount: 10,
		}
	}
	componentDidMount() {
		this._initData()
		this._getTopic()
	}
	async _initData() {
		const { id } = this.state.item
		this.setState({ loading: true })
		const key = Toast.loading('加载中...')
		const desc = await GET('https://m.douban.com/rexxar/api/v2/group/' + id + '?ck=Kl55&for_mobile=1')
		console.log('desc-->', desc)
		this.setState({ desc, loading: false })
		portal.remove(key)
	}
	async _getTopic() {
		const { id } = this.state.item
		const { topicLoading, topicStart, topicCount, topicDone, topic } = this.state
		if (topicLoading || topicDone) return
		this.setState({ topicLoading: true })
		let tp = await GET('https://api.douban.com/v2/group/' + id + '/topics', {
			start: topicStart,
			count: topicCount
		})
		tp = tp.topics
		console.log('tp-->', tp)

		this.setState({ topicLoading: false })
		if (tp.length === 0) {
			this.setState({ topicDone: true })
		} else {
			this.setState({ topic: topic.length ? [...topic, ...tp] : tp, topicStart: topicStart + topicCount })
		}
	}
    async _getComments () {

        const {
            cur,
            commentsLoading,
            comments,
            commentsDone,
            commentsStart,
            commentsCount,} = this.state
        if (commentsLoading || commentsDone) return
        this.setState({commentsLoading: true})
        const key = Toast.loading('查看回应中...')
        let res = await GET('https://api.douban.com/v2/group/topic/'+cur.id+'/comments',{
            start:commentsStart,
            count: commentsCount,
        })
        if (res.comments) {
            if (res.comments.length === 0) this.setState({commentsDone: true})
            this.setState({comments: comments.length ? [...comments,...res.comments] : res.comments,commentsStart:commentsStart + commentsCount} )
        }
        this.setState({commentsLoading: false})
        Portal.remove(key)
        Toast.success('查看成功') 

    }
	_renderItemView({ item }) {
		return (
			<Item
				onPress={() => this.setState({ cur: item, showModal: true,commentsStart: 0,commentsDone: false,},() => this._getComments())}
				wrap
				multipleLine
				align='top'
			>
				<WhiteSpace />
				<Flex align='start'>
					<View style={[reset.ml10, { width: width - 90 }]}>
						<View>
							<Text style={[reset.fs16]}>{item.title}</Text>
							<Text style={[reset.lh25, reset.fs14, reset.tl, reset.cg]}>{item.author.name}</Text>
						</View>
						<WhiteSpace />
						<Flex justify='between' align='start'>
							<Brief>{item.comments_count}回应</Brief>
							<Brief>{item.created.slice(5, -1)}0</Brief>
						</Flex>
					</View>
					<Image source={{ uri: item.author.avatar }} style={{ width: 40, height: 40 }} />
				</Flex>
			</Item>
		)
	}
	_renderFooter() {
		const { topicDone, topicLoading } = this.state
		if (topicDone) {
			return (
				<View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start' }}>
					<Text style={{ color: '#999999', fontSize: 14 }}>没有更多了</Text>
				</View>
			)
		} else if (topicLoading) {
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
	render() {
		const { navigation } = this.props
		const { loading, topicLoading, desc, active, topic, showModal, cur,comments,commentsDone,commentsLoading, } = this.state
        console.log('render comments-->', comments)
		return (
			<View style={styles.container}>
				<NavigationBar
					childView={
						<Flex justify='between'>
							<Flex.Item>
								<Icon name={'arrow-left'} color={'#fff'} onPress={() => navigation.goBack()} />
							</Flex.Item>
							<Flex.Item>
								<Text numberOfLines={1} style={[reset.fs20, reset.tc, reset.cw]}>{desc.title}</Text>
							</Flex.Item>
							<Flex.Item>
								<Text style={[reset.tr]} />
							</Flex.Item>
						</Flex>
					}
				/>

				<TabBar unselectedTintColor='#949494' tintColor='#33A3F4' barTintColor='#f5f5f5'>
					<TabBar.Item title='小队简介' icon={<Icon name='home' />} selected={active === 1} onPress={() => this.setState({ active: 1 })}>
						{!loading && !topicLoading && (
							<ScrollView>
								<List renderHeader={''}>
									<View style={{ backgroundColor: desc.background_mask_color ? desc.background_mask_color : '#fff' }}>
										<WhiteSpace />
										<WingBlank>
											<Flex justify='center'>
												<Image style={{ width: 50, height: 50 }} source={{ uri: desc.avatar }} />
												<View>
													<Text style={[reset.ml10, reset.lh30, reset.fs18, reset.cw]}>{desc.name}</Text>
													<Text style={[reset.ml10, reset.fs14, reset.lh20, reset.cw]}>
														{desc.member_count}个{desc.member_name}
													</Text>
												</View>
											</Flex>

											<Flex justify='between' style={[reset.mt20]}>
												<Brief style={[reset.fs16, reset.lh25, reset.tc, reset.cw]}>{'创建时间 ' + desc.create_time}</Brief>
												<Brief style={[reset.fs16, reset.lh25, reset.tc, reset.cw]}>{'话题数 ' + desc.topic_count}</Brief>
											</Flex>
										</WingBlank>
										<WhiteSpace />
									</View>
								</List>
								<List renderHeader={'小队简介'}>
									<WhiteSpace />
									<WingBlank>
										<Brief style={[reset.lh20, reset.fs16]}>{desc.desc}</Brief>
									</WingBlank>
									<WhiteSpace />
								</List>

								<List renderHeader={'队长'}>
									<WhiteSpace />
									<WingBlank>
										<Flex>
											<Image source={{ uri: desc.owner.avatar }} style={{ width: 50, height: 50 }} />
											<Text style={[reset.fs14, reset.ml10]}>{desc.owner.name}</Text>
										</Flex>
									</WingBlank>
									<WhiteSpace />
								</List>

								<List renderHeader={'最新成员'}>
									<WhiteSpace />
									<WingBlank>
										{desc.latest_members.map((item, i) => {
											return (
												<View style={[reset.mt10]} key={i}>
													<Flex>
														<Image source={{ uri: item.avatar }} style={{ width: 40, height: 40 }} />
														<View style={[reset.ml10]}>
															<Brief style={[reset.fs16, reset.ml10, reset.lh20]}>昵称 {item.name}</Brief>
															<Brief style={[reset.fs16, reset.ml10, reset.lh20]}>加入时间 {item.reg_time}</Brief>
														</View>
													</Flex>
												</View>
											)
										})}
									</WingBlank>
									<WhiteSpace />
									<Item />
								</List>
							</ScrollView>
						)}
					</TabBar.Item>

					<TabBar.Item title='话题' Badge={desc.topic_count} icon={<Icon name='picture' />} selected={active === 2} onPress={() => this.setState({ active: 2 })}>
						<List renderHeader={'话题'}>
							<FlatList
								overScrollMode={'never'}
								overScroll={'never'}
								data={topic}
								renderItem={this._renderItemView.bind(this)}
								keyExtractor={this._keyExtractor} //唯一的key
								// ListHeaderComponent={channel === 'global' ?  <Banners navigation={navigation} />: null}
								ListFooterComponent={this._renderFooter.bind(this)}
								onEndReached={this._getTopic.bind(this)}
								onEndReachedThreshold={1}
							/>
						</List>
					</TabBar.Item>
				</TabBar>
				<Modal visible={showModal}>
					<NavigationBar
						childView={
							<Flex justify='between'>
								<Flex.Item>
									<Text />
								</Flex.Item>
								<Flex.Item>
									<Text numberOfLines={1} style={[reset.fs20, reset.tc, reset.cw]}>{cur.title}</Text>
								</Flex.Item>
								<Flex.Item>
									<Text style={[reset.tr]}>
										<Icon name={'arrow-down'} color={'#fff'} onPress={() => this.setState({ showModal: false })} />
									</Text>
								</Flex.Item>
							</Flex>
						}
					/>
					<ScrollView>
                        <WingBlank style={[reset.pb50]}>
                            <WhiteSpace />
                            <Flex style={[reset.sw, reset.br5,reset.pb10,reset.bb1,reset.bc]} justify='start'>
                                <Image style={[{ width: 40, height: 40 }, reset.br2]} source={{ uri: desc.avatar }} />
                                <View style={[reset.ml10]}>
                                    <Text style={[reset.lh20, reset.fs14, reset.cg]}>{desc.member_name}</Text>
                                    <Text style={[reset.fs12, reset.lh20, reset.cg]}>{desc.member_count}个成员</Text>
                                </View>
                            </Flex>
                            <Text style={[reset.lh30, reset.fs20,reset.mt10,]}>{cur.title}</Text>
                            <Flex>
                                <Text style={[reset.lh25, reset.fs14]}>{cur.author.name}</Text>
                                <Text style={[reset.lh25, reset.fs14, reset.ml20, reset.cg]}>{cur.created}</Text>
                            </Flex>
                            <WhiteSpace />
                            <Text style={[reset.lh25, reset.fs16, reset.cg]}>{cur.content}</Text>
                            <WhiteSpace />
                            {cur.photos.map((item, i) => {
                                const w = item.size.width
                                const h = item.size.height
                                return <Image style={[reset.mt10, { width: width - 40, height: ((width - 40) / w) * h }]} key={i} source={{ uri: item.alt }} />
                            })}

                            <View style={[reset.mt20,reset.bt1,reset.bc]}>
                                <Text style={[reset.fs20,reset.lh40]}>回应{comments.length}条</Text>
                                {
                                    comments.map((com ,i) => {
                                        return (
                                            <View key={i} style={[reset.mt20]}>
                                                <Flex style={[reset.sw, reset.br5]} justify='start' align='start'>
                                                    <Image style={[{ width: 40, height: 40, }, reset.br20]} source={{ uri: com.author.avatar }} />
                                                    <View style={[reset.ml10]}>
                                                        <Text style={[reset.lh25, reset.fs16]}>{com.author.name}</Text>
                                                        <Text style={[reset.fs14, reset.lh20, reset.cg]}>{com.time}</Text>
                                                        <View style={{width: width-80,borderLeft:com.quote_comment?3:0,borderColor:Colors.tintColor}}>
                                                            <Text style={[reset.fs16, reset.lh25, reset.mt10,]}>{com.text}</Text>
                                                        </View>
                                                        {
                                                            com.quote_comment&&<Text style={[reset.fs14, reset.lh20, reset.cg]}>{com.quote_comment.text}</Text>
                                                        }
                                                        <Flex>
                                                            <Icon name={'like'} /><Text style={[reset.ml10,reset.cg]}>{com.vote_count}</Text>
                                                        </Flex>
                                                    </View>
                                                </Flex>
                                            </View>
                                        )
                                        
                                    })
                                }
                                <WingBlank style={[reset.mt20]}>
                                    <Button onPress={() => {
                                        if (commentsLoading) return 
                                        this._getComments()
                                    }}>{commentsDone ? '已全部加载' : '查看更多'}</Button>
                                </WingBlank>
                            </View>
                        </WingBlank>
					</ScrollView>
				</Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
