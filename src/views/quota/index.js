import React from 'react'
import { StatusBar, Modal, NetInfo, View, Image, Text, WebView, ScrollView, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors';
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'

import { Container, Header, Content, Accordion, StyleProvider,Segment, Button as NeButton, Text as NeText } from "native-base";
import getTheme from '../../../native-base-theme/components'
import commonColor from '../../../native-base-theme/variables/commonColor'

const dataArray = [
	{ title: <Text>如何看懂k线图？</Text>, content: <Text style={{ lineHeight: 25, fontSize: 14, color: '#666' }}>在中国，以红色表示阳线，绿色表示阴线（美国与之相反，下面所讲解的都是中国习惯的K线图）。所谓阳线，也就是收盘价高于开盘价的K线，在K线图中为红色。K线其实就是一张股市战争图，K线的背后反应的是投资者的心理变化，先学会看懂K线，至于能不能运用好，还要看悟性。</Text> },
	{ title: <Text>关于均线</Text>, content: <Text style={{ lineHeight: 25, fontSize: 14, color: '#666' }}>K线图一般和均线图配合起来使用，如图所示的各种颜色的线便是均线。n日均线一般代表的是最近n日股价的平均成本线，比如ma5代表最近5日的股价平均线。</Text> },
	{ title: <Text>合约号</Text>, content: <Text style={{ lineHeight: 25, fontSize: 14, color: '#666' }}>由交易所统一制定的、规定在将来某一特定的时间和地点交割一定数量和质量标的物的标准化合约。</Text> },
	{ title: <Text>开盘价</Text>, content: <Text style={{ lineHeight: 25, fontSize: 14, color: '#666' }}>开盘价又称开市价，是指在交易所每个交易日开市后的第一笔每股买卖成交价格。世界上大多数交易所都采用成交额最大原则来确定开盘价。</Text> },
	{ title: <Text>收盘价</Text>, content: <Text style={{ lineHeight: 25, fontSize: 14, color: '#666' }}>是指在交易所一天交易活动结束前最后一笔交易的成交价格。如当日没有成交，则采用最近一次的成交价格作为收盘价，因为收盘价是当日行情的标准，又是下一个交易日开盘价的依据，可据以预测未来市场行情;所以投资者对行情分析时，一般采用收盘价作为计算依据。</Text> },
	{ title: <Text>最高价</Text>, content: <Text style={{ lineHeight: 25, fontSize: 14, color: '#666' }}>指在每个交易日从开市到收市的交易过程中所产生的最高价格。如果当日该种成交价格没有发生变化，最高价就是即时价;若当日该种停牌，则最高价就是前收市价。最高价有时是一笔但有时会有几笔。</Text> },
	{ title: <Text>最低价</Text>, content: <Text style={{ lineHeight: 25, fontSize: 14, color: '#666' }}>指在每个交易日从开市到收市的交易过程中所产生的最低价格。如果当日该种成交价格没有发生变化，最低价就是即时价;若当日该种停牌，则最低价就是前收市价。</Text> },
];

// import Fund from './subPage/fund'
// import Commodity from './subPage/commodity.js'
import Forex from './subPage/forex'

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			active: 1,
			modalVisible: false,
		}
	}
	componentDidMount() {
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
		const { active, modalVisible } = this.state
		const { navigation } = this.props
		return (
			<View style={styles.container}>
				<StatusBar barStyle={'dark-content'} />
				<NavigationBar
					title={''}
					style={{}}
					titleLayoutStyle={{ fontSize: 30 }}
					titleView={(
						<StyleProvider style={getTheme(commonColor)}>
						<View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
							<Segment style={{ backgroundColor: 'transparent' }}>
								<NeButton first active={active === 1} onPress={() => this.setState({ active: 1 })}>
									<NeText>商品</NeText>
								</NeButton>
								{/* <NeButton active={active===2} onPress={() =>this.setState({active:2})}>
										<NeText>外汇</NeText>
									</NeButton>
									<NeButton active={active===3} onPress={() =>this.setState({active:3})}>
										<NeText>股指</NeText>
									</NeButton> */}
								<NeButton active={active === 4} onPress={() => this.setState({ active: 4 })}>
									<NeText>债券</NeText>
								</NeButton>
								<NeButton last active={active === 5} onPress={() => this.setState({ active: 5 })}>
									<NeText>数字</NeText>
								</NeButton>
							</Segment>
						</View>
						</StyleProvider>
					)}
					rightButton={
						<Icon
							style={{}}
							onPress={() => this.setState({ modalVisible: true })}
							name={'ios-help-circle-outline'} size={24}
							color={'#fff'}
						/>}
				/>
				<View style={{ flex: 1 }}>
					{/* <Fund /> */}
					{/* <Commodity navigation={navigation} /> */}
					{active === 1 ? <Forex navigation={navigation} classify={'marketdatacommodityii'} /> : null}
					{active === 2 ? <Forex navigation={navigation} classify={'marketdataforexii'} /> : null}
					{active === 3 ? <Forex navigation={navigation} classify={'marketdataindexii'} /> : null}
					{active === 4 ? <Forex navigation={navigation} classify={'marketdatabondii'} /> : null}
					{active === 5 ? <Forex navigation={navigation} classify={'marketdatacryptocurrencyii'} /> : null}
				</View>

				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					style={{ backgroundColor: 'red' }}
				>
					<Container>
						<NavigationBar
							title={'关于行情'}
							style={{}}
							rightButton={<Icon color="#fff" name={'ios-arrow-down'} size={25} onPress={() => this.setState({ modalVisible: false })} />}
						/>
						<Image
							style={{}}
							source={require('../../pics/img1.png')}
						/>
						<Content padder>
							<Accordion
								dataArray={dataArray}
								headerStyle={{ backgroundColor: "#b7daf8" }}
								contentStyle={{ backgroundColor: "#ddecf8" }}
							/>
							
						</Content>
					</Container>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: Colors.borderGray, },
	raise: {
		color: 'red'
	},
	fall: {
		color: 'green'
	},
	title: {},
	content: {},
});
