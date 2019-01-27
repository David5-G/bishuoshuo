import React from 'react';
import { View, Text, Button, WebView, RefreshControl,TouchableOpacity, ScrollView, SectionList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import Colors from '../../../constants/Colors'
import { GET } from '../../../utils/request'
import { WallQuotaListHost, WallQuotaHost } from '../../../config'
import { hourMins } from '../../../utils/times.js'
export default class Forex extends React.Component {
    static navigationOptions = {
        title: 'Forex',
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            list: [],
        }
    }
    componentDidMount() {
        this._getList()
    }
    componentWillUnmount() {
        this.setState({loading: false})
    }

    async _getList() {
        // WallQuotaHost: 'https://api-ddc.wallstreetcn.com',
        // 外汇
        if (this.state.loading) return
        this.setState({ loading: true })
        let list = await GET(WallQuotaListHost + '/apiv1/kvconfig/items/marketdataforexii').then(res => res)
        if (list.code !== 20000) return
        list = list.data
        let symbolList = []
        list.forEach((arr) => arr['items'].forEach((obj) => symbolList.push(obj.symbol)))
        // 行情
        // https://api-ddc.wallstreetcn.com/market/real?&prod_code=BTCUSD.Bitfinex&fields=prod_code,prod_name,prod_en_name,market_type,symbol,trade_status,price_precision,update_time,securities_type,px_change,px_change_rate,last_px,preclose_px,amplitude,turnover_volume,ex_type,ex_update_time,ex_last_px,ex_px_change,ex_px_change_rate
        symbolList = symbolList.join(',')
        let quotaList = await GET(WallQuotaHost + '/market/real', {
            prod_code: symbolList,
            fields: 'prod_code,prod_name,prod_en_name,market_type,symbol,trade_status,price_precision,update_time,securities_type,px_change,px_change_rate,last_px,preclose_px,amplitude,turnover_volume,ex_type,ex_update_time,ex_last_px,ex_px_change,ex_px_change_rate',
        }).then(res => res)
        if (quotaList.code !== 20000) return
        quotaList = quotaList.data.snapshot

        list.forEach(arr => {
            arr['items'].forEach(obj => {
                obj.data = quotaList[obj.symbol]
            })
            arr.data = arr.items
            delete arr['items']
        })
        this && this.setState({ loading: false, list })
    }
    _renderItemView = (info) => {
        const { navigation } = this.props
        const item = info.item.data
        const key = info.item.index
        return (<TouchableOpacity onPress={() => navigation.navigate('Chart', item[0])} key={key} style={styles.item}>
            <View style={{ flex: 3 }}>
                <Text style={{ lineHeight: 25, fontSize: 15 }}>{item[1]}</Text>
                <Text style={{ lineHeight: 20, fontSize: 12, color: Colors.bodyTextGray }}>{item[2]}</Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text style={{ lineHeight: 25, fontWeight: '600', fontSize: 15 }}>{item[11]}</Text>
                <Text style={{ lineHeight: 20, fontSize: 12, color: Colors.bodyTextGray }}>{hourMins(item[7])}</Text>
            </View>

            <View style={{ flex: 1 }}>
                <View style={{ borderRadius: 3, backgroundColor: item[9] >= 0 ? Colors.raise : Colors.fall, alignItems: 'center' }}>
                    <Text style={{ lineHeight: 25, fontWeight: '600', color: '#fff', fontSize: 15 }}>{item[9] >= 0 ? '+' : null}{item[9].toFixed(2)}%</Text>
                </View>
                <Text style={{ lineHeight: 20, fontSize: 12, color: item[10] >= 0 ? Colors.raise : Colors.fall }}>{item[10] >= 0 ? '+' : null}{item[10].toFixed(item[6])}</Text>
            </View>
        </TouchableOpacity>)
    }

    renderSectionHeader = (info) => {
        const name = info.section.name
        return (<View style={{backgroundColor: 'aaa',flexDirection: 'row',height: 35,alignItems:'center'}}>
            <Icon size={20} color={'#999'} name={'downsquare'}  style={{marginTop:3,marginLeft: 10}}/>
            <Text style={{lineHeight: 35,height: 35,fontSize: 16,marginLeft: 5}}>{name}</Text>
        </View>)
    }
    _keyExtractor(info) {
        return Math.random()
    }
    render() {
        const { list, loading } = this.state
        return (
            <View style={styles.container}>
                <SectionList
                    renderSectionHeader={this.renderSectionHeader}
                    renderItem={this._renderItemView.bind(this)}
                    keyExtractor={this.keyExtractor}
                    sections={list}
                    refreshing={loading}
                    onRefresh={loading} //下拉
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={this._getList.bind(this)}
                            title="刷新中···"
                            titleColor="#999999"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="red"
                        />
                    }
                    ItemSeparatorComponent={() => null}
                    ListHeaderComponent={() => null}
                    ListFooterComponent={() => null}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: Colors.borderGray,
        backgroundColor: '#fff',
    },
});
