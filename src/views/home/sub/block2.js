import React from 'react'
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react/native'
import {
	View,
	Text,
	Button,
	WebView,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet,
    ActivityIndicator,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../../constants/Colors'
import { barHeight, statusBarHeight, isIos, width } from '../../../constants/Scale'
import { toJS } from 'mobx';

@inject('MainStore')
@observer
export default class Block extends React.Component {
	static navigationOptions = {
		title: 'Block',
		header: null
    }
    static proptypes = {
        navigation: PropTypes.object.isRequired,
        MainStore: PropTypes.object.isRequired,
    }
	constructor(props) {
		super(props)
		this.state = {
            done: false,
            loading: false,

            type: 'movie',
            tag: '热门',
            page_limit: 20,
            page_start: 0,
        }
	}
	componentDidMount() {
        this._loadMore()
    }
    async _loadMore() {
        console.log('loading-->')
        const { type, tag, page_limit, page_start, done,loading } = this.state
        if (loading || done) return
        this.setState({loading: true})
        const res = await MainStore.getMovieList({
            page_start,
            page_limit,
            type,
            tag,
        })
        if (res && res.subjects && res.subjects.length) {
            this.setState({page_start: page_start + page_limit})
        } else {
            this.setState({done:true})
        }

        this.setState({loading: false})
        console.log('res-->' , res)
    }
    _renderItemView({ item }) {
        console.log('item-->', toJS(item))
        return (
            <View style={styles.item}>
                <View>
                    <Image style={styles.img} source={{uri:item.cover}}/>
                    {/* https://img3.doubanio.com/f/movie/caa8f80abecee1fc6f9d31924cef8dd9a24c7227/pics/movie/ic_new.png
                     */}
                    <View style={{width: (width - 40) / 3}}>
                        {item.is_new && <Image style={styles.tag} source={{uri:'https://img3.doubanio.com/f/movie/caa8f80abecee1fc6f9d31924cef8dd9a24c7227/pics/movie/ic_new.png'}} />}
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.rate}>{item.rate}</Text>
                    </View>
                </View>
            </View>
        )
    }
    _renderFooter() {
        const { done, loading, } = this.state
        if (done) {
            return (
                <View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start', }}>
                    <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, }}>没有更多数据了</Text>
                </View>
            )
        } else if (loading) {
            return (<View style={styles.footer}><ActivityIndicator /></View>)
        } else {
            return null
        }
    }
    _keyExtractor(item, index) {
        return index.toString()
    }

	render() {
        const { navigation } = this.props
		return (
			<View style={{}}>
                <FlatList
                    contentContainerStyle={{flexDirection: 'row',flexWrap:'wrap',marginLeft: 10}}
                    overScrollMode={'never'}
                    overScroll={'never'}
                    data={MainStore.hotMovies}
                    renderItem={this._renderItemView.bind(this)}
                    keyExtractor={this._keyExtractor} //唯一的key
                    // ListHeaderComponent={channel === 'global' ? <Banners navigation={navigation} /> : null}
                    ListFooterComponent={this._renderFooter.bind(this)}
                    onEndReached={this._loadMore.bind(this)}
                    onEndReachedThreshold={1}
                />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
    },
    item: {
        width: (width - 40) / 3,
        marginRight: 8,
        paddingTop: 10,
        paddingBottom: 10,
    },
    img: {
        width: (width - 40) / 3,
        height:(width - 40) / 3 * 2867 / 2048,
        borderRadius: 2,
    },
    tag: {
        width: 13,height: 13,
        marginRight: 5,
        marginTop: 3,
    },
    title: {
        fontSize: 13,
        lineHeight: 20,
        color: '#37a',
        marginRight: 2,
    },
    rate: {
        fontSize: 13,
        lineHeight: 20,
        color: '#e09015',
    }
})
