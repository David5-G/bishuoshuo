import React from 'react';
import PropTypes from 'prop-types';
import { View, Text,RefreshControl,TouchableOpacity,TouchableHighlight, SectionList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import Colors from '../../../constants/Colors'
import { GET } from '../../../utils/request'
import { WallQuotaListHost, WallQuotaHost } from '../../../config'
import { hourMins } from '../../../utils/times.js'


export default class List extends React.Component {
    static propTypes = {
        classify: PropTypes.string.isRequired,
        navigation: PropTypes.object.isRequired,
    }
    static navigationOptions = {
        title: '',
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            defaultShow: 0,
            list: [],
        }
    }
    componentDidMount() {
        console.log('type-->', this.props.classify)
        this._getList()
    }
    componentWillUnmount() {
        this.setState({loading: false})
    }

    async _getList() {
        // WallQuotaHost: 'https://api-ddc.wallstreetcn.com',
        // 外汇
        const { loading } = this.state
        const { classify } = this.props
        if (loading) return
        this.setState({ loading: true })
        let list = await GET(WallQuotaListHost + '/apiv1/kvconfig/items/' + classify).then(res => res)
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

        list.forEach((sections,index) => {
            sections['items'].forEach(obj => {
                obj.data = quotaList[obj.symbol]
            })
            sections.data = sections.items
            delete sections['items']
            sections.index= index
        })
        this && this.setState({ loading: false, list })
    }
    _renderItemView = (info) => {
        const { defaultShow } = this.state
        const { navigation } = this.props
        const item = info.item.data
        const sectionIdx = info.section.index
        if (!item) return null //错误处理
        if (info.index >= 5) return null //最多只显示6个
        if (!item || defaultShow !== sectionIdx) return null //只显示展开的
        return (<TouchableOpacity onPress={() => navigation.navigate('Chart', item[0])} style={styles.item}>
            <View style={{ flex: 3 }}>
                <Text style={{ lineHeight: 25, fontSize: 15,color: '#333' }}>{item[1]}</Text>
                <Text style={{ lineHeight: 20, fontSize: 12, color: Colors.bodyTextGray }}>{item[2]}</Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text style={{ lineHeight: 25, fontWeight: '600', fontSize: 15 }}>{item[11]}</Text>
                <Text style={{ lineHeight: 20, fontSize: 12, color: Colors.bodyTextGray }}>{hourMins(item[7])}</Text>
            </View>

            <View style={{ flex: 1 }}>
                <View style={{ borderRadius: 3, backgroundColor: item[10] >= 0 ? Colors.raise : Colors.fall, alignItems: 'center' }}>
                    <Text style={{ lineHeight: 25, fontWeight: '600', color: '#fff', fontSize: 15 }}>{item[10] >= 0 ? '+' : null}{item[10].toFixed(2)}%</Text>
                </View>
                <Text style={{ lineHeight: 20, fontSize: 12, color: item[9] >= 0 ? Colors.raise : Colors.fall }}>{item[9] >= 0 ? '+' : null}{item[9].toFixed(item[6])}</Text>
            </View>
        </TouchableOpacity>)
    }

    _renderSectionHeader = (info) => {
        const { name, index } = info.section
        const { defaultShow } = this.state
        return (<View style={styles.sectionHeader}>
                    <TouchableHighlight onPress={() => this.setState({defaultShow: defaultShow===index?'':index})}>
                        <View style={{flexDirection: 'row',alignItems: 'center'}}>
                            <Icon size={16} color={'#777'} name={defaultShow===index?'downcircle':'upcircle'} style={{marginTop: 2,}}/>
                            <Text style={{lineHeight: 35,height: 35,fontSize: 16,marginLeft: 5,}}>{name}</Text>
                        </View>
                    </TouchableHighlight>
                    <Text style={{lineHeight: 35,height: 35,fontSize: 14,color: '#666'}}>查看更多</Text>
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
                    renderSectionHeader={this._renderSectionHeader.bind(this)}
                    renderItem={this._renderItemView.bind(this)}
                    keyExtractor={this._keyExtractor}
                    sections={list}
                    refreshing={loading}
                    onRefresh={this._getList.bind(this)} //下拉
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
    sectionHeader: {
        backgroundColor: '#f2f2f2',
        flexDirection: 'row',
        alignItems: 'center',
        height: 35,
        borderColor: '#eee',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    }
});
