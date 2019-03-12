import React from 'react'
import { View, Text, ScrollView, StyleSheet,TouchableOpacity, Image,FlatList, } from 'react-native'

import DrawerNavigationBar from '../common/DrawerHeader'
import Loading from '../common/Loading.js'

import Colors from '../../constants/Colors'
import { observer, inject } from 'mobx-react/native'
import { List, Flex, Button,Icon, Badge, WingBlank, ActivityIndicator, Tag, WhiteSpace, Toast, portal } from '@ant-design/react-native'
import { toJS } from 'mobx';
import {GET } from '../../utils/request'
import {  width } from '../../constants/Scale'
import reset from '../../styles'
import Score from '../common/score'

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
            musics: [],
            start: 0,
            count: 10,
            done: false,
            type: this.props.navigation.state.params,
			
		}
	}
	componentDidMount() {
		this._loadMore()
	}
	async _loadMore() {
		const { loading,done,start,count,musics,type } = this.state
		if (loading || done) return
        this.setState({ loading: true })
        const res  = await GET('https://api.douban.com/v2/music/search',{
            q: type,
            start,
            count,
        })
        this.setState({ loading: false,musics: musics.length?[...musics,...res.musics] : res.musics })
        if (!res.musics.length)  this.setState({done: true})
	}
	
	render() {
		const { navigation, MainStore } = this.props
		const { loading,  musics,} = this.state
		return (
			<View style={styles.container}>
				<DrawerNavigationBar navigation={navigation} />
                <List>
                    <FlatList
                        overScrollMode={'never'}
                        overScroll={'never'}
                        data={musics}
                        renderItem={this._renderItemView.bind(this)}
                        keyExtractor={this._keyExtractor} //唯一的key
                        // ListHeaderComponent={channel === 'global' ?  <Banners navigation={navigation} />: null}
                        ListFooterComponent={this._renderFooter.bind(this)}
                        onEndReached={this._loadMore.bind(this)}
                        onEndReachedThreshold={1}
                    />
                </List>
			</View>
		)
    }
    
    _renderItemView({ item }) {
        const { navigation } = this.props
        const { attrs,author,rating, title,} = item
        const { publisher,singer,version,pubdate,media,tracks, } = attrs

		return (
			<Item onPress={() => navigation.navigate('MusicDetail',item.id)} style={[reset.pt10,]}>
                <Flex style={[reset.pb10]} justify='start' align='start'>
                    <Image source={{uri: item.image}} style={{width: 100,height: 100}} />
                    {/* 孙燕姿 / 2003-08-22 / 专辑 / CD / 流行 */}
                    <View style={[reset.ml10]}>
                            {/* <Text style={[reset.lh30,reset.fs16,{color:Colors.tintColor}]}>{title}</Text> */}
                            {singer && singer.map((o, i) => <Text style={[reset.lh30,reset.fs14,{color:Colors.tintColor}]}>{o + ' '}</Text>)}
                            {pubdate && pubdate.map((o, i) => <Text style={[reset.lh30,reset.cg,reset.fs14]}>{o+ ' '}</Text>)}
                            {version && version.map((o, i) => <Text style={[reset.lh30,reset.cg,reset.fs14]}>{o+ ' '}</Text>)}
                            {media && media.map((o, i) => <Text style={[reset.lh30,reset.cg,reset.fs14]}>{o+ ' '}</Text>)}
                            <Flex>
                                <Score score={+rating.average} />
                                <Text style={[reset.ml5,reset.fs14,reset.cg]}>{rating.average}</Text>
                                <Text style={[reset.ml5,reset.fs14,reset.cg]}>（{rating.numRaters}）人评价</Text>
                            </Flex>
                    </View>
                </Flex>
            </Item>
		)
	}
	_renderFooter() {
		const { done, loading } = this.state

		if (done) {
			return (
				<View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start' }}>
					<Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5 }}>没有更多评论了</Text>
				</View>
			)
		} else if (loading) {
			return (
				<View style={styles.footer}>
					<Image style={{width: 30,height: 30,marginLeft: width/2 - 15}} source={require('../../pics/load.gif')} style={{width: 40,height: 20}} />
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
