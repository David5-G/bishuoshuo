import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import { observer, inject } from 'mobx-react/native'
import { List, Flex, Button, Badge, WingBlank, Tag, WhiteSpace, Toast, portal } from '@ant-design/react-native'

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
        const key = Toast.loading('加载中...')
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
        portal.remove(key)
        
	}
	render() {
		const { navigation, MainStore } = this.props
		const { loading, genresList, platformsList, sort } = this.state
		return (
			<View style={styles.container}>
				<NavigationBar
					leftButton={<Icon name='md-menu' size={26} color='#fff' onPress={() => navigation.openDrawer()} />}
					rightButton={
						<Image
							style={{ width: 48, height: 22 }}
							source={{
								uri:
									'data:image/png;base64,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'
							}}
						/>
					}
				/>
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
								<Item key={i} wrap extra='' multipleLine align='top' arrow='horizontal'>
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
