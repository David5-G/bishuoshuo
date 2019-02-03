import React from 'react';
import { View, Text, Button, WebView, Dimensions, ImageBackground, Image, ScrollView, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors'
import { GET } from '../../utils/request'
import { WallQuotaListHost } from '../../config'
import Icon from 'react-native-vector-icons/Ionicons'
import NavigationBar from '../common/NavigationBar'
import { observer, inject } from 'mobx-react/native';

const width = Dimensions.get('window').width

@inject('MainStore', 'UserStore')
@observer
export default class Cycle extends React.Component {
    static navigationOptions = {
        title: 'Cycle',
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            theme: []
        }
    }
    componentDidMount() {
        this._getTheme()
        // https://api-prod.wallstreetcn.com/apiv1/content/mostview/themes
        // WallQuotaListHost: 'https://api-prod.wallstreetcn.com',
    }
    componentWillUnmount() {

    }
    async _getTheme() {
        const { loading } = this.state
        if (loading) return
        this.setState({ loading: true })
        let theme = await GET(WallQuotaListHost + '/apiv1/content/mostview/themes')
        this.setState({ loading: false })
        if (theme.code !== 20000) return
        theme = theme.data.items
        this.setState({ theme })
    }
    render() {
        const { navigation } = this.props
        const { theme } = this.state
        return (
            <View style={styles.container}>
                <Image style={{ position: 'absolute', width: '100%', height: 270, }} source={require('../../pics/b1.png')} />
                <ScrollView style={{}}>
                    <NavigationBar
                        title={'圈子'}
                        style={{ backgroundColor: 'transparent' }}
                    />
                    <View style={{ marginLeft: 20, marginRight: 20, borderRadius: 10, overflow: 'hidden' }}>
                        <ImageBackground source={require('../../pics/Bitmap.png')} style={{ width: '100%', height: 140, }}>
                            <View style={{
                                position: "absolute", bottom: 0,
                                left: 0, paddingLeft: 10, paddingRight: 10, paddingBottom: 10,
                            }}>
                                <Text style={{ color: '#fff', lineHeight: 25, fontWeight: '600' }}>品牌实验室 | Brand Studio</Text>
                                <Text style={{ color: '#fff', lineHeight: 18, fontSize: 12, }}>是客户所信赖的创意伙伴。为我们的客户提供量身定制的策略和创意，并确保了每一场营销战的创造力和有效性。</Text>
                            </View>
                        </ImageBackground>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 50, paddingRight: 50,marginTop: 20, }}>
                        <View style={[styles.cube,]}>
                            <Image style={[styles.icon,]} source={require('../../pics/i1.png')} />
                            <Text style={[styles.des,]}>商业项目</Text>
                        </View>
                        <View style={[styles.cube,]}>
                            <Image style={[styles.icon,]} source={require('../../pics/i2.png')} />
                            <Text style={[styles.des,]}>案例分析</Text>
                        </View>
                        <View style={[styles.cube,]}>
                            <Image style={[styles.icon,]} source={require('../../pics/i3.png')} />
                            <Text style={[styles.des,]}>服务范围</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={{flexDirection: 'row',paddingLeft: 10,}}>
                            <Icon style={{marginTop: 12,marginRight: 10,}} name={'md-list'} size={15} />
                            <Text style={{lineHeight: 40}}>商业项目</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <View style={[styles.listItem]}>
                                <Image style={[styles.thumb,]} source={require('../../pics/p1.png')} />
                                <View style={{ flexDirection: 'row', marginTop: 7, marginBottom: 7, }}>
                                    <View style={styles.flag}><Text style={styles.flag1}>独家</Text></View>
                                    <Text style={styles.flag2}>2018年12月</Text>
                                </View>
                                <Text style={[styles.tip,]}>「点金石」最佳分析师评选</Text>
                            </View>

                            <View style={[styles.listItem]}>
                                <Image style={[styles.thumb,]} source={require('../../pics/p2.png')} />
                                <View style={{ flexDirection: 'row', marginTop: 7, marginBottom: 7, }}>
                                    <View style={styles.flag}><Text style={styles.flag1}>独家</Text></View>
                                    <Text style={styles.flag2}>2018年12月</Text>
                                </View>
                                <Text style={[styles.tip,]}>《经济百谈》原创大型经济访谈录</Text>
                            </View>

                            <View style={[styles.listItem]}>
                                <Image style={[styles.thumb,]} source={require('../../pics/p3.png')} />
                                <View style={{ flexDirection: 'row', marginTop: 7, marginBottom: 7, }}>
                                    <View style={styles.flag}><Text style={styles.flag1}>独家</Text></View>
                                    <Text style={styles.flag2}>2018年12月</Text>
                                </View>
                                <Text style={[styles.tip,]}>《科技新探》探索科技的边界</Text>
                            </View>

                            <View style={[styles.listItem]}>
                                <Image style={[styles.thumb,]} source={require('../../pics/p4.png')} />
                                <View style={{ flexDirection: 'row', marginTop: 7, marginBottom: 7, }}>
                                    <View style={[styles.flag, { backgroundColor: '#00c2d3' }]}><Text style={styles.flag1}>大事件</Text></View>
                                    <Text style={styles.flag2}>2018年12月</Text>
                                </View>
                                <Text style={[styles.tip,]}>「经济奇迹」记录改革开放40周年</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>


                {/* <Image resizeMode={'cover'} style={{ width, position: 'absolute', left: 0, top: 0 }} source={require('../../pics/b1.png')} /> */}


                {/* <ScrollView >
                    <View style={styles.box}>
                        {
                            theme.map((item, i) => {
                                return (<View key={i} style={{width: '50%',}}>
                                    <View style={i%2===0?styles.l:styles.r}>
                                        <Image resizeMode={'cover'} style={{ height: 120 }} source={{ uri: item.image_uri }} />
                                        <Text>{item.title}</Text>
                                    </View>
                                </View>)
                            })
                        }
                    </View>
                </ScrollView> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    l: {
        paddingLeft: 20,
        paddingRight: 10,
    },
    r: {
        paddingRight: 20,
        paddingLeft: 10,
    },
    cube: {
        backgroundColor: '#fff',
        borderRadius: 5,
        alignItems: 'center',
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 0 },
    },
    icon: {
        width: 22,
        height: 25,
    },
    des: {
        fontSize: 12,
        marginTop: 10,
        color: '#444',
    },
    section: {
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 0 },
        marginTop: 20,
        paddingRight: 7,
    },
    listItem: {
        width: '50%',
        paddingLeft: 7,
        paddingBottom: 20,
    },
    thumb: {
        width: '100%',
        backgroundColor: 'red',
        borderRadius: 3,
    },
    tip: {
        lineHeight: 20,
        fontSize: 14,
    },
    flag: { backgroundColor: '#714cd0', borderRadius: 2, marginRight: 10, paddingLeft: 3, paddingRight: 3 },
    flag1: { lineHeight: 15, fontSize: 12, color: '#fff' },
    flag2: { fontSize: 12, color: '#666', lineHeight: 15, },

});
