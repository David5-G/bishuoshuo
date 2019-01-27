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
            market_type: 'forexdata',
            stk_type: 'commodity',
            order_by: 'none',
            sort_field: 'px_change_rate',
            limit: 15,
            fields: 'prod_name,prod_en_name,prod_code,symbol,last_px,px_change,px_change_rate,high_px,low_px,week_52_high,week_52_low,price_precision,update_time',
            cursor: 0,
        }
    }
    componentDidMount() {
        this._loadMore()
    }
    _renderItemView({ item, key }) {
        const { navigation } = this.props
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Chart', item[2])} key={key} style={styles.item}>
				<View style={{ flex: 3 }}>
					<Text style={{ lineHeight: 25, fontSize: 15 }}>{item[0]}</Text>
					<Text style={{ lineHeight: 20, fontSize: 12, color: Colors.bodyTextGray }}>{item[1]}</Text>
				</View>

				<View style={{ flex: 1 }}>
					<Text style={{ lineHeight: 25, fontWeight: '600', fontSize: 15 }}>{item[4]}</Text>
					<Text style={{ lineHeight: 20, fontSize: 12, color: Colors.bodyTextGray }}>{hourMins(item[11])}</Text>
				</View>

				<View style={{ flex: 1 }}>
					<View style={{ borderRadius: 3, backgroundColor: item[6] >= 0 ? Colors.raise : Colors.fall, alignItems: 'center' }}>
						<Text style={{ lineHeight: 25, fontWeight: '600', color: '#fff', fontSize: 15 }}>{item[6] >= 0 ? '+' : null}{item[6].toFixed(2)}%</Text>
					</View>
					<Text style={{ lineHeight: 20, fontSize: 12, color: item[5] >= 0 ? Colors.raise : Colors.fall }}>{item[5] >= 0 ? '+' : null}{item[5].toFixed(item[11])}</Text>
				</View>
			</TouchableOpacity>
        )
    }
    _renderHeader() {
        return null
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
    _loadMore() {
        const {  loading, market_type, stk_type, order_by, sort_field, limit, fields, cursor, } = this.state
        const { QuotaStore } = this.props
        if (loading) return
        this.setState({ loading: true })
        QuotaStore.getQuotaList({
            market_type,
            stk_type,
            order_by,
            sort_field,
            limit,
            fields,
            cursor,
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
                          onRefresh={this._loadMore.bind(this)}
                          title="刷新中···"
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
        paddingTop: 15,
        paddingBottom: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: Colors.borderGray,
        backgroundColor: '#fff',
    },
});



