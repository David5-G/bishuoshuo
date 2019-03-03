import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image,TouchableOpacity } from 'react-native'
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import { observer, inject } from 'mobx-react/native'
import { List, Flex, Button, Card, Badge, WingBlank, Tag, WhiteSpace, Toast, portal } from '@ant-design/react-native'

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
			loading: false
		}
	}
	componentDidMount() {
		this._initData()
	}
	async _initData() {
		const { loading } = this.state
		if (loading) return
		const { MainStore } = this.props
		this.setState({ loading: true })
		const key = Toast.loading('加载中...')
		const banner = await MainStore.getTeamsBanner()
		const teams = await MainStore.getTeams()
		this.setState({ loading: false })
		if (!banner) Toast.fail('加载失败')
		portal.remove(key)

		console.log('store teams-->', MainStore.teams)
	}
	render() {
		const { navigation } = this.props
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
				<WhiteSpace />
				<WingBlank>
					<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
						<Flex justify='start'>
							{MainStore.teamsBanner.map((item, i) => {
								return <Image style={{ width: 190, height: 80, marginRight: 10 }} key={i} source={{ uri: item.image }} />
							})}
						</Flex>
					</ScrollView>
				</WingBlank>
				<WhiteSpace />
				<ScrollView>
					{MainStore.teams.map((item, i) => {
						return (
                            <List key={i} renderHeader={item.name}>
                                {item.groups.map((line, o) => {
                                    return (
                                        <View style={{marginTop: 20}}>
                                            <WingBlank size="lg">
                                                <TouchableOpacity>
                                                    <Card>
                                                        <Card.Header title={line.name} thumbStyle={{ width: 30, height: 30 }} thumb={line.avatar} extra={line.member_name} />
                                                        <Card.Body>
                                                            <WingBlank>
                                                                <Brief>{line.desc_abstract}</Brief>
                                                            </WingBlank>
                                                        </Card.Body>
                                                        <Card.Footer content={line.create_time} extra={line.topic_count + '人'} />
                                                    </Card>
                                                </TouchableOpacity>
                                                
                                            </WingBlank>
                                        </View>
                                    )
                                })}
                            </List>
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
	}
})
