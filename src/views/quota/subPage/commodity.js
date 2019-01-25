import React, { Component } from 'react'
import {View, Text, StyleSheet, FlatList, ActivityIndicator,RefreshControl, TouchableOpacity} from 'react-native'
import { observer, inject } from 'mobx-react/native'
import Colors from '../../../constants/Colors'
import { toJS } from 'mobx'
import Icon from 'react-native-vector-icons/Ionicons'
import { hourMins } from '../../../utils/times.js'
// 基金
@inject('QuotaStore')
@observer
export default class Fund extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,

            type: 'commodity',
            fields: 'prod_name,last_px,px_change,px_change_rate,price_precision,update_time',
            sort_type: '', //pcp_incr
        }
    }
    componentDidMount() {
        this._getList()
    }
    _renderItemView({ item, key }) {
        const symbol = Object.keys(item)[0]
        const arr = item[symbol]
        const {navigation} = this.props
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Chart',symbol)}  key={key} style={styles.item}>
                <View style={{flex: 2}}>
                    <Text style={{lineHeight: 20,fontWeight: '600',fontSize: 15}}>{arr[0]}</Text>
                    <Text style={{lineHeight: 25,fontSize: 12,color: Colors.bodyTextGray}}>{symbol}</Text>
                </View>

                <View style={{flex: 1}}>
                    <Text style={{lineHeight: 20,fontWeight: '600',}}>{arr[1]}</Text>
                    <Text style={{lineHeight: 25,fontSize: 12,color: Colors.bodyTextGray}}>{hourMins(arr[5])}</Text>
                </View>

                <View style={{flex: 1,justifyContent: 'center'}}>
                    <Text style={{fontWeight: '600',color: arr[3]>=0?Colors.raise:Colors.fall}}>{arr[3]>=0?'+':null}{arr[3].toFixed(2)}%</Text>
                </View>

                <View style={{flex: 1,justifyContent: 'center'}}>
                    <Text style={{fontWeight: '600',color: arr[3]>=0?Colors.raise:Colors.fall}}>{arr[2]>=0?'+':null}{arr[2]}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    _renderHeader() {
        return (<View style={{flexDirection: 'row',paddingLeft: 10,paddingRight: 10,height: 40,alignItems: 'center',backgroundColor:'#f2f2f2'}}>
            <View style={{flex: 2}}><Text style={{fontSize: 12}}>资产</Text></View>
            <View style={{flex: 1}}><Text style={{fontSize: 12}}>现价</Text></View>
            <View style={{flex: 1,flexDirection: 'row',alignItems:'center'}}>
                <Text style={{fontSize: 12}}>涨跌额</Text><Icon style={{marginLeft: 3}} size={18} name={'md-arrow-dropdown'} color={Colors.bodyTextGray} />
            </View>
            <View style={{flex: 1,flexDirection: 'row',alignItems:'center'}}>
                <Text style={{fontSize: 12}}>涨跌幅</Text><Icon style={{marginLeft: 3}} size={18} name={'md-arrow-dropdown'} color={Colors.bodyTextGray} />
            </View>
        </View>)
    }
    _renderFooter() {
        const {loading } = this.state
        if (loading) {
            return (<View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start', }}>
                <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, }}></Text>
            </View>)
        } else {
            return (<View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start', }}>
                <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, }}>没有更多数据了</Text>
            </View>)
        }
        
    }
    _getList() {
        const {  loading, type, fields, sort_type } = this.state
        const { QuotaStore } = this.props
        if (loading) return
        this.setState({ loading: true })
        QuotaStore.getQuotaList({
            type,
            fields,
            sort_type,
        }).then(res => {
            console.log('res-->', res)
            this.setState({ loading: false })
        })
    }
    _keyExtractor(item, index) {
        return index.toString()
    }
    render () {
        const { QuotaStore } = this.props
        const { loading } = this.state
        return (
            <View style={styles.container}>
                
                <FlatList
                    style={{}}
                    refreshing={loading}
                    onRefresh={loading} //下拉
                    data={QuotaStore.commodityList}
                    renderItem={this._renderItemView.bind(this)}
                    keyExtractor={this._keyExtractor} //唯一的key
                    ListHeaderComponent={this._renderHeader.bind(this)}
                    ListFooterComponent={this._renderFooter.bind(this)}
                    // onEndReached={}
                    // onEndReachedThreshold={0}
                    refreshControl={
                        <RefreshControl
                          refreshing={loading}
                          onRefresh={this._getList.bind(this)}
                          title="加载中..."
                          titleColor="#999999"
                          colors={['#ff0000', '#00ff00', '#0000ff']}
                          progressBackgroundColor="red"
                        />
                    }
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        marginBottom: 1,
        backgroundColor: '#fff',
    },
});



