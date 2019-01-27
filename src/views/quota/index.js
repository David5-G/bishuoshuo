import React from 'react'
import {Linking,SafeAreaView, ActivityIndicator, NetInfo, View, Text, WebView, ScrollView, StyleSheet, Button } from 'react-native'
import { Container, Header, Content, Item, Input, Segment, Button as NeButton, Text as NeText } from 'native-base';
import Colors from '../../constants/Colors';
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'

// import Fund from './subPage/fund'
// import Commodity from './subPage/commodity.js'
import Forex from './subPage/forex'

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			active: 1,
		}
	}
	componentDidMount () {
		// 查列表
		// https://api-prod.wallstreetcn.com/apiv1/kvconfig/items/marketdataforexii

		//外汇 marketdataforexii
		//商品 marketdatacommodityii
		//股指 marketdataindexii
		//债券 marketdatabondii
		//数字货币 marketdatacryptocurrencyii
		
		// 查行情
		// https://api-ddc.wallstreetcn.com/market/real?&prod_code=BTCUSD.Bitfinex&fields=prod_code,prod_name,prod_en_name,market_type,symbol,trade_status,price_precision,update_time,securities_type,px_change,px_change_rate,last_px,preclose_px,amplitude,turnover_volume,ex_type,ex_update_time,ex_last_px,ex_px_change,ex_px_change_rate


	}
	render() {
		const {active} = this.state
		const { navigation } = this.props
		return (
			<View style={styles.container}>
				<NavigationBar
					title={'波动'}
					style={{ color: Colors.headerText, fontSize: 20 }}
					titleLayoutStyle={{ fontSize: 30 }}
					rightButton={
						<Icon
							style={{paddingLeft:20,}}
							onPress={()=> {
								
							}}
							name={'ios-help-circle-outline'} size={24}
							color={Colors.headerText}
						/>}
				/>
				<Segment style={{backgroundColor:'#fff'}}>
					<NeButton first active={active===1} onPress={() =>this.setState({active:1})}>
						<NeText>商品</NeText>
					</NeButton>
					<NeButton active={active===2} onPress={() =>this.setState({active:2})}>
						<NeText>GBDC</NeText>
					</NeButton>
					<NeButton active={active===3} onPress={() =>this.setState({active:3})}>
						<NeText>CNFT</NeText>
					</NeButton>
					<NeButton last active={active===4} onPress={() =>this.setState({active:4})}>
						<NeText>GBIDX</NeText>
					</NeButton>
				</Segment>
				<View style={{flex: 1}}>
					{/* <Fund /> */}
					{/* <Commodity navigation={navigation} /> */}
					<Forex navigation={navigation} />

				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {flex: 1,flexDirection: 'row',justifyContent: 'space-between',borderBottomWidth: 1,borderColor: Colors.borderGray,},
	raise : {
		color: 'red'
	},
	fall: {
		color: 'green'
	}
});
