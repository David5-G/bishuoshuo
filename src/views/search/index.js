import React from 'react'
import PropTypes from 'prop-types'

import { View, Alert, Image, Platform, Dimensions, AsyncStorage, TouchableOpacity, StatusBar, Text, ActivityIndicator, FlatList, WebView, ScrollView, StyleSheet } from 'react-native'
import { Flex, Icon, List, WhiteSpace, WingBlank, Button, SearchBar, Tabs, Tag, SegmentedControl,Modal } from '@ant-design/react-native'
import Colors from '../../constants/Colors'
import NavigationBar from '../common/NavigationBar.js'
import Loading from '../common/Loading.js'
import Score from '../common/score'

import reset from '../../styles'
import { barHeight, statusBarHeight, isIos, width } from '../../constants/Scale'
import { GET } from '../../utils/request'
import { reject } from 'rsvp'
const Item = List.Item
const Brief = List.Brief

class Home extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		drawerLabel: '电影',
		header: null
	})
	static proptypes = {
		navigation: PropTypes.object.isRequired
	}
	constructor(props) {
		super(props)
		this.state = {
			text: '',
			count: 10,
            cur: 'movie',
            modalContent: {},
            showModal: false,

			movies: [],
			moviesLoading: false,
			moviesStart: 0,
			moviesDone: false,

			musics: [],
			musicsLoading: false,
			musicsStart: 0,
			musicsDone: false,

			books: [],
			booksLoading: false,
			booksStart: 0,
			booksDone: false,

			groups: [],
			groupsLoading: false,
			groupsStart: 0,
			groupsDone: false,
		}
	}
	componentDidMount() {}
	
	_search() {
		const { moviesLoading, moviesDone, booksLoading, booksDone, musicsLoading, musicsDone } = this.state
        if (moviesLoading || booksLoading || musicsLoading) return
        this.setState({
			movies: [],
			moviesLoading: false,
			moviesStart: 0,
			moviesDone: false,

			musics: [],
			musicsLoading: false,
			musicsStart: 0,
			musicsDone: false,

			books: [],
			booksLoading: false,
			booksStart: 0,
			booksDone: false,

			groups: [],
			groupsLoading: false,
			groupsStart: 0,
			groupsDone: false,
		},() =>{
            !moviesDone && this._getMovies()
		    !booksDone && this._getBooks()
		    !musicsDone && this._getMusics()
        })
	}

	async _getMovies() {
		const { moviesLoading, moviesStart, moviesDone, movies, count, text } = this.state
		if (moviesLoading || moviesDone) return
		this.setState({ moviesLoading: true })
		const res = await GET('https://api.douban.com/v2/movie/search', {
			q: text,
			start: moviesStart,
			count
		})
		if (!res.subjects.length) {
			this.setState({ movieDone: true })
		}

		console.log('movies-->', res)
		this.setState({
			movies: movies.length ? [...movies, ...res.subjects] : res.subjects,
			moviesLoading: false,
			moviesStart: moviesStart + count
		})
	}

	async _getBooks() {
		const { booksLoading, booksStart, booksDone, books, count, text } = this.state
		if (booksLoading || booksDone) return
		this.setState({ booksLoading: true })
		const res = await GET('https://api.douban.com/v2/book/search', {
			q: text,
			start: booksStart,
			count
		})
		console.log('books-->', res)

		if (!res.books.length) {
			this.setState({ booksDone: true })
		}
		this.setState({
			books: books.length ? [...books, ...res.books] : res.books,
			booksLoading: false,
			booksStart: booksStart + count
		})
	}

	async _getMusics() {
		const { musicsLoading, musicsStart, musicsDone, musics, count, text } = this.state
		if (musicsLoading || musicsDone) return
		this.setState({ musicsLoading: true })
		const res = await GET('https://api.douban.com/v2/music/search', {
			q: text,
			start: musicsStart,
			count,
			musicsStart: musicsStart + count
		})
		console.log('musics-->', res)

		if (!res.musics.length) {
			this.setState({ musicsDone: true })
		}
		this.setState({
			musics: musics.length ? [...musics, ...res.musics] : res.musics,
			musicsLoading: false
		})
	}

	_renderItemView({ item }) {
		const { navigation } = this.props
		const { cur } = this.state
		console.log('cur-->', cur)

		if (cur === 'movie') {
			const { title, genres, rating, casts, collect_count, original_title, directors, year, images } = item
			return (
				<Item onPress={() => navigation.navigate('MusicDetail', item.id)} style={[reset.pt10]}>
					<Flex style={[reset.pb10]} justify='start' align='start'>
						<Image source={{ uri: images.medium }} style={{ width: 100, height: 100 }} />
						{/* 孙燕姿 / 2003-08-22 / 专辑 / CD / 流行 */}
						<View style={[reset.ml10]}>
							<Text style={[reset.fs16, reset.lh30, { color: Colors.tintColor, width: width - 140 }]}>
								{title}（{year}）
							</Text>
							<Flex style={{ width: width - 140 }}>
								{genres.map((item, i) => (
									<Tag key={i}>{item}</Tag>
								))}
							</Flex>
							{rating && rating.average ? (
								<Flex>
									<Score score={+rating.average} />
									<Text style={[reset.fs14, reset.cg, reset.ml5]}>{rating.average}</Text>
								</Flex>
							) : null}
							{directors && directors.name && directors.avatars && directors.avatars.small && (
								<Flex>
									<Text style={[reset.fs14, reset.lh20, reset.cg]}>导演：{directors.name}</Text>
									<Image style={{ width: 40, height: 40 }} source={{ uri: directors.avatars.small }} />
								</Flex>
							)}
						</View>
					</Flex>
				</Item>
			)
		}
		if (cur === 'music') {
			const { attrs, author, rating, title } = item
			const { publisher, singer, version, pubdate, media, tracks } = attrs
			return (
				<Item onPress={() => navigation.navigate('MusicDetail', item.id)} style={[reset.pt10]}>
					<Flex style={[reset.pb10]} justify='start' align='start'>
						<Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
						<View style={[reset.ml10]}>
							{/* <Text style={[reset.lh30,reset.fs16,{color:Colors.tintColor}]}>{title}</Text> */}
							{singer && singer.map((o, i) => <Text style={[reset.lh30, reset.fs14, { color: Colors.tintColor }]}>{o + ' '}</Text>)}
							{pubdate && pubdate.map((o, i) => <Text style={[reset.lh30, reset.cg, reset.fs14]}>{o + ' '}</Text>)}
							{version && version.map((o, i) => <Text style={[reset.lh30, reset.cg, reset.fs14]}>{o + ' '}</Text>)}
							{media && media.map((o, i) => <Text style={[reset.lh30, reset.cg, reset.fs14]}>{o + ' '}</Text>)}
							<Flex>
								<Score score={+rating.average} />
								<Text style={[reset.ml5, reset.fs14, reset.cg]}>{rating.average}</Text>
								<Text style={[reset.ml5, reset.fs14, reset.cg]}>（{rating.numRaters}）人评价</Text>
							</Flex>
						</View>
					</Flex>
				</Item>
			)
		}

		if (cur === 'book') {
            const { images,image,author,title,translator,summary,rating,tags} = item
			return (
                <Item onPress={() => {
                    this.setState({modalContent: item,showModal: true})
                }}>
                    <Flex style={[reset.pb10]} justify='start' align='start'>
                        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
                        <View style={[reset.ml10]}>
                            <Text style={[reset.lh30,reset.fs16,{color:Colors.tintColor}]}>{title}</Text>
                            <Flex style={[reset.bb1,reset.bc,{width:width - 140}]}>
                                {author && author.map((o, i) => <Text style={[reset.lh25, reset.cg, reset.fs14]}>{o + ' '}</Text>)}
                            </Flex>
                            <Text numberOfLines={3} style={[reset.lh25,reset.fs14,reset.cg,{width:width - 140}]}>{summary}</Text>
                            <Flex>
                                <Score score={+rating.average} />
                                <Text style={[reset.ml5, reset.fs14, reset.cg]}>{rating.average}</Text>
                                <Text style={[reset.ml5, reset.fs14, reset.cg]}>（{rating.numRaters}）人评价</Text>
                            </Flex>
                        </View>
                    </Flex>
                </Item>
			)
		}

		return (
			<View>
				<Text></Text>
			</View>
		)
	}
	_renderFooter() {
		const { cur, moviesLoading, movieDone, booksLoading, booksDone, musicsLoading, musicsDone } = this.state

		if ((cur === 'movie' && movieDone) || (cur === 'book' && booksDone) || (cur === 'music' && musicsDone)) {
			return (
				<View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start' }}>
					<Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5 }}>没有更多评论了</Text>
				</View>
			)
		} else if (moviesLoading || booksLoading || musicsLoading) {
			return (
				<View>
					<Image source={require('../../pics/load.gif')} style={{ width: 30, height: 30,marginLeft: width/2 -15 }} />
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
		const { cur, text, moviesLoading, moviesDone, booksLoading, booksDone, musicsLoading, musicsDone, movies, musics, books,showModal,modalContent } = this.state

		console.log('movies render-->', movies)
		console.log('musics render-->', musics)
		console.log('books render-->', books)
		return (
			<View style={[styles.container, reset.bb1, reset.bc, reset.sw]}>
				<NavigationBar
					style={{ backgroundColor: '#EFEFF4' }}
					childView={
						<SearchBar
							value={text}
							placeholder='搜索'
							onSubmit={text => {
								if (moviesLoading || booksLoading || musicsLoading) return
								this._search()
							}}
							onCancel={() => navigation.goBack()}
							onChange={text => this.setState({ text })}
							showCancelButton
						/>
					}
				/>
				<StatusBar barStyle='dark-content' />
                <WhiteSpace />

                <WingBlank>
                    <SegmentedControl onValueChange={v => {
                        if (v === '说电影' ) this.setState({cur: 'movie'})
                        if (v === '说图书' ) this.setState({cur: 'book'})
                        if (v === '说音乐' ) this.setState({cur: 'music'})
                    }} selectedIndex={0} values={['说电影', '说图书', '说音乐']} tintColor={Colors.tintColor} />
                </WingBlank>
                <WhiteSpace />
				<List renderHeader={cur==='movie' ? '说电影' : cur === 'book' ? '说图书' : '说音乐'}>
					<FlatList
						overScrollMode={'never'}
						overScroll={'never'}
						data={cur === 'movie' ? movies : cur === 'book' ? books : musics}
						renderItem={this._renderItemView.bind(this)}
						keyExtractor={this._keyExtractor} //唯一的key
						// ListHeaderComponent={channel === 'global' ?  <Banners navigation={navigation} />: null}
						ListFooterComponent={this._renderFooter.bind(this)}
						onEndReached={() => {
							cur === 'movie' ? this._getMovies() : cur === 'book' ? this._getBooks() : this._getMusics()
						}}
						onEndReachedThreshold={1}
					/>
				</List>
                <Modal animationType={'slide'} visible={showModal}>
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
										<Icon name={'arrow-down'} color={'#fff'} onPress={() => this.setState({ showModal: false })} />
									</Text>
								</Flex.Item>
							</Flex>
						}
					/>
                    <ScrollView contentContainerStyle={{paddingBottom: 200,}}>
                        <WhiteSpace/>
                            <WingBlank>
                            <Flex style={[reset.pb10]} justify='start' align='start'>
                                <Image source={{ uri: modalContent.image }} style={{ width: 100, height: 100 }} />
                                <View style={[reset.ml10]}>
                                    <Text style={[reset.lh30,reset.fs16,{color:Colors.tintColor}]}>{modalContent.title}</Text>
                                    <Flex style={[reset.bb1,reset.bc,{width:width - 140}]}>
                                        {modalContent.author && modalContent.author.map((o, i) => <Text style={[reset.lh25, reset.cg, reset.fs14]}>{o + ' '}</Text>)}
                                    </Flex>
                                    <Text style={[reset.lh25, reset.cg, reset.fs14]}>{modalContent.publisher}</Text>
                                    <Flex>
                                        <Score score={modalContent.rating?+modalContent.rating.average : 0} />
                                        <Text style={[reset.ml5, reset.fs14, reset.cg]}>{modalContent.rating?modalContent.rating.average : 0}</Text>
                                        <Text style={[reset.ml5, reset.fs14, reset.cg]}>（{modalContent.rating?modalContent.rating.numRaters:0}）人评价</Text>
                                    </Flex>
                                </View>
                            </Flex>
                            <Flex style={{width: width - 50}}>
                                {
                                    modalContent.tags&&modalContent.tags.map((item,i) => <Tag key={i}>{item.name}</Tag>)
                                }
                            </Flex>
                            <WhiteSpace />

                            <Text style={[reset.lh25, reset.cg, reset.fs14]}>出版日期 {modalContent.pubdate}，共 {modalContent.pages}页</Text>
                            <Text style={[reset.lh25,reset.fs14,reset.cg]}>{modalContent.catalog}</Text>
                            <Text style={[reset.lh25,reset.fs14,reset.cg]}>{modalContent.summary}</Text>
                        </WingBlank>
                    </ScrollView>
                </Modal>
			</View>
		)
	}
}
export default Home

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
