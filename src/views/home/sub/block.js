import React from 'react';
import {View, Text,Button, WebView, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../../constants/Colors'
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
    componentWillUnmount() {
    }
	render() {
        const { navigation } = this.props
		return (
			<View style={styles.container}>
				<Text>block</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
