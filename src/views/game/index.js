import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import DrawerNavigationBar from '../common/DrawerHeader'

import Colors from '../../constants/Colors'
import { observer, inject } from 'mobx-react/native'
import { List, Flex, Button,Icon, Badge, WingBlank, Tag, WhiteSpace, Toast, portal } from '@ant-design/react-native'
import Loading from '../common/Loading'
const Item = List.Item
const Brief = Item.Brief

const genresList = [
	{
		value: 1,
        label: '动作',
        selected: true,
	},
	{
		value: 5,
        label: '角色扮演',
        selected: false,
        
	},
	{
		value: 4,
        selected: false,
		label: '冒险'
	},
	{
		value: 48,
        selected: false,
		label: '射击'
	},
	{
		value: 2,
        selected: false,
		label: '策略'
	},
	{
		value: 12,
        selected: false,
		label: '即时战略'
	}
]
const platformsList = [
    {
		value: 96,
        selected: true,
		label: 'iPhone'
	},
	{
		value: 94,
        selected: false,
		label: 'PC'
	},
	{
		value: 17,
        selected: false,
		label: 'Mac'
	},
	
	{
		value: 123,
        selected: false,
		label: 'Android'
	},

	{
		value: 146,
        selected: false,
		label: 'PS4'
	},
	{
		value: 145,
        selected: false,
		label: 'Xbone'
	},
	{
		value: 158,
        selected: false,
		label: 'Switch'
	}
]
@inject('UserStore', 'MainStore')
@observer
export default class Game extends React.Component {
	static navigationOptions = {
		title: 'Game',
		header: null
	}
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			genres: [],
			platforms: [],
			sort: {
                label: '评分',
                type: 'rating'
            },

			genresList,
			platformsList,
		}
	}
	componentDidMount() {
		// genres=1&platforms=94%2C17%2C96&q=&sort=rating
		this._initData()
	}
	async _initData() {
        if (this.loading) return
		this.setState({ loading: true })
        const { loading,genresList,platformsList, sort } = this.state
        const genres = genresList.map(item => item.selected ? item.value + ',' : null)
        const platforms = platformsList.map(item => item.selected ? item.value + ',' : null)
		const games = await MainStore.getGames({
			genres,
			platforms,
			sort: sort.type,
        })
        this.setState({ loading: false })
        if (!games.games) Toast.fail('加载失败')
        
	}
	render() {
		const { navigation, MainStore } = this.props
        const { loading, genresList, platformsList, sort } = this.state
		return (
			<View style={styles.container}>
				<DrawerNavigationBar navigation={navigation} />
                <Loading show={loading} />
                <WingBlank>
                    <WhiteSpace />
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <Flex justify='start'>
                            {genresList.map((item, i) => {
                                return (
                                    <Tag onChange={() => {
                                        if (loading) return Toast.info('加载中，请稍候再试', 1)
                                        item.selected = !item.selected
                                        this.setState({genresList: genresList.concat([])}, () => this._initData())
                                    }} selected={item.selected} key={i} style={{ marginRight: 3 }}>
                                        {item.label}
                                    </Tag>
                                )
                            })}
                        </Flex>
                    </ScrollView>
                    <WhiteSpace />
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <Flex justify='start'>
                            {platformsList.map((item, i) => {
                                return (
                                    <Tag onChange={() => {
                                        if (loading) if (loading) return Toast.info('加载中，请稍候再试', 1)
                                        item.selected = !item.selected
                                        this.setState({platformsList: platformsList.concat([])}, () => this._initData())
                                    }} selected={item.selected} key={i} style={{ marginRight: 3 }}>
                                        {item.label}
                                    </Tag>
                                )
                            })}
                        </Flex>
                    </ScrollView>
                    <WhiteSpace />
                </WingBlank>
                
				<ScrollView style={{ flex: 1, backgroundColor: '#f5f5f9' }} automaticallyAdjustContentInsets={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
					<List renderHeader={ '排序方式  ' + sort.label}>
						{MainStore.games.map((item, i) => {
							return (
								<Item onPress={() => navigation.navigate('GameDetail', item)} key={i} wrap extra='' multipleLine align='top' arrow='horizontal'>
									{/* 顶部对齐 */}
									{/* <Brief>辅助文字内容辅助文字内容辅助文字内容辅助文字内容</Brief> */}
									{/* <Brief>辅助文字内容</Brief> */}
									<Flex justify='start'>
										<Badge text={item.rating}>
											<Image style={{ width: 100, height: 138 }} source={{ uri: item.cover }} />
										</Badge>
										<Flex.Item>
											<WingBlank>
												<Brief>{item.title}</Brief>
												<Brief>{item.genres}</Brief>
												<Brief>{item.platforms}</Brief>
											</WingBlank>
										</Flex.Item>
									</Flex>
								</Item>
							)
						})}
					</List>
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
