import React from 'react'
import {Linking,SafeAreaView, ActivityIndicator, NetInfo, View, Text, WebView, ScrollView, StyleSheet, Button } from 'react-native'
import { Container, Header, Content, Item, Input, Segment, Button as NeButton, Text as NeText } from 'native-base';
import Colors from '../../constants/Colors';
import NavigationBar from '../common/NavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'

import Fund from './subPage/fund'

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			active: 1,
		}
	}
	
	render() {
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
						<NeText>基金</NeText>
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
					<Fund />
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
