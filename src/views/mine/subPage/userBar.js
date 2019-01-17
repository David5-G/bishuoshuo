import React from 'react';
import { View, Text, WebView, ScrollView, StyleSheet,Image } from 'react-native';
import { Container, Header, Content, List,Button as NeButton, ListItem, Text as NeText, Icon as NeIcon, Left, Body, Right, Switch } from 'native-base';
import { observer, inject } from 'mobx-react/native'
import { Icon as Eicon } from 'expo'
@inject('UserStore')
@observer

export default class MineList extends React.Component {
	static navigationOptions = {
		title: 'MineList',
	};
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	componentDidMount() {
		console.log('MineList--> componentDidMount')
	}
	componentWillUnmount() {
		console.log('MineList--> componentWillUnmount')
	}
	render() {
		const {userInfo} = this.props.UserStore
		return (
			<View>
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
