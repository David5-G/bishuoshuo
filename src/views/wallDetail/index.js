import React from 'react';
import { View, Dimensions, Alert,Animated, Text, Button, Linking, WebView, ScrollView, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import NavigationBar from '../common/NavigationBar'
import Colors from '../../constants/Colors'

import { GET } from '../../utils/request.js'
import { WallHost } from '../../config/index.js'
import HTML from 'react-native-render-html'
import { timeago } from '../../utils/times'
import Loading from '../common/Loading.js'
import Bar from './subPage/bar.js'
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')


export default class WallDetail extends React.Component {
    static navigationOptions = {
        title: 'WallDetail',
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.navigation.state.params.id,
            loading: false,
            detail: {},
            comments: {},
            openLink: false,
            draging: false,
        }
    }
    componentDidMount() {
        this._getDetail()
        this._getComments()
    }
    render() {
        const { detail, loading, openLink, comments,draging, related_articles } = this.state
        const { navigation } = this.props
        let content = detail.content ? detail.content.replace(/<!--image#0-->/, '<img src="' + detail.image_uri + '" />') : ''
        content = content.trim()
        content = content.replace('本文来自华尔街见闻','')
        content = content.replace('开通华尔街见闻金','')
        content = content.replace('成为铂金','')
        content = content.replace('铂金','')
        content = content.replace('会员','')
        content = content.replace('黑卡','')
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={detail.title}
                    style={{}}
                    leftButton={<Icon style={{ paddingLeft: 20, paddingRight: 20,}} onPress={() => navigation.goBack()} name={'ios-arrow-back'} size={28} color={Colors.headerText} />}
                // rightButton={<Text onPress={()=> navigation.navigate('Login')} style={{color:Colors.headerText,fontSize:16,}}>登录</Text>}
                />
                {
                    detail.content ?
                        <ScrollView
                            onScrollBeginDrag={() => this.setState({draging: true})}
                            onScrollEndDrag={() => this.setState({draging: false})}
                            style={{marginBottom: 60}}>
                            {/* title */}
                            <View style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                                <Text style={{ fontSize: 23, fontWeight: '600', lineHeight: 35,textAlign:'justify'}}>{detail.title}</Text>
                            </View>
                            {/* description */}
                            <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View style={{ flex: 4, flexDirection: 'row', justifyContent: "flex-start" }}>
                                    <Text style={{ lineHeight: 50, }}>来源: {detail.author && detail.author.display_name}</Text>
                                    <Text style={{ lineHeight: 50, color: Colors.bodyTextGray, marginLeft: 10, }}>{timeago(detail.display_time * 1000)}</Text>
                                </View>
                                <View style={{ flex: 6, flexDirection: 'row', justifyContent: "flex-end" }}>
                                    <Text style={{ lineHeight: 50, color: Colors.bodyTextGray }}>字数</Text>
                                    <Text style={{ lineHeight: 50, marginLeft: 10 }}>{detail.words_count}</Text>
                                    <Text style={{ lineHeight: 50, color: Colors.bodyTextGray, marginLeft: 20 }}>阅读</Text>
                                    <Text style={{ lineHeight: 50, marginLeft: 10 }}>{parseInt(detail.words_count / 500)}分钟</Text>
                                </View>
                            </View>
                            {/* 简短介绍 */}
                            <View style={{ marginTop: 25, marginLeft: 20, marginRight: 20, marginBottom: 30 }}>
                                <Text style={{ lineHeight: 28, color: Colors.bodyTextGray, fontSize: 16, textAlign: 'justify' }}>摘要: {detail.content_short}</Text>
                            </View>
                            <Loading show={openLink} text={'打开链接中···'} />
                            {/* 主体内容 */}
                            <HTML
                                html={content}
                                onLinkPress={(target, link) => {
                                    if (openLink) return
                                    this.setState({ openLink: true })
                                    Linking.openURL(link).then(res => this.setState({ openLink: false })).catch(err => {
                                        Alert('打开链接失败')
                                        this.setState({ openLink: false })
                                    });
                                }}
                                ignoredStyles={['font-family', 'fontFamily', 'display']}
                                containerStyle={{ width: DEVICE_WIDTH, paddingLeft: 10, paddingRight: 10 }}
                                tagsStyles={{
                                    p: { fontSize: 18, lineHeight: 25, color: '#333', textAlign: 'justify', marginBottom: 25, },
                                    img: {
                                        width: DEVICE_WIDTH - 20,
                                        height: 200,
                                    },
                                }} />
                        </ScrollView>
                        : <Loading show={loading} text={'请稍候···'} />
                }
                {!draging && <Bar comments={comments} navigation={navigation} />}
            </View>
        );
    }
    async _getDetail() {
        const { loading, id } = this.state
        if (!id) return
        if (loading) return
        this.setState({ loading: true })
        const res = await GET(WallHost + '/apiv1/content/articles/' + id, { extract: 1 })
        if (res.code === 20000) {
            this && this.setState({ detail: res.data })
        }
    }

    async _getComments() {
        const {id} = this.state
        // /apiv1/comment/articles/3478742/comments?id=3478742&time_desc=true&first_page=true&cursor=&limit=30
        if (!id) return
        const res = await GET(WallHost + '/apiv1/comment/articles/' + id + '/comments', {
            id,
            time_desc: true,
            first_page: true,
            cursor: '',
            limit: 30,
        })
        if (res.code === 20000 && res.data) {
            this && this.setState({comments: res.data})
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
