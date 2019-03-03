import React from 'react';
import {View, Text,Button, WebView, ScrollView, StyleSheet } from 'react-native';
import NavigationBar from '../common/NavigationBar'
import Colors from '../../constants/Colors'
import { Flex,Icon } from '@ant-design/react-native';


import { observer, inject } from 'mobx-react/native'

@inject('UserStore', 'MainStore')
@observer
export default class About extends React.Component {
	static navigationOptions = {
		title: 'About',
		header: null,
	};
	constructor(props){
		super(props)
		this.state = {}
    }
    componentDidMount() {
    }
	render() {
        const { navigation } = this.props
		return (
			<View style={styles.container}>
				<NavigationBar
                    title={'返回'}
				/>
                <Text>
                    home detail
                </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
