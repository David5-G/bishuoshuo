import React from 'react'
import PropTypes from 'prop-types';
import { View, Image, Dimensions, TouchableOpacity, Text, ActivityIndicator, FlatList, WebView, ScrollView, StyleSheet } from 'react-native'
import { Container, List, ListItem, Body, Header, Content, Card, CardItem, Item, Input, Icon, Button as NeButton, Text as NeText, } from 'native-base';
import { observer, inject } from 'mobx-react/native'
import Colors from '../../constants/Colors'
import NavigationBar from '../common/NavigationBar'
import Banners from './subPage/banner.js'
import { timeago } from '../../utils/times'
const width = Dimensions.get('window').width

@inject('MediaStore','UserStore')
@observer
class Home extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: '重新新闻',
    })
    constructor(props) {
        super(props)
        this.state = {
            limit: 10,
            cursor: '',
            channel: 'global',
            accept: 'article,newsroom,morning-report,newsrooms,live,calendar,audition,wits-home-users,hot-themes,vote-interactive,discuss-interactive,ad.internal_banner.inhouse,ad.internal_inline.inhouse,ad.inline.inhouse,ad.video.inhouse,ad.banner.inhouse,ad.inline.plista,ad.banner.plista,ad.topic.inhouse,ad.inline.tanx',
            loading: false,
            done: false,
        }
    }
    componentDidMount() {
        this._loadMore()
    }
    _toggleTab (topic) {

        const { channel,loading } = this.state
        if (loading) return
        if (channel === topic) return
        this.setState({channel: topic,done: false,cursor: '',loading: false}, () => this._loadMore())
    }
    _loadMore() {
        const { MediaStore } = this.props
        const { limit, cursor, channel, accept, loading, done, } = this.state
        if (loading || done) return
        this.setState({ loading: true })
        MediaStore.getWallmain({
            limit, cursor, channel, accept,
        }).then(res => {
            if (res.code === 20000) {
                if (!res.data.items.length || MediaStore.wallNews.length >= 50) {
                    this.setState({ done: true })
                }
                // wallnews 没有 page选项
                const next_cursor = res.data.next_cursor
                next_cursor && this.setState({ cursor: next_cursor })
            }
            this.setState({ loading: false })
        })
    }
    _renderItemView({ item }) {
        const key = item.key
        const { navigation } = this.props
        if (!item.resource.title) {
            return null
        }
        return (
            <TouchableOpacity onPress={() => navigation.navigate('WallDetail',item)} style={[styles.card, { marginTop: key % 5 === 0 ? 7 : 0 }]}>
                <View style={{ flex: 2 }}>
                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                        <Text numberOfLines={2} style={{ lineHeight: 30, fontSize: 18}}>{item.resource.title}</Text>
                        <Text style={{ lineHeight: 50, fontSize: 14, color: Colors.bodyTextGray }}>{item.resource.author.display_name} {timeago(item.resource.display_time * 1000)}</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Image
                        style={{ marginLeft: 10, height: 100 }}
                        source={{ uri: item.resource.image_uri || 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                    />
                </View>
            </TouchableOpacity>
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
        const { MediaStore } = this.props
        const { channel } = this.state
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'资讯'}
                    style={{ color: Colors.headerText, fontSize: 20 }}
                    titleLayoutStyle={{ fontSize: 30 }}
                    titleView={<Image style={{ width: 100, height: 24, marginTop: 13, }} source={{ uri: 'https://s3b.pstatp.com/growth/mobile_list/image/wap_logo@3x_581de69e.png' }} />}
                    rightButton={(<Text></Text>)}
                />

                <View style={{height: 50,}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 10,backgroundColor: '#fff',}} >
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'global')} style={styles.nav} ><Text style={styles.navItem}>要闻</Text><Text style={[styles.navItemBorder,channel==='global'?styles.active:null]} /></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'forex')} style={styles.nav}><Text style={styles.navItem}>资产</Text><Text style={[styles.navItemBorder,channel==='forex'?styles.active:null]} /></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'shares')} style={styles.nav}><Text style={styles.navItem}>股票</Text><Text style={[styles.navItemBorder,channel==='shares'?styles.active:null]} /></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'economy')} style={styles.nav}><Text style={styles.navItem}>经济</Text><Text style={[styles.navItemBorder,channel==='economy'?styles.active:null]} /></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'bonds')} style={styles.nav}><Text style={styles.navItem}>债券</Text><Text style={[styles.navItemBorder,channel==='bonds'?styles.active:null]} /></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'commodities')} style={styles.nav}><Text style={styles.navItem}>商品</Text><Text style={[styles.navItemBorder,channel==='commodities'?styles.active:null]} /></TouchableOpacity>

                        <TouchableOpacity onPress={this._toggleTab.bind(this,'enterprise')} style={styles.nav}><Text style={styles.navItem}>公司</Text><Text style={[styles.navItemBorder,channel==='enterprise'?styles.active:null]} /></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'china')} style={styles.nav}><Text style={styles.navItem}>中国</Text><Text style={[styles.navItemBorder,channel==='china'?styles.active:null]} /></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'us')} style={styles.nav}><Text style={styles.navItem}>美国</Text><Text style={[styles.navItemBorder,channel==='us'?styles.active:null]} /></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'europe')} style={styles.nav}><Text style={styles.navItem}>欧洲</Text><Text style={[styles.navItemBorder,channel==='europe'?styles.active:null]} /></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'japan')} style={styles.nav}><Text style={styles.navItem}>日本</Text><Text style={[styles.navItemBorder,channel==='japan'?styles.active:null]} /></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'wision')} style={styles.nav}><Text style={styles.navItem}>研究</Text><Text style={[styles.navItemBorder,channel==='wision'?styles.active:null]} /></TouchableOpacity>
                    </ScrollView>
                </View>

                <FlatList
                    data={MediaStore.wallNews}
                    renderItem={this._renderItemView.bind(this)}
                    keyExtractor={this._keyExtractor} //唯一的key
                    ListHeaderComponent={channel==='global'?<Banners />:null}
                    ListFooterComponent={this._renderFooter.bind(this)}
                    onEndReached={this._loadMore.bind(this)}
                    onEndReachedThreshold={0}
                />
            </View>
        );
    }
}
export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bodyBackground,
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        minHeight: 130,
        borderColor: Colors.borderGray,
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        
    },
    nav: {
        flex: 1,
        width: 35,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navItem: {
        lineHeight: 40,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
    },
    navItemBorder: {
        height: 6,
        width: 25,
    },
    active: {
        backgroundColor: Colors.bodyTextActive,
    }
});

Home.proptypes = {
    navigation: PropTypes.object.isRequired,
}

