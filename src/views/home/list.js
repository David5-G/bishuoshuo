import React from 'react'
import { View, Text, ScrollView, StyleSheet,TouchableOpacity, Image,FlatList, } from 'react-native'
import NavigationBar from '../common/NavigationBar'
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
            movies: [],
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
		const { loading,done,start,count,movies,type } = this.state
		if (loading || done) return
        this.setState({ loading: true })
        const res  = await GET('https://api.douban.com/v2/movie/search',{
            q: type,
            start,
            count,
        })
        this.setState({ loading: false,movies: movies.length?[...movies,...res.subjects] : res.subjects })
        if (!res.subjects.length)  this.setState({done: true})
	}
	
	render() {
		const { navigation, MainStore } = this.props
		const { loading,  movies,} = this.state
		return (
			<View style={styles.container}>
				<NavigationBar
                    childView={
                        <Flex justify='between'>
                            <Flex.Item>
                                <Icon name={'arrow-left'} color={'#fff'} onPress={() => navigation.goBack()} />
                            </Flex.Item>
                            <Flex.Item>
                                <Text style={[reset.fs20, reset.tc, reset.cw]}>{this.state.type}</Text>
                            </Flex.Item>
                            <Flex.Item>
                                <Text />
                            </Flex.Item>
                        </Flex>
                    }
                />
                <List>
                    <FlatList
                        overScrollMode={'never'}
                        overScroll={'never'}
                        data={movies}
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
        const { title,genres,rating,casts,collect_count,original_title,directors,year,images } = item
        
		return (
			<Item onPress={() => navigation.navigate('MusicDetail',item.id)} style={[reset.pt10,]}>
                <Flex style={[reset.pb10]} justify='start' align='start'>
                    <Image source={{uri: images.medium}} style={{width: 100,height: 100}} />
                    {/* 孙燕姿 / 2003-08-22 / 专辑 / CD / 流行 */}
                    <View style={[reset.ml10]}>
                        <Text style={[reset.fs16,reset.lh30,{color:Colors.tintColor,width:width-140}]}>{title}（{year}）</Text>
                        <Flex style={{width:width-140}}>{genres.map((item,i) => <Tag key={i}>{item}</Tag>)}</Flex>
                        {
                            rating && rating.average ?
                            <Flex>
                                <Score score={+rating.average} />
                                <Text style={[reset.fs14,reset.cg,reset.ml5,]}>{rating.average}</Text>
                            </Flex>: null

                        }
                        {
                            directors && directors.name && directors.avatars && directors.avatars.small && 
                            <Flex>
                                <Text style={[reset.fs14,reset.lh20,reset.cg]}>导演：{directors.name}</Text>
                                <Image style={{width:40,height:40}} source={{uri: directors.avatars.small}} />
                            </Flex>
                        }
                    </View>
                </Flex>
                {/* <Text style={[reset.fs14,reset.lh30,reset.cg]}>演员阵容</Text>
                <Flex>
                    {
                        casts.map((item,i) => {
                            if (!item.avatars) return null
                            return (
                                <View key={i}>
                                    <Image style={{width:40,height:40}} source={{uri: item.avatars.small}} />
                                    <Text>{item.name}</Text>
                                </View>
                            )
                        })
                    }
                </Flex> */}
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
					<Image style={{width: 30,height: 30,marginLeft: width/2 -15}} source={require('../../pics/load.gif')} />
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
