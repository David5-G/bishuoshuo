import React from 'react'
import {Linking,SafeAreaView, ActivityIndicator, NetInfo, View, Text, WebView, ScrollView, StyleSheet, Button } from 'react-native'
import { Container, Header, Content, Item, Input, Segment, Button as NeButton, Text as NeText } from 'native-base';
import { observer, inject } from 'mobx-react/native'
import Colors from '../../constants/Colors';
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
@inject('QuotaStore')
@observer
export default class Home extends React.Component {
	static navigationOptions = {
		title: '',
		header: null,
	};
	constructor(props) {
		super(props)
		this.state = {
			active: 1,
		}
	}
	componentDidMount() {
		this._initVariety()
	}
	componentWillUnmount() {
	}
	_initVariety () {
		const { QuotaStore } = this.props
		QuotaStore.getVarietyList({pidx:1,rout:'GBIDX'})
		QuotaStore.getVarietyList({pidx:1,rout:'GBDC'})
		QuotaStore.getVarietyList({pidx:1,rout:'CNFT'})
		QuotaStore.getVarietyList({pidx:1,rout:'GBFT'})
	}
	_renderItem (item,key) {
		return (

			<View key={key} style={{flex: 1,borderBottomWidth: 1,borderColor: Colors.borderGray,paddingTop:5,paddingBottom:10}}>
				<View style={{flex: 1,flexDirection: 'row',alignItems: 'center',height: 25}}>
					<Text numberOfLines={1}  style={{fontSize: 16}}>{item.N}</Text>
					<Text style={{fontSize: 14,marginTop: 5,marginLeft: 5,color: Colors.bodyTextGray}}>{item.S}</Text>
				</View>
				<View style={{flex: 1,justifyContent: 'space-between',flexDirection: 'row',alignItems: 'center',height: 30}}>
					<View style={{flex: 1,flexDirection: 'row',justifyContent:'space-between',}}>
						<Text style={{fontSize: 20,color: Colors.bodyTextGray}}>{item.P}</Text>
					</View>

					<View style={{flex: 1,marginLeft: 20,flexDirection: 'row',justifyContent:'space-between',}}>
						<Text style={{marginTop:4,color: Colors.bodyTextGray}}>买量:</Text>
						<Text style={{marginTop:4,color: Colors.bodyTextGray}}>{item.B2}</Text>
					</View>

					<View style={{flex: 1,marginLeft: 20,flexDirection: 'row',justifyContent:'space-between',}}>
						{/* <Text style={{marginTop:4,color: Colors.bodyTextGray}}>幅度:</Text> */}
						<Text style={{fontSize: 16,height:30,lineHeight: 30,marginLeft: 10,color: '#fff',backgroundColor: item.B2 > 0 ? '#EB2D3B' : item == 0 ? '#ddd' : '#00B267',flex: 1,textAlign:'center'}}>{item.ZF>0 ? '+': null}{item.ZF.toFixed(2)}%</Text>
					</View>
				</View>
			</View>
		)
	}
	render() {
		const {QuotaStore} = this.props
		const {active} = this.state
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
						<NeText>GBFT</NeText>
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

				<ScrollView style={{flex: 1,paddingLeft: 10,paddingRight: 10,backgroundColor: '#fff',}}>
					<View style={active !==1 ? {display: 'none'} : {}}>
						{
							QuotaStore.GBIDX_QUOTAS.map((item ,i) => {
								return this._renderItem(item,i)
							})
						}
					</View>

					<View style={active !==2 ? {display: 'none'} : {}}>
						{
							QuotaStore.GBDC_QUOTAS.map((item ,i) => {
								return this._renderItem(item,i)
							})
						}
					</View>

					<View style={active !==3 ? {display: 'none'} : {}}>
						{
							QuotaStore.CNFT_QUOTAS.map((item ,i) => {
								return this._renderItem(item,i)
							})
						}
					</View>

					<View style={active !==4 ? {display: 'none'} : {}}>
						{
							QuotaStore.GBFT_QUOTAS.map((item ,i) => {
								return this._renderItem(item,i)
							})
						}
					</View>
				</ScrollView>
				{/* <ActivityIndicator style={styles.loading} size="large" /> */}

				{/* @observable GBIDX = [] //：全球股指
				@observable GBIDX_QUOTAS = [] //：全球股指

				@observable GBDC = [] //：数字货币
				@observable GBDC_QUOTAS = [] //：数字货币

				@observable CNFT = [] //：国内期货
				@observable CNFT_QUOTAS = [] //：国内期货

				@observable GBFT = [] //：国际期货(指数/商品/外汇)
				@observable GBFT_QUOTAS = [] //：国际期货 */}

				{/* <Text>{QuotaStore.GBIDX.length}</Text>
				<Text>{QuotaStore.GBIDX_QUOTAS.length}</Text>
				<Text>{QuotaStore.GBDC.length}</Text>
				<Text>{QuotaStore.GBDC_QUOTAS.length}</Text>
				<Text>{QuotaStore.CNFT.length}</Text>
				<Text>{QuotaStore.CNFT_QUOTAS.length}</Text>
				<Text>{QuotaStore.GBFT.length}</Text>
				<Text>{QuotaStore.GBFT_QUOTAS.length}</Text> */}
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
