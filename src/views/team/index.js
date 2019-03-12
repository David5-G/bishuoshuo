import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image,TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import { observer, inject } from 'mobx-react/native'
import { List, Flex, Button,Icon, Card, Badge, WingBlank, Tag, WhiteSpace, Toast, portal } from '@ant-design/react-native'
import { toJS } from 'mobx';

import DrawerNavigationBar from '../common/DrawerHeader'
import Loading from '../common/Loading.js'

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
		const banner = await MainStore.getTeamsBanner()
		const teams = await MainStore.getTeams()
		this.setState({ loading: false })
		if (!banner) Toast.fail('加载失败')
		if (!teams) Toast.fail('加载失败')
    }
    
	render() {
        const { navigation } = this.props
        const { loading } = this.state
		return (
			<View style={styles.container}>
                <DrawerNavigationBar navigation={navigation} />
                <Loading show={loading} />
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
                                        <View key={o} style={{marginTop: 20,}}>
                                            <WingBlank size="lg">
                                                <TouchableOpacity onPress={() => navigation.navigate('TeamDetail', line)}>
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
