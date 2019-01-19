import React, { Component } from 'react'
import {View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native'
import { observer, inject } from 'mobx-react/native'
import Colors from '../../../constants/Colors'

// 基金
@inject('QuotaStore')
@observer
export default class Fund extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            done: false,
            num: 10,
			page: 1,
			asc: 1, //排序 0降序 1 升序,
			sort: 'trade', //排序 类型 （trade 最新价、pricechange 涨跌额、changepercent 涨跌幅、volume 成交量、amount 成交额、symbol 代码） 默认代码
			type: 'etf_hq_fund', //etf_hq_fund ETF基金行情、lof_hq_fund LOF基金行情） 默认etf_hq_fund ETF基金行情
        }
    }
    componentDidMount() {

        console.log('fund props-->', this.props)
        this._loadMore()
    }
    componentWillUnmount() {
    }
    _renderItemView ({ item, key }) {
		return (
			<View key={key} style={{flex: 1,borderBottomWidth: 1,borderColor: Colors.borderGray,paddingTop:5,paddingBottom:10}}>
				<View style={{flex: 1,flexDirection: 'row',alignItems: 'center',height: 25}}>
					<Text numberOfLines={1}  style={{fontSize: 16}}>{item.name}</Text>
					<Text style={{fontSize: 14,marginTop: 5,marginLeft: 5,color: Colors.bodyTextGray}}>{item.symbol}</Text>
				</View>
				<View style={{flex: 1,justifyContent: 'space-between',flexDirection: 'row',alignItems: 'center',height: 30}}>
					<View style={{flex: 1,flexDirection: 'row',justifyContent:'space-between',}}>
						<Text style={{fontSize: 20,color: Colors.bodyTextGray}}>{item.open}</Text>
					</View>
					<View style={{flex: 1,marginLeft: 20,flexDirection: 'row',justifyContent:'space-between',}}>
						<Text style={{marginTop:4,color: Colors.bodyTextGray}}>买量:</Text>
						<Text style={{marginTop:4,color: Colors.bodyTextGray}}>{item.volume}</Text>
					</View>
					<View style={{flex: 1,marginLeft: 20,flexDirection: 'row',justifyContent:'space-between',}}>
						{/* <Text style={{marginTop:4,color: Colors.bodyTextGray}}>幅度:</Text> */}
						<Text style={{fontSize: 16,height:30,lineHeight: 30,marginLeft: 10,color: '#fff',backgroundColor: item.pricechange > 0 ? '#EB2D3B' : item.pricechange == 0 ? '#ddd' : '#00B267',flex: 1,textAlign:'center'}}>{item.pricechange>0 ? '+': null}{Number(item.changepercent).toFixed(2)}%</Text>
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
    _loadMore() {
        const { num, page, asc, sort, type,loading,done } = this.state
        const { QuotaStore } = this.props
        console.log('_loadMore-->')
        if (loading || done) return
        this.setState({ loading: true })
        QuotaStore.getFundList({
            num,
            page,
            asc,
            sort,
            type,
        }).then(res => {
            if (res.code === 1) {
                if (!res.data.length || QuotaStore.fundList.length >= 30) {
                    this.setState({ done: true })
                }
                this.setState({ page: page + 1, })
            }
            this.setState({ loading: false })
        })
    }
    _keyExtractor(item, index) {
        return index.toString()
    }
    render () {
        const { QuotaStore } = this.props
        return (
            <View style={styles.container}>
                <FlatList
                    style={{backgroundColor:'#fff'}}
                    data={QuotaStore.fundList}
                    renderItem={this._renderItemView.bind(this)}
                    keyExtractor={this._keyExtractor} //唯一的key
                    ListFooterComponent={this._renderFooter.bind(this)}
                    onEndReached={this._loadMore.bind(this)}
                    onEndReachedThreshold={0}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
    },
});
