import React from 'react'
import PropTypes from 'prop-types';
import { View, Alert, Image, RefreshControl, Dimensions, AsyncStorage, TouchableOpacity, StatusBar, Text, ActivityIndicator, FlatList, WebView, ScrollView, StyleSheet } from 'react-native'
import { Container, Header, Form, Tab, DatePicker, Picker, Left,Right,Item, Tabs, TabHeading, } from 'native-base'
import { Toast, Button } from 'native-base'
import { observer, inject, } from 'mobx-react/native'
import { toJS } from 'mobx'

import Colors from '../../constants/Colors'
import Icon from 'react-native-vector-icons/Ionicons'
import { width } from '../../constants/Scale'
import { GET } from '../../utils/request'
import { WallQuotaListHost } from '../../config'
import { dayhourMins, hourMins, day } from '../../utils/times'
import NavigationBar from '../common/NavigationBar'


import CoinNews from '../news/subPage/coin'
import FlashNews from '../news/subPage/flashNews'
import ImportantNews from '../news/subPage/importantNews'

@inject('MediaStore', 'UserStore')
@observer
class Finance extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: '',
        header: null,
    })
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            financeList: [],
            time: new Date(new Date().toLocaleDateString()).getTime(),
            tab: 0,
        }
    }
    componentDidMount() {
        this._loadMore()
    }

    async _loadMore() {
        const { loading, time } = this.state
        if (loading) return
        this.setState({ loading: true })
        let res = await GET(WallQuotaListHost + '/apiv1/finance/macrodatas', {
            // start: 1549382400,
            // end:   1549468799

            start: +new Date(time) / 1000,
            end: +new Date(time) / 1000 + 86400 - 1,
        })
        if (res.code === 20000 && res.data.items) {
            this.setState({
                financeList: res.data.items,
            })
        }
        this.setState({ loading: false })

    }
    _renderItemView({ item }) {
        return (
            <View
                style={{ backgroundColor: '#fff', padding: 15, paddingBottom: 10, marginBottom: 1, }}
            >
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flexDirection: 'row', flex: 2, }}>
                        <Text style={{ lineHeight: 30, fontSize: 14, color: '#666' }}>{hourMins(item.public_date)}</Text>
                        <Image style={{ height: 14, width: 22, marginTop: 8, marginLeft: 15, }} source={{ uri: item.flag_uri }} />
                        <Text style={{ lineHeight: 30, fontSize: 14, marginLeft: 10, color: '#888' }}>{item.country}</Text>
                    </View>
                    <View style={{ flex: 1.5, flexDirection: 'row-reverse' }}>
                        <Icon style={{ lineHeight: 30, marginLeft: 15 }} size={20} color={'#ddd'} name={item.push_status ? 'ios-notifications' : 'ios-notifications-off'} />
                        <View style={{ flexDirection: 'row' }}>
                            {[0, 0, 0].map((o, i) => {
                                const active = i + 1 <= item.importance ? 1 : 0
                                return (
                                    <Icon key={i} style={{ lineHeight: 30 }} size={18} color={active ? item.period === '周' ? '#1482F0' : item.period === '季' ? Colors.raise : Colors.collect : '#ddd'} name={'ios-star'} />
                                )
                            })}
                        </View>
                    </View>
                </View>

                <Text style={{ lineHeight: 25, fontWeight: '600', fontSize: 16, color: '#333' }}>{item.title}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ lineHeight: 35, color: item.period === '周' ? '#1482F0' : item.period === '季' ? Colors.raise : Colors.collect }}>今值 {item.actual || ' - -'}</Text>
                    <Text style={{ lineHeight: 35, color: Colors.bodyTextGray }}>前值 {item.previous || ' - -'}</Text>
                    <Text style={{ lineHeight: 35, color: Colors.bodyTextGray }}>预测 {item.forecast || ' - -'}</Text>
                </View>
            </View>
        )
    }
    _renderHeader() {
        return (
            null
        )
    }
    _renderFooter() {
        return null
    }
    _keyExtractor(item, index) {
        return index.toString()
    }
    render() {
        const { navigation } = this.props
        const { financeList, loading, tab } = this.state
        return (
            <View style={styles.container}>
                
                <NavigationBar
                    title={'财经'}
                    style={{}}
                    // rightButton={<Icon style={{}} onPress={() => { }} name={'ios-timer'} size={20} color={Colors.headerText} />}
                />
                <Form>
                    <Item picker>
                        <Left>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon color={'#999'} name="ios-arrow-down" />}
                                style={{ }}
                                placeholder="选择类型"
                                placeholderStyle={{ color: "#000" }}
                                placeholderIconColor="#007aff"
                                selectedValue={(s) => {}}
                                onValueChange={(v) => this.setState({ tab: v })}
                            >
                                <Picker.Item label="财经日历" value={0} />
                                <Picker.Item label="币圈" value={1} />
                                <Picker.Item label="闪讯" value={2} />
                                <Picker.Item label="重要新闻" value={3} />
                            </Picker>
                        </Left>
                        <Right style={{marginRight: 15}}>
                            {tab===0&&<Text style={{fontSize: 16,color:'#999'}}>财经日历</Text>}
                            {tab===1&&<Text style={{fontSize: 16,color:'#999'}}>币圈</Text>}
                            {tab===2&&<Text style={{fontSize: 16,color:'#999'}}>闪讯</Text>}
                            {tab===3&&<Text style={{fontSize: 16,color:'#999'}}>重要新闻</Text>}
                        </Right>
                    </Item>
                </Form>


                {tab === 0 && <FlatList
                    data={financeList}
                    refreshing={loading}
                    onRefresh={loading} //下拉
                    renderItem={this._renderItemView.bind(this)}
                    keyExtractor={this._keyExtractor} //唯一的key
                    ListHeaderComponent={this._renderHeader.bind(this)}
                    ListFooterComponent={this._renderFooter.bind(this)}
                    // onEndReached={this._loadMore.bind(this)}
                    onEndReachedThreshold={0}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={this._loadMore.bind(this)}
                            title="刷新中···"
                            titleColor="#999999"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="red"
                        />
                    }
                />
                }
                {tab === 1 && <CoinNews navigation={navigation} />}
                {tab === 2 && <FlashNews navigation={navigation} />}
                {tab === 3 && <ImportantNews navigation={navigation} />}
            </View>
        );
    }
}
export default Finance

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bodyBackground,
    },
});

Finance.proptypes = {
    navigation: PropTypes.object.isRequired,
}

