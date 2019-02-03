import React from 'react'
import {StatusBar, NetInfo, View, Text, WebView, ScrollView, StyleSheet } from 'react-native'
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
                <StatusBar barStyle={'dark-content'}/>
				<NavigationBar
					title={''}
					style={{backgroundColor: '#fff'}}
					titleLayoutStyle={{ fontSize: 30 }}
					titleView={(
						<View style={{flex: 1,flexDirection:'row',alignItems:'flex-end'}}>
							<Segment style={{}}>
								<NeButton first active={active===1} onPress={() =>this.setState({active:1})}>
									<NeText>商品</NeText>
								</NeButton>
								{/* <NeButton active={active===2} onPress={() =>this.setState({active:2})}>
									<NeText>外汇</NeText>
								</NeButton>
								<NeButton active={active===3} onPress={() =>this.setState({active:3})}>
									<NeText>股指</NeText>
								</NeButton> */}
								<NeButton active={active===4} onPress={() =>this.setState({active:4})}>
									<NeText>债券</NeText>
								</NeButton>
								<NeButton last active={active===5} onPress={() =>this.setState({active:5})}>
									<NeText>数字</NeText>
								</NeButton>
							</Segment>
						</View>
					)}
					rightButton={
						<Icon
							style={{}}
							name={'ios-help-circle-outline'} size={24}
							color={'#999'}
						/>}
				/>
				
				<View style={{flex: 1}}>
					{/* <Fund /> */}
					{/* <Commodity navigation={navigation} /> */}
					{active===1?<Forex navigation={navigation} classify={'marketdatacommodityii'} />:null}
					{active===2?<Forex navigation={navigation} classify={'marketdataforexii'} />:null}
					{active===3?<Forex navigation={navigation} classify={'marketdataindexii'} />:null}
					{active===4?<Forex navigation={navigation} classify={'marketdatabondii'} />:null}
					{active===5?<Forex navigation={navigation} classify={'marketdatacryptocurrencyii'} />:null}
					
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
