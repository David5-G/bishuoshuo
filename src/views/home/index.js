import React from 'react'
import PropTypes from 'prop-types'

import { View, Alert, Image, Platform, Dimensions, AsyncStorage, TouchableOpacity, StatusBar, Text, ActivityIndicator, FlatList, WebView, ScrollView, StyleSheet } from 'react-native'
import { Flex,Icon,List,WhiteSpace,WingBlank, } from '@ant-design/react-native';

import Colors from '../../constants/Colors'
import DrawerNavigationBar from '../common/DrawerHeader'
import Loading from '../common/Loading.js'

import { barHeight, statusBarHeight, isIos, width } from '../../constants/Scale'

import Banner from './sub/banner'
import Movies from './sub/movies'
import Tvs from './sub/tvs'
import reset from '../../styles'
import { observer, inject } from 'mobx-react/native'

import Score from '../common/score.js'


const Item = List.Item
const Brief = List.Brief

@inject('UserStore', 'MainStore')
@observer
class Home extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		drawerLabel: '电影',
		drawerIcon: ({ tintColor }) => <Icon name='md-menu' size={24} color='#fff' />
	})
	static proptypes = {
		navigation: PropTypes.object.isRequired
	}
	constructor(props) {
		super(props)
		this.state = {
			loading: false
		}
		this.initDate = this.initDate.bind(this)
	}
	componentDidMount() {
		this.initDate()
	}
	async initDate() {}
	render() {
		const { navigation } = this.props
		return (
			<View style={styles.container}>
				<DrawerNavigationBar navigation={navigation} />
				<Banner navigation={navigation} />
				<ScrollView style={{ marginTop: 20 }}>
                    <Item>
                        <Flex justify='between'>
                            <Text style={[reset.fs20,reset.lh30]}>最近热门电影</Text>
                            <TouchableOpacity>
                                <Text style={[reset.fs14,reset.lh30,{color: Colors.tintColor}]}>更多</Text>
                            </TouchableOpacity>
                        </Flex>
					    <Movies navigation={navigation} />
                    </Item>
                    <Item>
                        <Flex justify='between'>
                            <Text style={[reset.fs20,reset.lh30]}>最近热门电视剧</Text>
                            <TouchableOpacity>
                                <Text style={[reset.fs14,reset.lh30,{color: Colors.tintColor}]}>更多</Text>
                            </TouchableOpacity>
                        </Flex>
					    <Tvs navigation={navigation} />
                    </Item>

                    <View style={[reset.mt10,reset.pb40,reset.bgw]}>
                        <Item>
                            <Text style={[reset.fs20,reset.lh30]}>分类浏览</Text>
                        </Item>
                        <Flex justify='between'>
                            <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {navigation.navigate('HomeList','classic')}}>经典</Item>
                            <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {navigation.navigate('HomeList','underrated')}}>冷门佳片</Item>
                        </Flex>
                        <Flex  justify='between'>
                            <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {navigation.navigate('HomeList','doubantop')}}>高分</Item>
                            <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {navigation.navigate('HomeList','action')}}>动作</Item>
                        </Flex>

                        <Flex  justify='between'>
                            <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {navigation.navigate('HomeList','comedy')}}>喜剧</Item>
                            <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {navigation.navigate('HomeList','love')}}>爱情</Item>
                        </Flex>

                        <Flex justify='between'>
                            <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {navigation.navigate('HomeList','mystery')}}>悬疑</Item>
                            <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {navigation.navigate('HomeList','horror')}}>恐怖</Item>
                        </Flex>

                        <Flex justify='between'>
                            <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {navigation.navigate('HomeList','scifi')}}>科幻</Item>
                            <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {navigation.navigate('HomeList','sweet')}}>治愈</Item>
                        </Flex>

                        <Flex justify='between'>
                            <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {navigation.navigate('HomeList','artfilm')}}>文艺</Item>
                            <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {navigation.navigate('HomeList','youth')}}>成长</Item>
                        </Flex>

                        <Flex justify='between'>
                            <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {navigation.navigate('HomeList','animation')}}>动画</Item>
                            <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {navigation.navigate('HomeList','chinese')}}>华语</Item>
                        </Flex>

                        <Flex justify='between'>
                            <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {navigation.navigate('HomeList','western')}}>欧美</Item>
                            <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {navigation.navigate('HomeList','korean')}}>韩国</Item>
                        </Flex>

                        <Flex justify='between'>
                            <Item style={{width:width/2}}  arrow="horizontal" onPress={() => {navigation.navigate('HomeList','japan')}}>日本</Item>
                        </Flex>

                    </View>
				</ScrollView>
			</View>
		)
	}
}
export default Home

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.bodyBackground,
		backgroundColor: '#fff'
	}
})
