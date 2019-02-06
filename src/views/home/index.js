import React from 'react'
import PropTypes from 'prop-types';
import { View,Alert, Image, Dimensions,AsyncStorage, TouchableOpacity,StatusBar, Text, ActivityIndicator, FlatList, WebView, ScrollView, StyleSheet } from 'react-native'
import { Toast, Button} from 'native-base'
import { observer, inject, } from 'mobx-react/native'
import { toJS } from 'mobx'

import Colors from '../../constants/Colors'
import Icon from 'react-native-vector-icons/Ionicons'
import NavigationBar from '../common/NavigationBar'
import Banners from './subPage/banner.js'
import { timeago } from '../../utils/times'
import { red } from 'ansi-colors';
import { barHeight, statusBarHeight } from '../../constants/Scale'
const width = Dimensions.get('window').width

@inject('MediaStore', 'UserStore')
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
        const { MediaStore } = this.props
        MediaStore.getStorageCollection()
        MediaStore.getStorageArticleCollection()
        this._loadMore()
    }
    
    

    _toggleTab(topic) {
        const { channel, loading } = this.state
        if (channel === topic || loading) return
        this.setState({ channel: topic, done: false, cursor: '', loading: false }, () => this._loadMore())
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
        if (!item.resource.title || !item.resource.author) {
            return null
        }
        const key = item.key
        const { navigation, MediaStore } = this.props
        const author = item.resource.author
        const idx = MediaStore.collection.findIndex(el => el.id === author.id)
        const active = idx === -1 ? 0 : 1
        return (
            <TouchableOpacity onPress={() => navigation.navigate('WallDetail', item.resource)} style={[styles.card, { marginTop: key % 5 === 0 ? 7 : 0 }]}>
                <View style={{ flex: 1.8 }}>
                    <View style={{ flex: 1, justifyContent: 'space-between'}}>
                        <Text numberOfLines={2} style={{ lineHeight: 30, fontSize: 18 }}>{item.resource.title}</Text>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                            <Text style={{flex: 3,lineHeight: 50,fontSize: 14,color: Colors.bodyTextGray }}>{item.resource.author.display_name} {timeago(item.resource.display_time * 1000)}</Text>
                            <Text style={{flex: 1,textAlign:'right',lineHeight: 50,fontSize: 12,color: active?Colors.collect:Colors.bodyTextGray }}>{active ? '已关注' : ''}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1,justifyContent: 'space-between' }}>
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
        const { MediaStore,UserStore, navigation } = this.props
        const { channel } = this.state
        return (
            <View style={styles.container}>

                {/* <View style={{backgroundColor: '#fff',paddingBottom: 10}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'global')} style={styles.nav} ><Text style={[channel==='global'?styles.active:styles.navItem]}>要闻</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'forex')} style={styles.nav}><Text style={[channel==='forex'?styles.active:styles.navItem]}>资产</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'shares')} style={styles.nav}><Text style={[channel==='shares'?styles.active:styles.navItem]}>股票</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'economy')} style={styles.nav}><Text style={[channel==='gleconomyobal'?styles.active:styles.navItem]}>经济</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'bonds')} style={styles.nav}><Text style={[channel==='bonds'?styles.active:styles.navItem]}>债券</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'commodities')} style={styles.nav}><Text style={[channel==='commodities'?styles.active:styles.navItem]}>商品</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'enterprise')} style={styles.nav}><Text style={[channel==='enterprise'?styles.active:styles.navItem]}>公司</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'china')} style={styles.nav}><Text style={[channel==='china'?styles.active:styles.navItem]}>中国</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'us')} style={styles.nav}><Text style={[channel==='us'?styles.active:styles.navItem]}>美国</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'europe')} style={styles.nav}><Text style={[channel==='europe'?styles.active:styles.navItem]}>欧洲</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'japan')} style={styles.nav}><Text style={[channel==='japan'?styles.active:styles.navItem]}>日本</Text></TouchableOpacity>
                        <TouchableOpacity onPress={this._toggleTab.bind(this,'wision')} style={styles.nav}><Text style={[channel==='wision'?styles.active:styles.navItem]}>研究</Text></TouchableOpacity>
                    </ScrollView>
                </View> */}
                
                <StatusBar barStyle={'dark-content'}/>
                <View style={{paddingTop: statusBarHeight + 10,backgroundColor: '#fff'}}>

                    <View style={styles.header}>
                        <View style={{ flex: 3, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={this._toggleTab.bind(this, 'global')} style={{ width: 60, justifyContent: 'flex-end', alignItems: 'center', }} ><Text style={[channel === 'global' ? styles.active : styles.navItem]}>要闻</Text></TouchableOpacity>
                            <TouchableOpacity onPress={this._toggleTab.bind(this, 'enterprise')} style={{ width: 60, justifyContent: 'flex-end', alignItems: 'center', }}><Text style={[channel === 'enterprise' ? styles.active : styles.navItem]}>公司</Text></TouchableOpacity>
                            <TouchableOpacity onPress={this._toggleTab.bind(this, 'wision')} style={{ width: 60, justifyContent: 'flex-end', alignItems: 'center', }}><Text style={[channel === 'wision' ? styles.active : styles.navItem]}>研究</Text></TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={{ flex: 1, alignItems: 'flex-end' }}
                            onPress={() => navigation.navigate(UserStore.isLogin?'Userinfo':'Login')}
                        >
                            <Icon style={{ marginTop: 14 }} name={'ios-contact'} color={'#999'} size={40} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <FlatList
                    data={MediaStore.wallNews}
                    renderItem={this._renderItemView.bind(this)}
                    keyExtractor={this._keyExtractor} //唯一的key
                    ListHeaderComponent={channel === 'global' ? <Banners navigation={navigation} /> : null}
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
        width: 60,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    navItem: {
        fontSize: 18,
        fontWeight: '600',
        color: '#999',

    },
    active: {
        fontSize: 24,
        fontWeight: '600',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: barHeight,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,

    },
});

Home.proptypes = {
    navigation: PropTypes.object.isRequired,
}

