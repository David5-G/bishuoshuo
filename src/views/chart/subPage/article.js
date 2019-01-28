import React from 'react';
import PropTypes from 'prop-types';
import {View, Text,Button, WebView, ScrollView, FlatList , StyleSheet } from 'react-native';
import NavigationBar from '../../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../../constants/Colors'
import { GET } from '../../../utils/request'
import { WallQuotaListHost, WallQuotaHost, } from '../../../config'
import { dayhourMins } from '../../../utils/times'

export default class Article extends React.Component {
	static navigationOptions = {
		title: 'Article',
		header: null,
    };
    static propTypes = {
        symbol: PropTypes.string.isRequired,
        navigation: PropTypes.object.isRequired,
    }
	constructor(props){
		super(props)
		this.state = {
            loading: false,
            is_asset_search: 1,
            order_type: 'time',
            limit: '15',
            query: this.props.symbol,
            list: [],
        }
    }
    componentDidMount() {
        this._loadMore()
        // https://api-prod.wallstreetcn.com/apiv1/search/article?is_asset_search=1&order_type=time&limit=15&query=NZDUSD.OTC&cursor=3
        // https://api-prod.wallstreetcn.com/apiv1/search/article?is_asset_search=1&limit=10&order_type=time&query=US10YR.OTC
    }
    componentWillUnmount() {

    }
    async _loadMore() {
        const { is_asset_search,order_type,limit,query,loading } = this.state
        if (loading) return
        this.setState({loading: true})
        let res = await GET(WallQuotaListHost + '/apiv1/search/article',{is_asset_search,order_type,limit,query})
        this.setState({loading: false})
        if (res.code !== 20000) return
        res = res.data.items
        this.setState({list: res})
    }
    _renderItemView(info) {
        const item = info.item;
        return (<View style={{padding: 10,borderColor: Colors.borderGray,borderBottomWidth: 1,backgroundColor:'#fff'}}>
            <Text style={{lineHeight: 30,fontSize: 15,}}>{item.title.replace(/<\s*\/?\s*[a-zA-z_]([^>]*?["][^"]*["])*[^>"]*>/g,'')}</Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={{lineHeight: 25,fontSize: 12,color: Colors.bodyTextGray}}>{dayhourMins(item.display_time)} | </Text>
                <Text style={{lineHeight: 25,fontSize: 12,color: Colors.bodyTextGray}}>{item.author.display_name}</Text>
            </View>
        </View>)
    }
    _renderFooter() {
        const { loading } = this.state
        if (loading) {
            return null
        }
        return <Text style={{lineHeight: 50,textAlign: 'center',color: Colors.bodyTextGray,fontSize: 14,}}>没有更多了</Text>
    }
    _keyExtractor(item, index) {
        return index.toString()
    }
	render() {
        const { navigation } = this.props
        const { list,loading} = this.state
		return (
			<View style={styles.container}>
                <View style={{paddingLeft: 10,paddingTop: 10,flexDirection: 'row',backgroundColor: '#fff',borderColor: Colors.borderGray,borderBottomWidth: 1,}}>
                    <View style={{borderColor: Colors.bodyTextActive,borderBottomWidth: 3,}}>
				        <Text style={{lineHeight: 40,fontSize: 16,fontWeight: '600'}}>资讯</Text>
                    </View>
                </View>
                <FlatList
                    style={{}}
                    data={list}
                    refreshing={loading}
                    renderItem={this._renderItemView.bind(this)}
                    keyExtractor={this._keyExtractor} //唯一的key
                    ListFooterComponent={this._renderFooter.bind(this)}
                    // onEndReached={this._loadMore.bind(this)}
                    // onEndReachedThreshold={0}
                />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
