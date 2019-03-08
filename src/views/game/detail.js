import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Modal, FlatList } from 'react-native'
import NavigationBar from '../common/NavigationBar'
import Colors from '../../constants/Colors'
import { Flex, Icon, WingBlank, List, Badge, WhiteSpace,portal, Toast, Tag, Modal as AntModal, Button, Card, TabBar, ActivityIndicator } from '@ant-design/react-native'
import { width } from '../../constants/Scale'
import { GET, POST } from '../../utils/request'
import reset from '../../styles'
import { observer, inject } from 'mobx-react/native'
import { toJS } from 'mobx';

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
            comments: [],
            loading: false,
            done: false,
            modelShow: false,
            start: 0,
            order_by: 'hot',
            count: 5,
            item: this.props.navigation.state.params
		}
	}
	componentDidMount() {
        console.log(toJS(this.state.item) )
	}

	async _getComments(id) {
        const { loading,done,start,order_by,count, } = this.state
        const key = Toast.info('收取中...')
		let comments = await GET('https://m.douban.com/rexxar/api/v2/game/26652745/interests',{
            count: 4,
            order_by: 'hot',
            start: 0,
            ck: 'kl55',
            for_mobile: 1,
        },{
            Referer: 'https://m.douban.com/game/subject/26583967/?from=rec',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        })
        console.log('comments-->', comments)
        
        portal.remove(key)
	}
	render() {
        const { navigation } = this.props
        const { modelShow,comments,item } = this.state
		return (
			<View style={styles.container}>
				<NavigationBar
					childView={
						<Flex justify='between'>
							<Flex.Item>
								<Icon name={'arrow-left'} color={'#fff'} onPress={() => navigation.goBack()} />
							</Flex.Item>
							<Flex.Item>
								<Text style={[reset.fs20, reset.tc, reset.cw]}>{}</Text>
							</Flex.Item>
							<Flex.Item>
								<Text style={[reset.tr]} />
							</Flex.Item>
						</Flex>
					}
				/>
				<View style={[reset.bgw]}>
                    <WhiteSpace />
                    <Item wrap extra='' multipleLine align='top'>
                        {/* 顶部对齐 */}
                        {/* <Brief>辅助文字内容辅助文字内容辅助文字内容辅助文字内容</Brief> */}
                        {/* <Brief>辅助文字内容</Brief> */}
                        <Flex justify='start'>
                            <Flex.Item>
                                <Text style={[reset.fs18,reset.lh25,]}>{item.title}</Text>
                                <Brief>{item.genres}</Brief>
                                <Brief>{item.platforms}</Brief>
                            </Flex.Item>
                            <Badge text={item.rating}>
                                <Image style={{ width: 100, height: 138 }} source={{ uri: item.cover }} />
                            </Badge>
                        </Flex>
                    </Item>
                    
                    <Item wrap extra='' multipleLine align='top'>
                        <Brief>评价人数{' ' + item.n_ratings}</Brief>
                        <Brief>评价{' ' + item.rating}</Brief>
                        <Brief>收藏人数{' ' + item.star}</Brief>
                    </Item>

                    <Item wrap extra='' multipleLine align='top'>
                        <Text style={[reset.fs18,reset.lh25,]}>游戏简介</Text>
                        <Text style={[reset.fs15,reset.lh20,reset.mt10]}>{item.title}</Text>
                        <Brief style={[reset.lh25,reset.fs16]}>{item.review.content}</Brief>
                        <Brief>作者{'  '  +  item.review.author}</Brief>
                    </Item>
                </View>
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
				</Modal>
			</View>
		)
	}

	_renderItemView({ item }) {
		return (
			<Item
				onPress={() => {

				}}
				wrap
				extra=''
				multipleLine
				align='top'
			>
				<Text>11111</Text>
			</Item>
		)
	}
	_renderFooter() {
		const { done, loading } = this.state

		if (done) {
			return (
				<View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start' }}>
					<Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5 }}>没有更多了</Text>
				</View>
			)
		} else if (loading) {
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
