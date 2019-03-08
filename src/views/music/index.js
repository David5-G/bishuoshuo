import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image,TouchableOpacity } from 'react-native'
import NavigationBar from '../common/NavigationBar'
import Colors from '../../constants/Colors'
import { observer, inject } from 'mobx-react/native'
import { List, Flex, Button,Icon, Badge, WingBlank, Tag, WhiteSpace, Toast, portal } from '@ant-design/react-native'
import { toJS } from 'mobx';
import Group from './subPage/group.js'
import reset from '../../styles'
import {width} from '../../constants/Scale.js'

const Item = List.Item
const Brief = Item.Brief
@inject('UserStore', 'MainStore')
@observer
export default class Music extends React.Component {
	static navigationOptions = {
		title: 'Music',
		header: null
	}
	constructor(props) {
		super(props)
		this.state = {
            loading: false,
			
		}
	}
	componentDidMount() {
		// genres=1&platforms=94%2C17%2C96&q=&sort=rating
	}
	
	render() {
		const { navigation, MainStore } = this.props
		const { loading,  } = this.state
		return (
			<View style={styles.container}>
				<NavigationBar
					childView = {
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
               <ScrollView>
                    <List>
                        <WhiteSpace />
                        <Item>
                            <Flex justify='between'>
                                <Text style={[reset.fs20,reset.lh30,reset.ml20]}>华语经典歌曲</Text>
                                <TouchableOpacity>
                                    <Text style={[reset.fs14,reset.lh30,reset.ml20,{color: Colors.tintColor}]}>更多</Text>
                                </TouchableOpacity>
                            </Flex>
                            <Group tag={'华语'} navigation={navigation} />
                        </Item>
                        <WhiteSpace />
                        <Item>
                            <Flex justify='between'>
                                <Text style={[reset.fs20,reset.lh30,reset.ml20]}>欧美经典歌曲</Text>
                                <TouchableOpacity>
                                    <Text style={[reset.fs14,reset.lh30,reset.ml20,{color: Colors.tintColor}]}>更多</Text>
                                </TouchableOpacity>
                            </Flex>
                            <Group tag={'欧美'} navigation={navigation} />
                        </Item>

                        <Item>
                            <Text style={[reset.fs20,reset.lh30,reset.ml20]}>分类浏览</Text>
                            <Flex style={{width}}>
                                <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {}}>流行</Item>
                                <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {}}>摇滚</Item>
                            </Flex>

                            <Flex style={{width}}>
                                <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {}}>民谣</Item>
                                <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {}}>独立</Item>
                            </Flex>

                            <Flex style={{width}}>
                                <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {}}>华语</Item>
                                <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {}}>欧美</Item>
                            </Flex>

                            <Flex style={{width}}>
                                <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {}}>日本</Item>
                                <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {}}>韩国</Item>
                            </Flex>

                        </Item>
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
